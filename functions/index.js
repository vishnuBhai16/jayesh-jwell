const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Gmail credentials (from firebase config)
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

// Mail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Firestore trigger
exports.sendContactEmail = functions.firestore
    .document("contactMessages/{docId}")
    .onCreate(async (snap) => {
      const data = snap.data();

      const mailOptions = {
        from: `"RN White Metals" <${gmailEmail}>`,
        to: gmailEmail,
        subject: "📩 New Contact Form Message",
        html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
      };

      await transporter.sendMail(mailOptions);
    });
