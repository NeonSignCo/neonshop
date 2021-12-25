import handle from "../../../server/handlers/handle";
import {
  addBillingAddress,
  updateBillingAddress,
} from "../../../server/handlers/users";
import authenticate from "../../../server/middleware/authenticate";

const handler = handle
  .use(authenticate)
  .post(addBillingAddress)
  .patch(updateBillingAddress);

export default handler;
