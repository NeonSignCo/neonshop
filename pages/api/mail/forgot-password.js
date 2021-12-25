import handle from "../../../server/handlers/handle";
import { forgotPassword } from "../../../server/handlers/mail";

const handler = handle.post(forgotPassword); 

export default handler; 

