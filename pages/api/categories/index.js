import dbConnect from "../../../server/connectDb";
import {
  addCategory,
  getAllCategories,
} from "../../../server/handlers/category";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
      case "GET":
          return getAllCategories(req, res);
    case "POST":
      return addCategory(req, res);
    default:
      res.status(404).json({ status: "fail", message: "resource not found" });
      break;
  }
}
