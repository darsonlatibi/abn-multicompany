import Whop from "@whop/sdk";

const apiKey = process.env.WHOP_API_KEY;

if (!apiKey) {
  console.warn("⚠️ WHOP_API_KEY belum diatur di server/.env");
}

const whop = new Whop({
  apiKey,
});

export default whop;
