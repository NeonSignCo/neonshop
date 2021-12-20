import dbConnect from "../../../server/connectDb";
import { deleteMe } from "../../../server/handlers/users";
import { authenticate } from "../../../server/middleware/authenticate";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  
  switch (method) {
      case "POST": 
         await authenticate(req, res);
      return deleteMe(req, res);
    default:
      res
        .status(404)
        .json({ status: "fail", errorMessage: "resource not found" });
      break;
  }
}
