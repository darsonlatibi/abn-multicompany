const ODOO_ENABLED = process.env.ODOO_ENABLED === "true";
const ODOO_URL = process.env.ODOO_URL;
const ODOO_API_KEY = process.env.ODOO_API_KEY;

export async function odooRequest(model, method, payload = {}) {
  if (!ODOO_ENABLED) {
    throw new Error("Odoo integration is disabled.");
  }

  if (!ODOO_URL) {
    throw new Error("ODOO_URL is not configured.");
  }

  if (!ODOO_API_KEY) {
    throw new Error("ODOO_API_KEY is not configured.");
  }

  const url = `${ODOO_URL}/json/2/${model}/${method}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `bearer ${ODOO_API_KEY}`,
      "Content-Type": "application/json",
      "User-Agent": "ABN-Website/1.0",
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();

  let data;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      `Odoo API request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
}

export async function odooSearchRead(
  model,
  domain = [],
  fields = [],
  options = {},
) {
  return odooRequest(model, "search_read", {
    domain,
    fields,
    ...options,
  });
}

export async function odooSearchCount(model, domain = []) {
  return odooRequest(model, "search_count", {
    domain,
  });
}
