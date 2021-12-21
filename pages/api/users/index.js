import dbConnect from "../../../server/connectDb";
import { getAllUsers } from "../../../server/handlers/users";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      return getAllUsers(req, res);
    default:
      res.status(404).json({ status: "fail", message: "resource not found" });
      break;
  }
}
