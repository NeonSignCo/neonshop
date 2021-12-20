const Session = require('../models/Session');
const AppError = require('../utils/AppError');
const catchASync = require('../utils/catchASync');

const authenticate = catchASync(async (req, res, next) => {
  const { token } = req.cookies;
 
  if (typeof token !== "string") {
    return next()
  }
  const session = await Session.findOne({ token, status: "valid" });

  if (!session) {
    res.clearCookie("token");
    return next()
  }
  req.session = session;
  next(); 
})

module.exports = { authenticate };
