import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

/**
 * =========================================================
 * ABN EMS
 * Master Wilayah Administratif Indonesia
 *
 * API:
 * https://www.emsifa.com/api-wilayah-indonesia/
 * =========================================================
 */

const BASE_URL = "https://www.emsifa.com/api-wilayah-indonesia/api";

/**
 * =========================================================
 * TYPES
 * =========================================================
 */

export interface Wilayah {
  id: string;
  name: string;
}

export interface WilayahState {
  provinces: Wilayah[];
  regencies: Wilayah[];
  districts: Wilayah[];
  villages: Wilayah[];

  loading: {
    provinces: boolean;
    regencies: boolean;
    districts: boolean;
    villages: boolean;
  };

  error: string | null;
}

/**
 * =========================================================
 * HELPER
 * =========================================================
 */

const fetchWilayah = async (
  url: string,
  errorMessage: string,
): Promise<Wilayah[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  const data: Wilayah[] = await response.json();

  return data;
};

/**
 * =========================================================
 * GET PROVINCES
 * =========================================================
 */

export const getWilayah = createAsyncThunk<
  Wilayah[],
  void,
  { rejectValue: string }
>("wilayah/getWilayah", async (_, { rejectWithValue }) => {
  try {
    return await fetchWilayah(
      `${BASE_URL}/provinces.json`,
      "Gagal mengambil data provinsi",
    );
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Gagal mengambil data provinsi",
    );
  }
});

/**
 * =========================================================
 * GET REGENCIES
 * =========================================================
 */

export const getKab = createAsyncThunk<
  Wilayah[],
  { id: string },
  { rejectValue: string }
>("wilayah/getKab", async ({ id }, { rejectWithValue }) => {
  try {
    return await fetchWilayah(
      `${BASE_URL}/regencies/${id}.json`,
      "Gagal mengambil data kabupaten/kota",
    );
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : "Gagal mengambil data kabupaten/kota",
    );
  }
});

/**
 * =========================================================
 * GET DISTRICTS
 * =========================================================
 */

export const getKec = createAsyncThunk<
  Wilayah[],
  { id: string },
  { rejectValue: string }
>("wilayah/getKec", async ({ id }, { rejectWithValue }) => {
  try {
    return await fetchWilayah(
      `${BASE_URL}/districts/${id}.json`,
      "Gagal mengambil data kecamatan",
    );
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Gagal mengambil data kecamatan",
    );
  }
});

/**
 * =========================================================
 * GET VILLAGES
 * =========================================================
 */

export const getKel = createAsyncThunk<
  Wilayah[],
  { id: string },
  { rejectValue: string }
>("wilayah/getKel", async ({ id }, { rejectWithValue }) => {
  try {
    return await fetchWilayah(
      `${BASE_URL}/villages/${id}.json`,
      "Gagal mengambil data kelurahan/desa",
    );
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : "Gagal mengambil data kelurahan/desa",
    );
  }
});

/**
 * =========================================================
 * INITIAL STATE
 * =========================================================
 */

const initialState: WilayahState = {
  provinces: [],
  regencies: [],
  districts: [],
  villages: [],

  loading: {
    provinces: false,
    regencies: false,
    districts: false,
    villages: false,
  },

  error: null,
};

/**
 * =========================================================
 * SLICE
 * =========================================================
 */

const wilayahSlice = createSlice({
  name: "wilayah",

  initialState,

  reducers: {
    clearRegencies: (state) => {
      state.regencies = [];
    },

    clearDistricts: (state) => {
      state.districts = [];
    },

    clearVillages: (state) => {
      state.villages = [];
    },

    clearAllWilayah: (state) => {
      state.provinces = [];
      state.regencies = [];
      state.districts = [];
      state.villages = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    /**
     * =====================================================
     * PROVINCES
     * =====================================================
     */

    builder
      .addCase(getWilayah.pending, (state) => {
        state.loading.provinces = true;
        state.error = null;
      })

      .addCase(
        getWilayah.fulfilled,
        (state, action: PayloadAction<Wilayah[]>) => {
          state.loading.provinces = false;
          state.provinces = action.payload;
        },
      )

      .addCase(getWilayah.rejected, (state, action) => {
        state.loading.provinces = false;
        state.error = action.payload ?? "Gagal mengambil data provinsi";
      });

    /**
     * =====================================================
     * REGENCIES
     * =====================================================
     */

    builder
      .addCase(getKab.pending, (state) => {
        state.loading.regencies = true;
        state.error = null;
      })

      .addCase(getKab.fulfilled, (state, action: PayloadAction<Wilayah[]>) => {
        state.loading.regencies = false;
        state.regencies = action.payload;
      })

      .addCase(getKab.rejected, (state, action) => {
        state.loading.regencies = false;
        state.error = action.payload ?? "Gagal mengambil data kabupaten/kota";
      });

    /**
     * =====================================================
     * DISTRICTS
     * =====================================================
     */

    builder
      .addCase(getKec.pending, (state) => {
        state.loading.districts = true;
        state.error = null;
      })

      .addCase(getKec.fulfilled, (state, action: PayloadAction<Wilayah[]>) => {
        state.loading.districts = false;
        state.districts = action.payload;
      })

      .addCase(getKec.rejected, (state, action) => {
        state.loading.districts = false;
        state.error = action.payload ?? "Gagal mengambil data kecamatan";
      });

    /**
     * =====================================================
     * VILLAGES
     * =====================================================
     */

    builder
      .addCase(getKel.pending, (state) => {
        state.loading.villages = true;
        state.error = null;
      })

      .addCase(getKel.fulfilled, (state, action: PayloadAction<Wilayah[]>) => {
        state.loading.villages = false;
        state.villages = action.payload;
      })

      .addCase(getKel.rejected, (state, action) => {
        state.loading.villages = false;
        state.error = action.payload ?? "Gagal mengambil data kelurahan/desa";
      });
  },
});

/**
 * =========================================================
 * ACTIONS
 * =========================================================
 */

export const {
  clearRegencies,
  clearDistricts,
  clearVillages,
  clearAllWilayah,
} = wilayahSlice.actions;

/**
 * =========================================================
 * BASIC SELECTORS
 * =========================================================
 */

export const selectProvinces = (state: { wilayah: WilayahState }) =>
  state.wilayah.provinces;

export const selectRegencies = (state: { wilayah: WilayahState }) =>
  state.wilayah.regencies;

export const selectDistricts = (state: { wilayah: WilayahState }) =>
  state.wilayah.districts;

export const selectVillages = (state: { wilayah: WilayahState }) =>
  state.wilayah.villages;

export const selectWilayahLoading = (state: { wilayah: WilayahState }) =>
  state.wilayah.loading;

export const selectWilayahError = (state: { wilayah: WilayahState }) =>
  state.wilayah.error;

/**
 * =========================================================
 * REDUCER
 * =========================================================
 */

export default wilayahSlice.reducer;
