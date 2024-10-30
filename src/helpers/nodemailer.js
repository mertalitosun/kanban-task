const nodemailer = require("nodemailer");

const sendReminderMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mertali2631@gmail.com",
      pass: "ybes sbjk irzp puyd",
    },
  });

  const mailOptions = {
    from: "mertali2631@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("mail Gönderildi:" + info.response);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendReminderMail;