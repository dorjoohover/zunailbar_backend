const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // Create a transporter using Gmail service
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bataa5458@gmail.com",
      pass: "yxff bawu pntg dtzl",
    },
  });
  const mailOptions = {
    from: "bataa5458@gmail.com",
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  // Send the email
  transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
