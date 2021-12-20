const Session = require('../models/session');
const catchASync = require('../utils/catchASync');

const authenticate = catchASync(async (req, res) => {
  const { token } = req.cookies;

  if (!token) return;
  
  if (typeof token !== "string") return;
  const session = await Session.findOne({ token, status: "valid" });

  if (!session) {
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
    return;
  }
  req.session = session;  
})

module.exports = { authenticate };
