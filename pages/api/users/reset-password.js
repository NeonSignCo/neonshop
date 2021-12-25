import handle from "../../../server/handlers/handle";
import { resetPassword } from "../../../server/handlers/users";


const handler = handle.post(resetPassword)

export default handler;