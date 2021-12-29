import nc from "next-connect";
import bodyParser from "body-parser";
import { webhookCheckout } from "../../../server/handlers/stripe";
import ncConfig from "../../../server/utils/ncConfig";


const handler = nc(ncConfig).use(bodyParser.raw({ type: "application/json" }))
  .post(webhookCheckout);

export default handler;
