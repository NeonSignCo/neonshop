import nodemailer from 'nodemailer';

const sendMail = ({ from, to, subject, text, html }) => new Promise(async (resolve, reject) => {
  try {

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_SMTP_HOST,
      port: process.env.MAIL_SMTP_PORT,
      secure: process.env.MAIL_SMTP_PORT === 465, 
      auth: {
        user: process.env.MAIL_SMTP_USERNAME,
        pass: process.env.MAIL_SMTP_PASSWORD, 
      },
    });

    await new Promise((resolve, reject) => {
      // verify connection configuration
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(success);
        }
      });
    });


    // send mail with defined transport object
    let info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });
 
    
    resolve(info);
  } catch (error) {
    reject(error)
  }
})


export default sendMail;