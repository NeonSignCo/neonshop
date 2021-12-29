import nc from "next-connect";
import { webhookCheckout } from "../../../server/handlers/stripe";
import ncConfig from "../../../server/utils/ncConfig";


const handler = nc(ncConfig)
  .post(webhookCheckout);

export default handler;


export const config = {
  api: {
    bodyParser: false
  }
}