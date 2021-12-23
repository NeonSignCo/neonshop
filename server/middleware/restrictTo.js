import Session from "../models/session";

const restrictTo = async (req, res) => {
  try {
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
  } catch (error) {
    return;
  }
};

export default restrictTo;
