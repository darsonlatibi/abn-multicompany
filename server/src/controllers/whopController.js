import { verifyWhopWebhook } from "../services/whopWebhookVerifier.js";
import { testWhopConnection } from "../services/whopService.js";

/* =========================================================
   HEALTH
   ========================================================= */

export async function whopHealth(_req, res) {
  return res.status(200).json({
    success: true,
    service: "ABN LaunchKit → Whop",
    apiConfigured: Boolean(process.env.WHOP_API_KEY),
    webhookConfigured: Boolean(process.env.WHOP_WEBHOOK_SECRET),
    timestamp: new Date().toISOString(),
  });
}

/* =========================================================
   API CONNECTION TEST
   ========================================================= */

export async function whopApiHealth(_req, res) {
  try {
    const result = await testWhopConnection();

    return res.status(result.success ? 200 : 502).json({
      success: result.success,
      service: "ABN LaunchKit → Whop API",
      connected: result.connected,
      companyId: result.companyId,
      paymentCount: result.paymentCount ?? 0,
      message: result.message ?? null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      service: "ABN LaunchKit → Whop API",
      connected: false,
      message: error?.message || "Whop API connection failed.",
    });
  }
}

/* =========================================================
   WEBHOOK
   ========================================================= */

export async function whopWebhook(req, res) {
  try {
    // =====================================================
    // 1. RAW BODY
    // =====================================================

    if (!Buffer.isBuffer(req.body)) {
      console.error("WHOP WEBHOOK: request body is not a Buffer");

      return res.status(400).json({
        success: false,
        message: "Webhook body must be raw bytes.",
      });
    }

    // =====================================================
    // 2. RAW BODY STRING
    // =====================================================

    const rawBody = req.body.toString("utf8");

    // =====================================================
    // 3. WHOP WEBHOOK HEADERS
    // =====================================================

    const headers = {
      "webhook-id": req.headers["webhook-id"],
      "webhook-timestamp": req.headers["webhook-timestamp"],
      "webhook-signature": req.headers["webhook-signature"],
    };

    // =====================================================
    // 4. VERIFY SIGNATURE
    // =====================================================

    let event;

    try {
      event = verifyWhopWebhook(rawBody, headers);
    } catch (error) {
      console.error("==============================================");

      console.error("WHOP WEBHOOK SIGNATURE INVALID");

      console.error(error?.message || error);

      console.error("==============================================");

      return res.status(401).json({
        success: false,
        message: "Invalid webhook signature.",
      });
    }

    // =====================================================
    // 5. VALIDATE EVENT
    // =====================================================

    if (!event || typeof event !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid Whop webhook payload.",
      });
    }

    const eventId = typeof event.id === "string" ? event.id : null;

    const eventType = typeof event.type === "string" ? event.type : null;

    if (!eventId || !eventType) {
      return res.status(400).json({
        success: false,
        message: "Whop webhook event id/type is missing.",
      });
    }

    // =====================================================
    // 6. SIGNATURE VALID
    // =====================================================

    console.log("==============================================");

    console.log("WHOP WEBHOOK VERIFIED");

    console.log("Event ID   :", eventId);

    console.log("Event Type :", eventType);

    console.log("==============================================");

    // =====================================================
    // 7. TEMPORARY ACK
    //
    // Jangan sentuh database dulu sampai verifier
    // sudah lolos test.
    // =====================================================

    return res.status(200).json({
      success: true,
      received: true,
      verified: true,
      eventId,
      eventType,
    });
  } catch (error) {
    console.error("==============================================");

    console.error("WHOP WEBHOOK ERROR");

    console.error(error);

    console.error("==============================================");

    return res.status(500).json({
      success: false,
      message: "Webhook processing failed.",
    });
  }
}
