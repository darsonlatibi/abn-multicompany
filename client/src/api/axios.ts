import axios from "axios";
import { jwtDecode } from "jwt-decode";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

import {
  clearAuthState,
  getAccessToken,
  setAccessToken,
} from "../features/auth/authBridge";

/* =========================================================
   ABN SERVER
   ========================================================= */

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5300/api";

/* =========================================================
   TYPES
   ========================================================= */

interface JwtPayload {
  exp?: number;
}

interface RefreshResponse {
  success: boolean;
  accessToken?: string;
  expiresIn?: string;
  message?: string;
}

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/* =========================================================
   MAIN API
   ========================================================= */

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

/* =========================================================
   REFRESH API
   =========================================================
   Dipisahkan dari "api" supaya request refresh tidak
   masuk interceptor utama.
   ========================================================= */

const refreshApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

/* =========================================================
   REFRESH LOCK
   ========================================================= */

let refreshPromise: Promise<string | null> | null = null;

/* =========================================================
   CHECK TOKEN EXPIRY
   ========================================================= */

const isAccessTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (!decoded.exp) {
      console.warn("ABN AUTH: JWT tidak memiliki exp.");
      return true;
    }

    const now = Math.floor(Date.now() / 1000);
    const remaining = decoded.exp - now;

    console.log("ABN AUTH TOKEN:", {
      remainingSeconds: remaining,
      remainingMinutes: Math.floor(remaining / 60),
      expired: remaining <= 0,
    });

    return remaining <= 0;
  } catch (error) {
    console.warn("ABN AUTH: Access token tidak bisa decode.", error);

    return true;
  }
};

/* =========================================================
   REFRESH ACCESS TOKEN
   ========================================================= */

export const refreshAccessToken = async (): Promise<string | null> => {
  /*
   * Kalau sudah ada refresh yang sedang berjalan,
   * request lain menunggu Promise yang sama.
   */

  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      console.log("ABN AUTH: POST /auth/refresh");

      /*
       * Browser otomatis mengirim HttpOnly cookie:
       *
       * abn_multicompany_refresh_token
       *
       * karena withCredentials = true.
       */

      const response = await refreshApi.post<RefreshResponse>(
        "/auth/refresh",
        {},
      );

      console.log("ABN AUTH: Refresh response:", response.data);

      if (!response.data?.success || !response.data?.accessToken) {
        console.warn("ABN AUTH: Server tidak memberikan access token.");

        return null;
      }

      const newAccessToken = response.data.accessToken;

      /*
       * Simpan access token baru.
       */

      setAccessToken(newAccessToken);

      console.log("ABN AUTH: Access token berhasil diperbarui.");

      return newAccessToken;
    } catch (error: any) {
      console.error(
        "ABN AUTH: Refresh gagal:",
        error?.response?.data || error?.message,
      );

      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

/* =========================================================
   REQUEST INTERCEPTOR
   ========================================================= */

api.interceptors.request.use(
  async (config) => {
    let accessToken = getAccessToken();

    /*
     * Belum login / belum ada access token.
     *
     * Jangan refresh otomatis di sini.
     */

    if (!accessToken) {
      return config;
    }

    /*
     * Access token sudah expired.
     */

    if (isAccessTokenExpired(accessToken)) {
      console.log("ABN AUTH: Access token expired.");

      const newAccessToken = await refreshAccessToken();

      if (!newAccessToken) {
        console.warn("ABN AUTH: Refresh gagal.");

        clearAuthState();

        return config;
      }

      accessToken = newAccessToken;
    }

    /*
     * Kirim access token ke server.
     */

    config.headers.set("Authorization", `Bearer ${accessToken}`);

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

/* =========================================================
   RESPONSE INTERCEPTOR
   ========================================================= */

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const status = error.response?.status;

    const originalRequest = error.config as RetryableRequestConfig | undefined;

    /*
     * Hanya tangani 401.
     */

    if (status !== 401) {
      return Promise.reject(error);
    }

    if (!originalRequest) {
      return Promise.reject(error);
    }

    /*
     * Jangan refresh endpoint authentication.
     */

    const url = originalRequest.url || "";

    if (
      url.includes("/auth/login") ||
      url.includes("/auth/register") ||
      url.includes("/auth/refresh") ||
      url.includes("/auth/logout")
    ) {
      return Promise.reject(error);
    }

    /*
     * Jangan infinite loop.
     */

    if (originalRequest._retry) {
      console.warn("ABN AUTH: Request setelah refresh masih 401.");

      clearAuthState();

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    console.warn("ABN AUTH: Server mengembalikan 401.");

    /*
     * Coba refresh menggunakan HttpOnly cookie.
     */

    const newAccessToken = await refreshAccessToken();

    if (!newAccessToken) {
      console.warn("ABN AUTH: Refresh token juga gagal.");

      clearAuthState();

      return Promise.reject(error);
    }

    /*
     * Retry request asli dengan token baru.
     */

    originalRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);

    console.log("ABN AUTH: Retry request dengan token baru.");

    return api.request(originalRequest);
  },
);

export default api;
