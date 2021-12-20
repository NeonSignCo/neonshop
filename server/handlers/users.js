import bcrypt from 'bcryptjs';
import User from "../models/user";
import Session from "../models/session";
import {initSession, isEmail} from "../utils/utils";
import AppError from '../utils/AppError';
import catchASync from '../utils/catchASync';
import { serialize } from 'cookie'

// @route       POST /api/users/register 
// @purpose     Register User
// @access      public
export const register = catchASync(async (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    userName,
    photo,
  } = req.body;

  // check required fields
  if (!email) throw new AppError(400, "email is required");
  if (!isEmail(email)) {
    throw new AppError(400, "Email must be a valid email address.");
  }
  if (!password) throw new AppError(400, "password is required");
  if (!confirmPassword) throw new AppError(400, "confirmPassword is required");
  if (!firstName) throw new AppError(400, "firstName is required");
  if (!lastName) throw new AppError(400, "lastName is required");
  if (!userName) throw new AppError(400, "userName is required");

  if (password.length < 6) {
    throw new AppError(400, "Password must be atleast 6 characters long.");
  }

  if (password !== confirmPassword)
    throw new AppError(400, "passwords do not match");

  const user = await User.create({
    firstName,
    lastName,
    userName,
    email,
    password,
    photo,
  });

  const session = await initSession(user._id);

  // auth token
  res.setHeader(
    "Set-Cookie",
    serialize("token", String(session.token), {
      maxAge: process.env.AUTH_COOKIE_MAX_AGE_IN_SECONDS || 1209600,
      sameSite: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })
  );

  return res.status(201).json({
    status: "success",
    message: "Successfully registered new user",
    user,
  });
} )

// @route       POST /api/users/login 
// @purpose     Login User
// @access      public
export const login = catchASync(async (req, res) => {
  const { email, password } = req.body;

  if (!email) throw new AppError(400, 'email is required')
  if (!isEmail(email)) throw new AppError(400, "not a valid email address");
  if (!password) throw new AppError(400, 'password is required')
  
  
  if (typeof password !== "string") throw new AppError(400, 'password must be a string');
  
  const user = await User.findOne({ email });
  
  if (!user) throw new AppError(404, "User not found");

  const userId = user._id;

  const passwordValidated = await bcrypt.compare(password, user.password);
  if (!passwordValidated) {
    throw new AppError(400, "Incorrect password");
  }

  const session = await initSession(userId);

  // remove sensitive data 
  user.password = undefined;

  // auth token
  res
    .setHeader(
      "Set-Cookie",
      serialize("token", String(session.token), {
        maxAge: process.env.AUTH_COOKIE_MAX_AGE_IN_SECONDS || 1209600, 
        sameSite: true, 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        path: '/'
      }), 
  )
    
    return res.json({
      status: "success",
      message: "login successful",
      user,
    });
})

// @route       GET /api/users/me 
// @purpose     Get logged in user   
// @access      User
export const getMe = catchASync(async (req, res) => {
  const userId = req.session?.userId;  

  if (!userId) throw new AppError(400, 'not logged in');
  const user = await User.findById(
      { _id: userId },
      { password: 0, _id: 0 }
    ); 

  if(!user) throw new AppError('not logged in')
 
  res.json({
    status: "success",
    message: "successfully authenticated user",
    user,
  });
})

// @route       DELETE /api/users/delete-me 
// @purpose     Delete user
// @access      User
export const deleteMe = catchASync(async (req, res) => {
  const { userId } = req.session;
  const { password } = req.body;
  if (typeof password !== "string") {
    throw new AppError(400, "invalid password");
  }
  const user = await User.findById({ _id: userId });

  const passwordValidated = await bcrypt.compare(password, user.password);
  if (!passwordValidated) {
    throw new AppError(400, "incorrect password");
  }

  await Session.expireAllTokensForUser(userId);

  // remove auth cookie
   res.setHeader(
     "Set-Cookie",
     serialize("token", '', {
       maxAge: -1,
       sameSite: true,
       httpOnly: true,
       secure: process.env.NODE_ENV === "production",
       path: "/",
     })
   );
  await User.findByIdAndDelete({ _id: userId });
  res.json({
    status: "Success",
    message: "Account deleted",
  });
})

// @route       PUT /api/users/logout
// @purpose     Logout user
// @access      User
export const logOut = catchASync(async (req, res) => {
  const userId = req.session?.userId;

  if (!userId) throw new AppError(400, "not logged in");

  await Session.expireAllTokensForUser(userId);
  // remove auth cookie
  res.setHeader(
    "Set-Cookie",
    serialize("token", "", {
      maxAge: -1,
      sameSite: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })
  );

  res.json({
    status: "success",
    message: "logout successful",
  });
})


// @route       GET /api/users
// @purpose     Get all users 
// @access      Public 
export const getAllUsers =  catchASync(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = limit * (page - 1);

  if (!page)
    throw new AppError(400, "invalid page query. Page must me a number");
  if (!limit)
    throw new AppError(400, "invalid limit query. Limit must me a number");

  // cache data for 1 hour 
  const users = await User.find().skip(skip).limit(limit);
    
  return res.json({
      status: "success",
      message: "successfully retrieved all users data",
      page,
      limit,
      users
    });

}) 