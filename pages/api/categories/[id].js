import dbConnect from "../../../server/connectDb";
import { updateCategory, deleteCategory} from "../../../server/handlers/category";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "PATCH":
      return updateCategory(req, res);
    case "DELETE":
      return deleteCategory(req, res);
    default:
      res.status(404).json({ status: "fail", message: "resource not found" });
      break;
  }
}
