const AppError = require("../utils/AppError");
const catchASync = require("../utils/catchASync");

const csrfCheck = catchASync(async (req, res, next) => {
   const { csrfToken } = req.session;
   const receivedCsrfToken = req.headers["csrf-token"];
   if (!receivedCsrfToken || csrfToken !== receivedCsrfToken) {
     throw new AppError(400, "Provided CSRF-token is invalid");
   }
   next();
})

module.exports = { csrfCheck };
