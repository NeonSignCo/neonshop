import {
  getMe
} from "../../../server/handlers/users";
import authenticate from '../../../server/middleware/authenticate';
import handle from "../../../server/handlers/handle";

const handler = handle
  .use(authenticate)
  .get(getMe);

export default handler;
