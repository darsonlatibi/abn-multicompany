import nodemailer from "nodemailer";

/* =========================================================
ABN WEBSITE
EMAIL SERVICE
SMTP / HTML MAIL
========================================================= */

/* =========================================================
SMTP CONFIG
========================================================= */

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure =
String(process.env.SMTP_SECURE || "").toLowerCase() === "true";

const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

const emailFrom =
process.env.EMAIL_FROM ||
smtpUser ||
"[no-reply@abn.web.id](mailto:no-reply@abn.web.id)";

const emailFromName =
process.env.EMAIL_FROM_NAME ||
"ABN Website";

/* =========================================================
VALIDATION
========================================================= */

if (!smtpHost) {
console.warn("[EmailService] SMTP_HOST belum dikonfigurasi.");
}

if (!smtpUser) {
console.warn("[EmailService] SMTP_USER belum dikonfigurasi.");
}

if (!smtpPass) {
console.warn("[EmailService] SMTP_PASS belum dikonfigurasi.");
}

/* =========================================================
TRANSPORTER
========================================================= */

const transporter = nodemailer.createTransport({
host: smtpHost,
port: smtpPort,
secure: smtpSecure,
auth: {
user: smtpUser,
pass: smtpPass,
},
});

/* =========================================================
VERIFY SMTP
========================================================= */

export const verifyEmailTransporter = async () => {
try {
await transporter.verify();


console.log("[EmailService] SMTP connection OK.");

return true;


} catch (error) {
console.error("[EmailService] SMTP connection failed:");
console.error(error.message);


return false;


}
};

/* =========================================================
NORMALIZE RECIPIENT
========================================================= */

const normalizeRecipient = (recipient) => {
if (!recipient) {
return null;
}

if (typeof recipient === "string") {
return recipient.trim();
}

if (typeof recipient === "object") {
const email = String(recipient.email || "").trim();
const name = String(recipient.name || "").trim();


if (!email) {
  return null;
}

if (name) {
  return {
    name,
    address: email,
  };
}

return email;


}

return null;
};

/* =========================================================
NORMALIZE RECIPIENTS
========================================================= */

const normalizeRecipients = (recipients = []) => {
if (!Array.isArray(recipients)) {
return [];
}

return recipients
.map(normalizeRecipient)
.filter(Boolean);
};

/* =========================================================
HTML SAFETY
========================================================= */

const normalizeHtml = (html) => {
if (!html) {
return "";
}

return String(html).trim();
};

/* =========================================================
HTML -> TEXT
========================================================= */

const htmlToText = (html) => {
if (!html) {
return "";
}

return String(html)
.replace(/<style[\s\S]*?</style>/gi, "")
.replace(/<script[\s\S]*?</script>/gi, "")
.replace(/<br\s*/?>/gi, "\n")
.replace(/</div>/gi, "\n")
.replace(/</p>/gi, "\n")
.replace(/</li>/gi, "\n")
.replace(/<li[^>]*>/gi, "- ")
.replace(/<[^>]+>/g, "")
.replace(/ /gi, " ")
.replace(/&/gi, "&")
.replace(/</gi, "<")
.replace(/>/gi, ">")
.replace(/"/gi, '"')
.replace(/'/gi, "'")
.replace(/\n{3,}/g, "\n\n")
.trim();
};

/* =========================================================
SEND HTML EMAIL
========================================================= */

export const sendEmail = async ({
to = [],
cc = [],
bcc = [],
subject = "",
html = "",
text = "",
fromEmail = emailFrom,
fromName = emailFromName,
replyTo = null,
messageId = null,
}) => {
const normalizedTo = normalizeRecipients(to);
const normalizedCc = normalizeRecipients(cc);
const normalizedBcc = normalizeRecipients(bcc);

const normalizedHtml = normalizeHtml(html);

if (normalizedTo.length === 0) {
throw new Error("Minimal satu recipient TO diperlukan.");
}

if (!subject || !String(subject).trim()) {
throw new Error("Subject email wajib diisi.");
}

if (!normalizedHtml) {
throw new Error("HTML body email kosong.");
}

const mailOptions = {
from: {
name: fromName || emailFromName,
address: fromEmail || emailFrom,
},


to: normalizedTo,

subject: String(subject).trim(),

/*
 * PENTING:
 * body dari Compose dikirim sebagai HTML.
 *
 * Jadi signature:
 *
 * <div data-signature="true">
 *   ...
 * </div>
 *
 * tetap menjadi HTML pada email keluar.
 */
html: normalizedHtml,

/*
 * Plain-text fallback.
 */
text:
  String(text || "").trim() ||
  htmlToText(normalizedHtml),


};

if (normalizedCc.length > 0) {
mailOptions.cc = normalizedCc;
}

if (normalizedBcc.length > 0) {
mailOptions.bcc = normalizedBcc;
}

if (replyTo) {
mailOptions.replyTo = replyTo;
}

if (messageId) {
mailOptions.messageId = messageId;
}

console.log("[EmailService.sendEmail]");
console.log("TO:", normalizedTo);
console.log("CC:", normalizedCc);
console.log("BCC:", normalizedBcc);
console.log("SUBJECT:", mailOptions.subject);
console.log("HTML LENGTH:", normalizedHtml.length);

const result = await transporter.sendMail(mailOptions);

console.log("[EmailService] Email sent.");
console.log("MESSAGE ID:", result.messageId);

return {
success: true,
messageId: result.messageId,
accepted: result.accepted || [],
rejected: result.rejected || [],
response: result.response || null,
};
};

/* =========================================================
EXPORT TRANSPORTER
========================================================= */

export default transporter;
