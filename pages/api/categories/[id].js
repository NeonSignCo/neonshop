import {
  updateCategory,
  deleteCategory,
} from "../../../server/handlers/category";
import handle from "../../../server/handlers/handle";

const handler = handle.patch(updateCategory).delete(deleteCategory);

export default handler;