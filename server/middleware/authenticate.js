const Session = require('../models/session');
const AppError = require('../utils/AppError');
const catchASync = require('../utils/catchASync');

const authenticate = catchASync(async (req, res, next) => {
  const { token } = req.cookies;
  if (typeof token !== "string") {
    throw new AppError(401, "Request cookie is invalid.");
  }
  const session = await Session.findOne({ token, status: "valid" });
  if (!session) {
    res.clearCookie("token");
    throw new AppError(401, "Your session has expired. You need to log in.");
  }
  req.session = session;
  next();
})

module.exports = { authenticate };
