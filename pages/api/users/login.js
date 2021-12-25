import { login } from "../../../server/handlers/users";
import handle from "../../../server/handlers/handle";

const handler = handle.post(login);

export default handler;
