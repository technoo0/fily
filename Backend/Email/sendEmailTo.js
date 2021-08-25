const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "us2.smtp.mailhostbox.com",
  port: 587,

  auth: {
    user: "noreply@fily.tech",
    pass: "n*YImXx0",
  },
  tls: { minVersion: "TLSv1" },
});

const sendmail = async (em, link) => {
  // send mail with defined transport object
  console.log("--*-**-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*");
  console.log(transporter);
  console.log("--*-**-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*");
  try {
    let info = await transporter.sendMail({
      from: '"noreplay" <noreply@fily.tech>', // sender address
      to: em, // list of receivers
      subject: "Reset Password", // Subject line
      text: `Go to this link to change your password :${link} `, // plain text body
      // html: `<div><p>Go to this link to change your password</p> <br/> <a herf=${link} >here</a></div>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (e) {
    console.log("--------------------error---------------------");
    console.log(e);
  }
};

module.exports = sendmail;
