const mongoose = require('mongoose');

const catchASync = (fn) => (req, res, next) =>
  fn(req, res, next).catch((err) => {
    console.log(err);
    // handle mongoose validation error
    if (err instanceof mongoose.Error.ValidationError)
      return res.status(400).json({
        status: "Fail",
        errorMessage: Object.values(err.errors)[0].message,
      });
    const code = err.code || 500;
    const status =
      code === 400 ? "Bad Request" : code === 401 ? "Unauthorized" : code === 404 ? "Not Found": "Fail";

    return res.status(code).json({
      status,
      errorMessage: err.message || "server Error",
    });
  });


module.exports = catchASync;