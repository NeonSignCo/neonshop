import sendMail from "../../utils/email";
import user from "../models/user";
import AppError from "../utils/AppError";
import catchASync from "../utils/catchASync";
import { isEmail } from "../utils/utils";



// @route       POST /api/mail/forgot-password
// @purpose     send forgot password link
// @access      User

export const forgotPassword = catchASync(async (req, res) => {
    const email = req.body.email;

    if (!email) throw new AppError(400, 'email is required'); 

     if (!isEmail(email)) throw new AppError(400, "not a valid email address"); 

    const existingUser = await user.findOne({ email }); 

    if(!existingUser) throw new AppError(400, "user not found"); 

           
   

    const info = await sendMail({ from: '"NeonShop " <neonshop@support.com>', to: email, subject: 'password reset', text: 'this is the text', html: "<bold>password reset</bold>" });
  
    return res.json({
    status: "success",
        message: "check your email to get password reset link", 
    info
  });
});
