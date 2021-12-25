import handle from "../../../server/handlers/handle";
import { logOut } from "../../../server/handlers/users";
import authenticate from "../../../server/middleware/authenticate";


const handler = handle.use(authenticate).put(logOut); 


export default handler;