import nodemailer from "nodemailer"
export async function sendEmail(userID,userEmail) {
  if (!userEmail) {
    userEmail='ahmedmaged.route@gmail.com'
  }
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "noureldin.20200396@gmail.com",
          pass: "usiydjdwpzbfkjye",
        },
      });
      
        const info = await transporter.sendMail({
          from: '"noureldin 01116074676" <noureldin.20200396@gmail.com>', // sender address
          to: userEmail, // list of receivers
          subject: `"assignment 8 ¯\_(ツ)_/¯ 😋"`, // Subject line
          html: `<b>click to validate this account</b>
          <a href="http://localhost:3000/usersValidation/${userID}"></a>
          `, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
}