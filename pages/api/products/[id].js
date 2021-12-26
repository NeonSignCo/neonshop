import nc from "next-connect";
import multer from "multer";
import dbConnection from "../../../server/middleware/dbConnection";
import restrictTo from "../../../server/middleware/restrictTo";
import {
  deleteProduct,
  updateProduct,
} from "../../../server/handlers/products";
import authenticate from "../../../server/middleware/authenticate";


const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);

    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }

    return res.status(500).json({
      status: "fail",
      message: "Server error",
    });
  },
  onNoMatch: (req, res, next) => {
    res.status(404).json({
      status: "fail",
      message: "Resource not found",
    });
  },
})
  .use(dbConnection, authenticate, restrictTo("ADMIN"))
  .patch(
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