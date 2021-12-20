import dbConnect from "../../../../server/connectDb";
import { forgotPassword } from "../../../../server/handlers/mail";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) { 
    case "POST":     
      return forgotPassword(req, res)
    default:
      res
        .status(404)
        .json({ status: "fail", errorMessage: "resource not found" });
      break;
  }
}
    