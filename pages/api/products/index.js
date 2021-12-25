import { getAllProducts, uploadProduct } from "../../../server/handlers/products";
import handle from "../../../server/handlers/handle";
import multer from 'multer';
import { deleteAllProducts } from "../../../server/handlers/products";
import Product from "../../../server/models/product";


 
const handler = handle
  .get(getAllProducts)
  .post(
    multer({
      storage: multer.memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 },
    }).single("image"),
    uploadProduct
  )
  .delete(deleteAllProducts);


export default handler;



export const config = {
  api: {
    bodyParser: false
  },
};