const nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({
    service: "Outlook",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USER, // generated ethereal user
      pass: process.env.PASS, // generated ethereal password
    },
  });


const SendMail = (subject, receivers, html) => {
    transporter.sendMail({
        from: `<${process.env.USER}>`, // sender address
        to: receivers, // list of receivers
        subject: subject, // Subject line
        html: html, // html body
      }).then(dataa => {
          
          console.log("Message sent: %s", dataa.messageId);
      }).catch(err => console.log(err))
}


module.exports = SendMail