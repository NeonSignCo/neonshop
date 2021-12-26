import {
    addCart, 
    updateCart, 
    getCart, 
    deleteCart
} from "../../../server/handlers/cart";
import authenticate from "../../../server/middleware/authenticate";
import nc from "next-connect";
import dbConnection from "../../../server/middleware/dbConnection";

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
  .use(dbConnection, authenticate)
  .get(getCart)
    .post(addCart)
    .patch(updateCart)
    .delete(deleteCart);

export default handler;
