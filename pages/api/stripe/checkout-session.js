import {
  initCheckoutSession
} from "../../../server/handlers/stripe";
import authenticate from "../../../server/middleware/authenticate";
import nc from "next-connect";
import dbConnection from "../../../server/middleware/dbConnection";
import ncConfig from "../../../server/utils/ncConfig";

const handler = nc(ncConfig)
  .use(dbConnection, authenticate)
  .post(initCheckoutSession); 
  
export default handler;
