import handle from "../../../server/handlers/handle";
import {
    deleteProduct,
    updateProduct
} from "../../../server/handlers/products";
import multer from 'multer';

const handler = handle.patch(
  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, 
  }).single("image"),
  updateProduct
)
.delete(deleteProduct);

export default handler;


export const config = {
  api: {
    bodyParser: false,
  },
};