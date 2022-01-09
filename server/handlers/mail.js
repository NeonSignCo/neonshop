import isEmail from "../../utils/isEmail";
import AppError from "../utils/AppError";
import catchASync from "../utils/catchASync";
import sendMail from "../utils/sendMail";

// @route       POSET api/mail
// @purpose     Send mail
// @access      Public
export const sendEmail = catchASync(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    country,
    enquiryType,
    size,
    heardFrom,
    joinNewsLetter,
    productInfo,
    message,
  } = req.body;

  return console.log(req.body, req.file)

  if (!enquiryType)
    throw new AppError(400, "enquiryType is required");

  const data = {
    firstName,
    lastName,
    email,
    phone,
    country,
    enquiryType,
    size,
    heardFrom,
    joinNewsLetter,
    productInfo,
    message,
  };

  let text = "";
  let html = "";

  // generate email text and html
  for (let key in data) {
    data[key] = JSON.parse(data[key]);
    if (key === "productInfo" && productInfo?.name?.length > 0) {
      text += `Product Name: ${data[key].name} \nProduct Image: ${data[key].image} \nProduct link: ${data[key].link}`;
      html += `<p style="color:black"><span style="font-weight: bold">Product Name:</span> ${data[key].name}</p>
               <p style="color:black"><span style="font-weight: bold">Product Image:</span> <img src=${data[key].image} style="width: 300px; object-fit: cover;"/></p>
               <p style="color:black"><span style="font-weight: bold">Product Link:</span> <a href=${data[key].link}>Link</a></p>`;
    } else {
      text += key === "productInfo" ? "" : `${key}: ${data[key]}\n`;
      html += `<p><span style="font-weight: bold">${key}:</span> ${data[key]}</p>`;
    }
  }

  const mailData = {
    from: `"NeonSignCo" <${process.env.MAIL_SMTP_USERNAME}>`,
    to: process.env.MAIL_SMTP_USERNAME,
    subject: data.enquiryType,
    text,
    html,
  };

 
  // await sendMail({ from, to, subject, text, html });
  return res.json({
    status: "success",
    message: "Your message has been received",
    mailData
  });
});
