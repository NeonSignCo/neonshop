import handle from "../../../server/handlers/handle";
import { authenticate } from "../../../server/middleware/authenticate";


const handler = handle.post(authenticate)

export default handler;