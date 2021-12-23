import dbConnect from "../../../server/connectDb";
import { getAllProducts, uploadProduct } from "../../../server/handlers/products";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
          return getAllProducts(req, res);    
      case "POST":  
          return uploadProduct(req, res);
    default:
      res.status(404).json({ status: "fail", message: "resource not found" });
      break; 
  }
}


export const config = {
  api: {
    bodyParser: false,
  },
};