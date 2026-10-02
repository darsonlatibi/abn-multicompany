/* =========================================================
   ABN WEBSITE
   EMAIL CONTROLLER
   ========================================================= */

import { Op } from "sequelize";
import { Email, EmailRecipient } from "../models/index.js";

/* =========================================================
   RESPONSE HELPERS
   ========================================================= */

const success = (res, data, extra = {}) => {
  return res.status(200).json({
    success: true,
    data,
    ...extra,
  });
};

const error = (res, status, message, details = null) => {
  return res.status(status).json({
    success: false,
    message,
    ...(details ? { details } : {}),
  });
};

/* =========================================================
   NORMALIZE EMAIL
   ========================================================= */

const normalizeEmail = (email) => {
  if (!email) return null;

  const plain = typeof email.toJSON === "function" ? email.toJSON() : email;

  const recipients = plain.recipients || plain.EmailRecipients || [];

  return {
    id: plain.id,

    fromEmail: plain.fromEmail ?? plain.from_email ?? "",
    fromName: plain.fromName ?? plain.from_name ?? null,

    subject: plain.subject ?? "",

    body: plain.body ?? "",

    preview:
      plain.preview ??
      (plain.body
        ? String(plain.body)
            .replace(/<[^>]*>/g, "")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 180)
        : ""),

    folder: plain.folder ?? "INBOX",

    status: plain.status ?? "SENT",

    unread:
      typeof plain.unread === "boolean"
        ? plain.unread
        : Boolean(plain.isUnread ?? plain.is_unread ?? false),

    starred:
      typeof plain.starred === "boolean"
        ? plain.starred
        : Boolean(plain.isStarred ?? plain.is_starred ?? false),

    parentId: plain.parentId ?? plain.parent_id ?? null,

    threadId: plain.threadId ?? plain.thread_id ?? null,

    messageId: plain.messageId ?? plain.message_id ?? null,

    sentAt: plain.sentAt ?? plain.sent_at ?? null,

    receivedAt: plain.receivedAt ?? plain.received_at ?? null,

    hasAttachment:
      typeof plain.hasAttachment === "boolean"
        ? plain.hasAttachment
        : Boolean(plain.has_attachment ?? false),

    createdAt: plain.createdAt ?? plain.created_at ?? null,

    updatedAt: plain.updatedAt ?? plain.updated_at ?? null,

    recipients: recipients.map((recipient) => {
      const item =
        typeof recipient.toJSON === "function" ? recipient.toJSON() : recipient;

      return {
        id: item.id,

        emailId: item.emailId ?? item.email_id ?? plain.id,

        email: item.email ?? "",

        name: item.name ?? null,

        type: item.type ?? "TO",

        status: item.status ?? "PENDING",
      };
    }),
  };
};

/* =========================================================
   INCLUDE
   ========================================================= */

const getInclude = () => [
  {
    model: EmailRecipient,
    as: "recipients",
    required: false,
  },
];

/* =========================================================
   VALIDATE ID
   ========================================================= */

const getId = (req) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
};

/* =========================================================
   GET EMAILS
   GET /api/email
   ========================================================= */

export const getEmails = async (req, res) => {
  try {
    const { folder = "INBOX", search = "", page = 1, limit = 25 } = req.query;

    const currentPage = Math.max(Number(page) || 1, 1);
    const currentLimit = Math.min(Math.max(Number(limit) || 25, 1), 100);

    const offset = (currentPage - 1) * currentLimit;

    const where = {};

    if (folder) {
      where.folder = String(folder).toUpperCase();
    }

    if (search && String(search).trim()) {
      const keyword = `%${String(search).trim()}%`;

      where[Op.or] = [
        {
          subject: {
            [Op.like]: keyword,
          },
        },
        {
          body: {
            [Op.like]: keyword,
          },
        },
        {
          fromEmail: {
            [Op.like]: keyword,
          },
        },
        {
          fromName: {
            [Op.like]: keyword,
          },
        },
      ];
    }

    console.log("[EmailController.getEmails]");
    console.log("WHERE:", where);

    const result = await Email.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      limit: currentLimit,
      offset,
    });

    console.log("EMAIL COUNT:", result.count);
    console.log("EMAIL ROWS:", result.rows.length);

    const emails = result.rows.map(normalizeEmail);

    const total = Number(result.count) || 0;

    const pages = total > 0 ? Math.ceil(total / currentLimit) : 0;

    return success(res, emails, {
      total,
      page: currentPage,
      limit: currentLimit,
      pages,
    });
  } catch (err) {
    console.error("[EmailController.getEmails]", err);

    return error(res, 500, "Gagal mengambil daftar email.", err.message);
  }
};

/* =========================================================
   GET EMAIL BY ID
   GET /api/email/:id
   ========================================================= */

export const getEmailById = async (req, res) => {
  try {
    const id = getId(req);

    if (!id) {
      return error(res, 400, "ID email tidak valid.");
    }

    const email = await Email.findByPk(id, {
      include: getInclude(),
    });

    if (!email) {
      return error(res, 404, "Email tidak ditemukan.");
    }

    return success(res, normalizeEmail(email));
  } catch (err) {
    console.error("[EmailController.getEmailById]", err);

    return error(
      res,
      500,
      "Gagal mengambil detail email.",
      process.env.NODE_ENV === "development" ? err.message : null,
    );
  }
};

/* =========================================================
   CREATE / SEND EMAIL
   POST /api/email
   ========================================================= */

export const createEmail = async (req, res) => {
  const transaction = await Email.sequelize.transaction();

  try {
    const {
      to,
      cc = [],
      bcc = [],
      subject,
      body,
      parentId = null,
      threadId = null,
    } = req.body;

    /* =====================================================
       VALIDATION
       ===================================================== */

    if (!Array.isArray(to) || to.length === 0) {
      await transaction.rollback();

      return error(res, 400, "Minimal satu penerima TO diperlukan.");
    }

    if (!subject || !String(subject).trim()) {
      await transaction.rollback();

      return error(res, 400, "Subject email wajib diisi.");
    }

    if (!body || !String(body).trim()) {
      await transaction.rollback();

      return error(res, 400, "Body email wajib diisi.");
    }

    if (!Array.isArray(cc)) {
      await transaction.rollback();

      return error(res, 400, "Format CC tidak valid.");
    }

    if (!Array.isArray(bcc)) {
      await transaction.rollback();

      return error(res, 400, "Format BCC tidak valid.");
    }

    /* =====================================================
       SENDER
       ===================================================== */

    const user = req.user || {};

    const fromEmail =
      user.email ||
      process.env.EMAIL_FROM ||
      process.env.SMTP_USER ||
      "no-reply@abn.web.id";

    const fromName = user.full_name || user.fullName || user.name || "ABN";

    /* =====================================================
       MESSAGE ID
       ===================================================== */

    const messageId = `<${Date.now()}.${Math.random()
      .toString(36)
      .slice(2)}@abn.web.id>`;

    /* =====================================================
       CREATE EMAIL
       ===================================================== */

    const email = await Email.create(
      {
        fromEmail,

        fromName,

        subject: String(subject).trim(),

        body: String(body),

        preview: String(body)
          .replace(/<[^>]*>/g, "")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 180),

        folder: "SENT",

        /*
         * Untuk saat ini email dianggap
         * berhasil dibuat di sistem.
         *
         * SMTP akan kita integrasikan
         * setelahnya.
         */
        status: "SENT",

        unread: false,

        starred: false,

        parentId,

        threadId,

        messageId,

        sentAt: new Date(),
      },
      {
        transaction,
      },
    );

    /* =====================================================
       CREATE RECIPIENTS
       ===================================================== */

    const recipients = [];

    const addRecipients = (addresses, type) => {
      for (const item of addresses) {
        if (!item) continue;

        const emailAddress = typeof item === "string" ? item : item.email;

        const name = typeof item === "object" ? item.name || null : null;

        if (!emailAddress) continue;

        recipients.push({
          emailId: email.id,

          email: String(emailAddress).trim().toLowerCase(),

          name,

          type,

          status: "PENDING",
        });
      }
    };

    addRecipients(to, "TO");
    addRecipients(cc, "CC");
    addRecipients(bcc, "BCC");

    if (recipients.length === 0) {
      await transaction.rollback();

      return error(res, 400, "Tidak ada recipient yang valid.");
    }

    await EmailRecipient.bulkCreate(recipients, {
      transaction,
    });

    await transaction.commit();

    /* =====================================================
       RETURN CREATED EMAIL
       ===================================================== */

    const createdEmail = await Email.findByPk(email.id, {
      include: getInclude(),
    });

    return success(res, normalizeEmail(createdEmail), {
      message: "Email berhasil dibuat.",
    });
  } catch (err) {
    try {
      await transaction.rollback();
    } catch {
      // Ignore rollback error
    }

    console.error("[EmailController.createEmail]", err);

    return error(
      res,
      500,
      "Gagal membuat email.",
      process.env.NODE_ENV === "development" ? err.message : null,
    );
  }
};

/* =========================================================
   MARK AS READ
   PATCH /api/email/:id/read
   ========================================================= */

export const markEmailAsRead = async (req, res) => {
  try {
    const id = getId(req);

    if (!id) {
      return error(res, 400, "ID email tidak valid.");
    }

    const email = await Email.findByPk(id);

    if (!email) {
      return error(res, 404, "Email tidak ditemukan.");
    }

    await email.update({
      unread: false,
    });

    const updated = await Email.findByPk(id, {
      include: getInclude(),
    });

    return success(res, normalizeEmail(updated), {
      message: "Email ditandai sebagai sudah dibaca.",
    });
  } catch (err) {
    console.error("[EmailController.markEmailAsRead]", err);

    return error(res, 500, "Gagal menandai email sebagai sudah dibaca.");
  }
};

/* =========================================================
   MARK AS UNREAD
   PATCH /api/email/:id/unread
   ========================================================= */

export const markEmailAsUnread = async (req, res) => {
  try {
    const id = getId(req);

    if (!id) {
      return error(res, 400, "ID email tidak valid.");
    }

    const email = await Email.findByPk(id);

    if (!email) {
      return error(res, 404, "Email tidak ditemukan.");
    }

    await email.update({
      unread: true,
    });

    const updated = await Email.findByPk(id, {
      include: getInclude(),
    });

    return success(res, normalizeEmail(updated), {
      message: "Email ditandai sebagai belum dibaca.",
    });
  } catch (err) {
    console.error("[EmailController.markEmailAsUnread]", err);

    return error(res, 500, "Gagal menandai email sebagai belum dibaca.");
  }
};

/* =========================================================
   TOGGLE STAR
   PATCH /api/email/:id/star
   ========================================================= */

export const toggleEmailStar = async (req, res) => {
  try {
    const id = getId(req);

    if (!id) {
      return error(res, 400, "ID email tidak valid.");
    }

    const email = await Email.findByPk(id);

    if (!email) {
      return error(res, 404, "Email tidak ditemukan.");
    }

    await email.update({
      starred: !Boolean(email.starred),
    });

    const updated = await Email.findByPk(id, {
      include: getInclude(),
    });

    return success(res, normalizeEmail(updated), {
      message: updated.starred
        ? "Email ditambahkan ke starred."
        : "Email dihapus dari starred.",
    });
  } catch (err) {
    console.error("[EmailController.toggleEmailStar]", err);

    return error(res, 500, "Gagal mengubah status starred email.");
  }
};

/* =========================================================
   ARCHIVE
   PATCH /api/email/:id/archive
   ========================================================= */

export const archiveEmail = async (req, res) => {
  try {
    const id = getId(req);

    if (!id) {
      return error(res, 400, "ID email tidak valid.");
    }

    const email = await Email.findByPk(id);

    if (!email) {
      return error(res, 404, "Email tidak ditemukan.");
    }

    await email.update({
      folder: "ARCHIVE",
    });

    const updated = await Email.findByPk(id, {
      include: getInclude(),
    });

    return success(res, normalizeEmail(updated), {
      message: "Email berhasil diarsipkan.",
    });
  } catch (err) {
    console.error("[EmailController.archiveEmail]", err);

    return error(res, 500, "Gagal mengarsipkan email.");
  }
};

/* =========================================================
   DELETE / TRASH
   DELETE /api/email/:id
   ========================================================= */

export const deleteEmail = async (req, res) => {
  try {
    const id = getId(req);

    if (!id) {
      return error(res, 400, "ID email tidak valid.");
    }

    const email = await Email.findByPk(id);

    if (!email) {
      return error(res, 404, "Email tidak ditemukan.");
    }

    /* =====================================================
       FIRST DELETE = MOVE TO TRASH
       ===================================================== */

    if (email.folder !== "TRASH") {
      await email.update({
        folder: "TRASH",
      });

      const updated = await Email.findByPk(id, {
        include: getInclude(),
      });

      return success(res, normalizeEmail(updated), {
        message: "Email dipindahkan ke trash.",
      });
    }

    /* =====================================================
       SECOND DELETE = PERMANENT DELETE
       ===================================================== */

    await EmailRecipient.destroy({
      where: {
        emailId: id,
      },
    });

    await email.destroy();

    return success(
      res,
      {
        id,
      },
      {
        message: "Email berhasil dihapus permanen.",
      },
    );
  } catch (err) {
    console.error("[EmailController.deleteEmail]", err);

    return error(res, 500, "Gagal menghapus email.");
  }
};
