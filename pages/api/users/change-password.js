import handle from "../../../server/handlers/handle";
import { changePassword } from "../../../server/handlers/users";
import authenticate from "../../../server/middleware/authenticate";

const handler = handle.use(authenticate).patch(changePassword);

export default handler;
