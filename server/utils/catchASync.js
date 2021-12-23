const mongoose = require("mongoose");

const catchASync = (fn) => (req, res) =>
  fn(req, res).catch((err) => {
    // log error message in development
    if (process.env.NODE_ENV !== "production") console.log(err.stack);

    // handle mongoose validation error
    if (err instanceof mongoose.Error)
      return res.status(400).json({
        status: "Fail",
        message: Object.values(err.errors)[0].message,
      });

    const code = err.code || 500;
    const status =
      code === 400
        ? "Bad Request"
        : code === 401
        ? "Unauthorized"
        : code === 404
        ? "Not Found"
        : "Fail";

    return res.status(code).json({
      status,
      message: code === 500 ? "Server Error" : err.message,
    });
  });

module.exports = catchASync;
