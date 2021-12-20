import dbConnect from "../../../server/connectDb";
import { register } from "../../../server/handlers/users";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      return register(req, res)
    default:
      res
        .status(404)
        .json({ status: "fail", errorMessage: "resource not found" });
      break;
  }
}
 