import {
    sendEmail
} from "../../../server/handlers/mail";
import authenticate from "../../../server/middleware/authenticate";
import restrictto from "../../../server/middleware/restrictTo";
import nc from "next-connect";
import dbConnection from "../../../server/middleware/dbConnection";
import ncConfig from "../../../server/utils/ncConfig";

const handler = nc(ncConfig)
  .use(
    dbConnection,
    authenticate,
    restrictto("ADMIN")
  )
  .post(sendEmail);

export default handler;
