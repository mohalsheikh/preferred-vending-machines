// functions/index.js

// 1) Import Firestore v2 triggers with NO SPACE in braces:
const {onDocumentCreated}=require("firebase-functions/v2/firestore");

// 2) Import and initialize the Admin SDK
const admin=require("firebase-admin");
admin.initializeApp();

// 3) Import Nodemailer
const nodemailer=require("nodemailer");

// 4) Create a mail transporter. Make sure line length < 80.
const transporter=nodemailer.createTransport({
  service: "yahoo",
  auth: {user: "alsheikh04@yahoo.com", pass: "emabbuemhwraabiz"},
});

/**
 * Cloud Function (v2): sendContactEmail
 * Trigger: When a new document is created in "contactMessages/{docId}".
 */
exports.sendContactEmail=onDocumentCreated("contactMessages/{docId}", async (event)=>{
  if (!event.data) {
    console.error("No data found in event.");
    return;
  }
  const {name, email, message}=event.data;
  const mailOptions={
    from: "alsheikh04@yahoo.com",
    to: "moalsheikh2004@gmail.com",
    subject: `New contact message from ${name}`,
    text: `
Name: ${name}
Email: ${email}
Message:
${message}
    `,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
});
