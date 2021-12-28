import { webhookCheckout } from "../../../server/handlers/stripe";
import nc from "next-connect";
import dbConnection from "../../../server/middleware/dbConnection";
import ncConfig from "../../../server/utils/ncConfig";

const handler = nc(ncConfig)
  .use(dbConnection)
  .post(webhookCheckout);

export default handler;
