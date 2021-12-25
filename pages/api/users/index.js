import { getAllUsers } from "../../../server/handlers/users";
import handle from "../../../server/handlers/handle";

const handler = handle.get(getAllUsers);

export default handler;