const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // Create a transporter using Gmail service
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "g.erdenee@gmail.com",
      pass: "dmko vnpt ghsp jxjg",
    },
  });
  const mailOptions = {
    from: "g.erdenee@gmail.com",
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  // Send the email
 // transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
