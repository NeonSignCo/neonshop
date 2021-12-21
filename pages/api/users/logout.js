import dbConnect from "../../../server/connectDb";
import { logOut } from "../../../server/handlers/users";
import { authenticate } from "../../../server/middleware/authenticate";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "PUT":
      await authenticate(req, res);
      return logOut(req, res);
    default:
      res.status(404).json({ status: "fail", message: "resource not found" });
      break;
  }
}
