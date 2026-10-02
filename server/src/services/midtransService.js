import { snap, coreApi } from "../config/midtrans.js";

/**
 * =========================================================
 * ABN MIDTRANS PAYMENT SERVICE
 * =========================================================
 */

// =========================================================
// CREATE MIDTRANS TRANSACTION
// =========================================================

export const createMidtransTransaction = async ({
  orderId,
  amount,
  customerName,
  customerEmail,
  customerPhone,
  itemDetails = [],
  finishUrl,
}) => {
  // -------------------------------------------------------
  // VALIDATE ORDER ID
  // -------------------------------------------------------

  if (!orderId) {
    throw new Error("Midtrans order ID is required.");
  }

  // -------------------------------------------------------
  // VALIDATE AMOUNT
  // -------------------------------------------------------

  const numericAmount = Math.round(Number(amount));

  if (!Number.isFinite(numericAmount) || numericAmount < 1000) {
    throw new Error("Midtrans transaction amount must be at least Rp1.000.");
  }

  // -------------------------------------------------------
  // VALIDATE CUSTOMER
  // -------------------------------------------------------

  if (!customerName) {
    throw new Error("Customer name is required.");
  }

  if (!customerEmail) {
    throw new Error("Customer email is required.");
  }

  // -------------------------------------------------------
  // NORMALIZE ITEMS
  // -------------------------------------------------------

  const normalizedItems =
    Array.isArray(itemDetails) && itemDetails.length > 0
      ? itemDetails.map((item) => ({
          id: String(item.id),
          price: Math.round(Number(item.price)),
          quantity: Math.round(Number(item.quantity)),
          name: String(item.name),
        }))
      : [
          {
            id: "ABN-PAYMENT",
            price: numericAmount,
            quantity: 1,
            name: "ABN Payment",
          },
        ];

  // -------------------------------------------------------
  // VALIDATE ITEM DETAILS
  // -------------------------------------------------------

  const itemTotal = normalizedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (itemTotal !== numericAmount) {
    throw new Error(
      `Midtrans item total (${itemTotal}) does not match gross amount (${numericAmount}).`,
    );
  }

  // -------------------------------------------------------
  // MIDTRANS PARAMETER
  // -------------------------------------------------------

  const parameter = {
    transaction_details: {
      order_id: String(orderId),
      gross_amount: numericAmount,
    },

    customer_details: {
      first_name: String(customerName),
      email: String(customerEmail),

      ...(customerPhone
        ? {
            phone: String(customerPhone),
          }
        : {}),
    },

    item_details: normalizedItems,

    ...(finishUrl
      ? {
          callbacks: {
            finish: String(finishUrl),
          },
        }
      : {}),
  };

  // -------------------------------------------------------
  // DEBUG
  // -------------------------------------------------------

  console.log("==============================================");
  console.log("MIDTRANS CREATE TRANSACTION");
  console.log("==============================================");
  console.log("ORDER ID:", orderId);
  console.log("GROSS AMOUNT:", numericAmount);
  console.log("CUSTOMER:", customerEmail);
  console.log("ITEM TOTAL:", itemTotal);
  console.log("ITEM COUNT:", normalizedItems.length);
  console.log("FINISH URL:", finishUrl || "none");
  console.log("==============================================");

  // -------------------------------------------------------
  // CREATE SNAP TRANSACTION
  // -------------------------------------------------------

  try {
    const transaction = await snap.createTransaction(parameter);

    // -----------------------------------------------------
    // VALIDATE RESPONSE
    // -----------------------------------------------------

    if (!transaction?.token) {
      console.error("MIDTRANS RESPONSE WITHOUT TOKEN:", transaction);

      throw new Error("Midtrans did not return a Snap token.");
    }

    console.log("MIDTRANS TRANSACTION CREATED");
    console.log("SNAP TOKEN:", transaction.token);
    console.log("REDIRECT URL:", transaction.redirect_url || "none");

    // -----------------------------------------------------
    // RETURN
    // -----------------------------------------------------

    return {
      token: transaction.token,

      paymentUrl: transaction.redirect_url || null,

      redirectUrl: transaction.redirect_url || null,

      rawResponse: transaction,
    };
  } catch (error) {
    // -----------------------------------------------------
    // FULL MIDTRANS ERROR
    // -----------------------------------------------------

    console.error("==============================================");
    console.error("MIDTRANS CREATE TRANSACTION ERROR");
    console.error("==============================================");

    console.error("MESSAGE:", error?.message);
    console.error("STATUS CODE:", error?.httpStatusCode);
    console.error("API RESPONSE:", error?.ApiResponse);

    if (error?.ApiResponse?.error_messages) {
      console.error("ERROR MESSAGES:", error.ApiResponse.error_messages);
    }

    console.error("FULL ERROR:", error);

    console.error("==============================================");

    const apiErrors = error?.ApiResponse?.error_messages;

    const message =
      Array.isArray(apiErrors) && apiErrors.length > 0
        ? apiErrors.join(", ")
        : error?.message || "Failed to create Midtrans transaction.";

    throw new Error(message);
  }
};

// =========================================================
// GET MIDTRANS TRANSACTION STATUS
// =========================================================

export const getMidtransTransactionStatus = async (orderId) => {
  if (!orderId) {
    throw new Error("Midtrans order ID is required.");
  }

  try {
    const response = await coreApi.transaction.status(String(orderId));

    return response;
  } catch (error) {
    console.error(
      "MIDTRANS TRANSACTION STATUS ERROR:",
      error?.ApiResponse || error?.message || error,
    );

    throw new Error(
      error?.message || "Failed to retrieve Midtrans transaction status.",
    );
  }
};

// =========================================================
// PROCESS MIDTRANS NOTIFICATION
// =========================================================

export const processMidtransNotification = async (notification) => {
  if (!notification) {
    throw new Error("Midtrans notification payload is required.");
  }

  try {
    const response = await coreApi.transaction.notification(notification);

    return response;
  } catch (error) {
    console.error(
      "MIDTRANS NOTIFICATION ERROR:",
      error?.ApiResponse || error?.message || error,
    );

    throw new Error(
      error?.message || "Failed to process Midtrans notification.",
    );
  }
};

// =========================================================
// DEFAULT EXPORT
// =========================================================

export default {
  createMidtransTransaction,
  getMidtransTransactionStatus,
  processMidtransNotification,
};
