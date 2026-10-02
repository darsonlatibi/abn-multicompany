import { WhopClient } from "@whop/sdk";

const apiKey = process.env.WHOP_API_KEY;
const companyId = process.env.WHOP_COMPANY_ID;

if (!apiKey) {
  throw new Error("WHOP_API_KEY belum diatur di server/.env");
}

if (!companyId) {
  throw new Error("WHOP_COMPANY_ID belum diatur di server/.env");
}

const whop = new WhopClient({
  token: apiKey,
  apiVersionDate: "2026-09-23",
});

/**
 * Test koneksi ABN LaunchKit → Whop API
 */
export async function testWhopConnection() {
  try {
    const page = await whop.payments.list({
      account_id: companyId,
    });

    return {
      success: true,
      connected: true,
      companyId,
      paymentCount: page.data?.length ?? 0,
    };
  } catch (error) {
    console.error("==============================================");
    console.error("WHOP API CONNECTION FAILED");
    console.error("==============================================");
    console.error("Message:", error?.message);
    console.error("Status:", error?.statusCode ?? error?.status);
    console.error("Name:", error?.name);
    console.error("==============================================");

    return {
      success: false,
      connected: false,
      companyId,
      message: error?.message || "Gagal terhubung ke Whop API.",
    };
  }
}

export default whop;
