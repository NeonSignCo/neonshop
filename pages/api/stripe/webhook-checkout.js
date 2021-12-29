import nc from "next-connect";
import bodyParser from "body-parser";
import { webhookCheckout } from "../../../server/handlers/stripe";


const handler = nc().use(bodyParser.raw({ type: "application/json" }))
  .post(webhookCheckout);

export default handler;


export const config = {
  api: {
    bodyParser: false,
  },
};