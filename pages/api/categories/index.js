import {
  addCategory,
  getAllCategories,
} from "../../../server/handlers/category";
import handle from "../../../server/handlers/handle";
import authenticate from "../../../server/middleware/authenticate";
import restrictTo from "../../../server/middleware/restrictTo";

const handler = handle
  .get(getAllCategories)
  .post(authenticate, restrictTo("ADMIN"), addCategory);

export default handler;