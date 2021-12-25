import handle from "../../../server/handlers/handle";
import { register } from "../../../server/handlers/users";


const handler = handle.post(register);

export default handler;