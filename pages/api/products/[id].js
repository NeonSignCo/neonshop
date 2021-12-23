import dbConnect from "../../../server/connectDb";
import {
    updateProduct
} from "../../../server/handlers/products";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "PATCH":
      return updateProduct(req, res);
    default:
      res.status(404).json({ status: "fail", message: "resource not found" });
      break;
  }
}
