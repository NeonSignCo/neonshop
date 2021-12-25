import sendMail from "../../utils/sendMail";
import User from "../models/user";
import AppError from "../utils/AppError";
import catchASync from "../utils/catchASync";
import isEmail from '../../utils/isEmail';
import Token from '../models/token';



// @route       POST /api/mail/forgot-password
// @purpose     send forgot password link
// @access      Public

export const forgotPassword = catchASync(async (req, res) => {
    const email = req.body.email;

    if (!email) throw new AppError(400, 'email is required'); 

     if (!isEmail(email)) throw new AppError(400, "not a valid email address"); 

    const existingUser = await User.findOne({ email }).select('firstName'); 

    if(!existingUser) throw new AppError(400, "user not found"); 

  const token = await Token.genToken(); 

    const newToken = await Token.findOneAndUpdate(
      { userId: existingUser._id },
      { $set: { userId: existingUser._id, token, expires: Date.now() + 1000 * 60 * 60 * 24 } }, // 1 day limit
      { new: true, upsert: true }
    );
   
  const text = `Hello ${existingUser.firstName}, visit this link to reset your password: ${req.headers.origin}/forgot-password/${newToken.token}`;

    await sendMail({ from: '"NeonShop " <neonshop@support.com>', to: email, subject: 'Password Reset', text });

    return res.json({
    status: "success",
        message: "check your email to get password reset link", 
  });
});





