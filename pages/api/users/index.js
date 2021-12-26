import nc from "next-connect";
import multer from "multer";
import dbConnection from "../../../server/middleware/dbConnection";
import {
  getAllUsers, updateMe,
} from "../../../server/handlers/users";
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
  .use(dbConnection)
  .get(getAllUsers)
  .patch(
    authenticate,
    multer({
      storage: multer.memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 },
    }).single("image"),
    updateMe
  );

export default handler; 


export const config = {
  api: {
    bodyParser: false,
  },
};
