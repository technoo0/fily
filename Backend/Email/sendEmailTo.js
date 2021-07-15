const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "brenda.sauer10@ethereal.email",
    pass: "8bvAqVQpgfufvkeH8C",
  },
});
const sendmail = async (em, link) => {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"noreplay" <brenda.sauer10@ethereal.email>', // sender address
    to: em, // list of receivers
    subject: "Reset Password", // Subject line
    text: `Link :${link} `, // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

module.exports = sendmail;
