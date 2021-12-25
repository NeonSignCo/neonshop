import { changePassword, updateMe } from "../../../server/handlers/users";
import handle from "../../../server/handlers/handle";
import authenticate from "../../../server/middleware/authenticate";
import multer from "multer";

const handler = handle.use(authenticate).patch(
  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
  }).single("image"),
  updateMe
)
.patch(changePassword);

export default handler;


export const config = {
  api: {
    bodyParser: false,
  },   
};