const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Session = require('../models/session');
const { initSession, isEmail } = require('../utils/utils');
const AppError = require('../utils/AppError');
const catchASync = require('../utils/catchASync');
const redisCaching = require('../utils/redisCaching');


// @route       POST /api/users/register 
// @purpose     Register User
// @access      public
exports.register = catchASync(async (req, res) => {
  const { email, password, confirmPassword, name, photo } = req.body;
  
  if (!email || !password || !confirmPassword) throw new AppError(400, 'Please provide email, password and confirmPassword fields');

   if (!isEmail(email)) {
     throw new AppError(400, "Email must be a valid email address.");
   }
  
  if (typeof password !== "string") {
     throw new AppError(400, "Password must be a string.");
  }
  
  if (password !== confirmPassword) throw new AppError(400, 'passwords do not match');

   const user = new User({ email, password, name, photo });
   const persistedUser = await user.save();
   const userId = persistedUser._id;

   const session = await initSession(userId);

   res
     .cookie("token", session.token, {
       httpOnly: true,
       sameSite: true,
       maxAge: 1209600000, //14 days
       secure: process.env.NODE_ENV === "production",
     })
     .status(201)
     .json({
       status: "success",
       message: "Successfully registered new user",
       csrfToken: session.csrfToken,
       user: persistedUser
     });
} )

// @route       POST /api/users/login 
// @purpose     Login User
// @access      public
exports.login = catchASync(async (req, res) => {
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
  res
    .cookie("token", session.token, {
      httpOnly: true,
      sameSite: true,
      maxAge: 1209600000, // 14 days
      secure: process.env.NODE_ENV === "production",
    })
    .json({
      status: "success",
      message: "login successful",
      csrfToken: session.csrfToken,
      user,
    })
})

// @route       GET /api/users/me 
// @purpose     Get User Data
// @access      User
exports.getMe = catchASync(async (req, res) => {
  const { userId } = req.session;
  const user = await User.findById({ _id: userId }, { email: 1, _id: 0 });

  res.json({
    status: "success",
    message: "Successfully authenticated user",
    user,
  });
})

// @route       DELETE /api/users/delete-me 
// @purpose     Delete user
// @access      User
exports.deleteMe = catchASync(async (req, res) => {
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
  res.clearCookie("token");
  await User.findByIdAndDelete({ _id: userId });
  res.json({
    status: "Success",
    message: "Account deleted",
  });
})

// @route       PUT /api/users/delete-me 
// @purpose     Logout user
// @access      User
exports.logOut = catchASync(async (req, res) => {
  const { session: {userId} } = req;
  await Session.expireAllTokensForUser(userId)
  res.clearCookie("token");

  res.json({
    status: "success",
    message: 'logout successful'
  });
})


// @route       GET /api/users
// @purpose     Get all users 
// @access      Public 
exports.getAllUsers = catchASync(async (req, res) => {

  const { page = 1, limit = 10 } = req.query;

  if (!page)
    throw new AppError(400, "invalid page query. Page must me a number");
  if (!limit)
    throw new AppError(400, "invalid limit query. Limit must me a number");

  const skip = limit * (page - 1);

  // cache data for 1 hour 
  const users = await redisCaching('userssssss', User.find().skip(skip).limit(limit), 3600);
    return res.json({
      status: "success",
      message: "successfully retrieved all users data",
      page,
      limit,
      users
    });

}) 