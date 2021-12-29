import nc from "next-connect";
import { webhookCheckout } from "../../../server/handlers/stripe";
import ncConfig from "../../../server/utils/ncConfig";
import bodyParser from "body-parser";

const handler = nc(ncConfig)
  .use(bodyParser.raw({ type: "application/json" }))
  .post(webhookCheckout);

export default handler;


export const config = {
  api: {
    bodyParser: false
  }
}