import { Webhook } from "standardwebhooks";

const webhookSecret = process.env.WHOP_WEBHOOK_SECRET;

if (!webhookSecret) {
  throw new Error("WHOP_WEBHOOK_SECRET belum diatur di server/.env");
}

/*
 * Whop sandbox secret:
 *
 *   ws_<base64-secret>
 *
 * standardwebhooks secara default hanya mengenali:
 *
 *   whsec_<base64-secret>
 *
 * Karena environment Whop kita menggunakan ws_,
 * kita normalisasi prefix sandbox menjadi whsec_
 * sebelum diberikan ke Standard Webhooks.
 *
 * JANGAN mengubah isi secret selain prefix.
 */

function normalizeWhopSecret(secret) {
  if (secret.startsWith("ws_")) {
    return `whsec_${secret.slice(3)}`;
  }

  return secret;
}

const normalizedSecret = normalizeWhopSecret(webhookSecret);

const webhook = new Webhook(normalizedSecret);

export function verifyWhopWebhook(body, headers) {
  return webhook.verify(body, headers);
}

export default webhook;
