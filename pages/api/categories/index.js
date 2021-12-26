import {
  addCategory
} from "../../../server/handlers/category";
import authenticate from "../../../server/middleware/authenticate";
import restrictto from '../../../server/middleware/restrictTo';
import nc from "next-connect";
import multer from "multer";
import connectDb from '../../../server/utils/connectDb';


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
  .use(async (req, res, next) => {
    await connectDb();
    next(); 
  })
  .post(authenticate, restrictto('ADMIN'),addCategory)

export default handler;
