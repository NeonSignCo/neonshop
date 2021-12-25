import handle from "../../../server/handlers/handle";
import { addShippingAddress, updateShippingAddress } from "../../../server/handlers/users";
import authenticate from "../../../server/middleware/authenticate";

const handler = handle.use(authenticate).post(addShippingAddress).patch(updateShippingAddress);

export default handler;
