import User from "./User.js";

import Email from "./Email.js";
import EmailRecipient from "./EmailRecipient.js";

import Order from "./Orders.js";
import OrderItem from "./OrderItems.js";

import Payment from "./Payment.js";
import Transaction from "./Transaction.js";

import SupportPayment from "./SupportPayment.js";

import WhopMembership from "./WhopMembership.js";
import WhopEvent from "./WhopEvent.js";

import Animation from "./Animation.js";

/* =========================================================
   ASSOCIATIONS
   ========================================================= */

// =========================================================
// User → Orders
// =========================================================

User.hasMany(Order, {
  foreignKey: "user_id",
  as: "orders",
});

Order.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// =========================================================
// Order → OrderItems
// =========================================================

Order.hasMany(OrderItem, {
  foreignKey: "order_id",
  as: "items",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

OrderItem.belongsTo(Order, {
  foreignKey: "order_id",
  as: "order",
});

// =========================================================
// Order → Payments
// =========================================================

Order.hasMany(Payment, {
  foreignKey: "order_id",
  as: "payments",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Payment.belongsTo(Order, {
  foreignKey: "order_id",
  as: "order",
});

// =========================================================
// Whop Membership
// =========================================================

WhopMembership.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

User.hasMany(WhopMembership, {
  foreignKey: "user_id",
  as: "whopMemberships",
});

// =========================================================
// Animation
// =========================================================
//
// ABN LaunchKit digital animation catalog.
//
// Animation berdiri sendiri sebagai produk digital.
// Integrasi pembelian dilakukan melalui Whop.
//
// Fields utama:
//
//   price
//   currency
//   whop_product_id
//   whop_plan_id
//   purchase_url
//   status
//
// =========================================================

// =========================================================
// SupportPayment
// =========================================================
//
// SupportPayment berdiri sendiri.
//
// Support:
//
//   Support.tsx
//       ↓
//   /api/payments/support
//       ↓
//   SupportPayment
//       ↓
//   Midtrans
//
// =========================================================

// =========================================================
// EXPORT
// =========================================================

export {
  User,
  Email,
  EmailRecipient,
  Order,
  OrderItem,
  Payment,
  Transaction,
  SupportPayment,
  WhopMembership,
  WhopEvent,
  Animation,
};

export default {
  User,
  Email,
  EmailRecipient,
  Order,
  OrderItem,
  Payment,
  Transaction,
  SupportPayment,
  WhopMembership,
  WhopEvent,
  Animation,
};
