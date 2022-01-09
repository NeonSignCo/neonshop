import isEmail from "../../utils/isEmail";
import AppError from "../utils/AppError";
import catchASync from "../utils/catchASync";
import sendMail from "../utils/sendMail";

// @route       POSET api/mail
// @purpose     Send mail
// @access      Admin
export const sendEmail = catchASync(async (req, res) => {

  const { from, to, subject, text, html } = req.body;

    // check required fields 
  if (!from || !to || !subject || !text)
    throw new AppError(400, "from, to, subject, text fields are required");


    // check email 
    if(!isEmail(from) || !isEmail(to)) throw new AppError(400, 'not a valid email address')

  await sendMail({ from, to, subject, text, html });
  return res.json({
    status: "success",
    message: "your message has been received",
  });
});
