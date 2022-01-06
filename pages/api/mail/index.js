import {
    sendEmail
} from "../../../server/handlers/mail";
import nc from "next-connect";
import dbConnection from "../../../server/middleware/dbConnection";
import ncConfig from "../../../server/utils/ncConfig";

const handler = nc(ncConfig)
  .use(
    dbConnection,
  )
  .post(sendEmail);

export default handler;
