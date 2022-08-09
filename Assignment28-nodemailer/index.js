"use strict";
const nodemailer = require("nodemailer");

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

async function main() {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "tressa.harber33@ethereal.email",
      pass: "HEZmQwEkwRFBk34Jcz",
    },
  });

  let info = await transporter.sendMail({
    from: '"Ajay Kumar" <Onkarsetia23@gmail.com>', // sender address
    to: "tressa.harber33@ethereal.email", // list of receivers
    subject: "Hello I am Ajay Kumar", // Subject line
    text: "If you have anything to discuss, let me know", // plain text body
    html: "<b>Thankyou</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);
