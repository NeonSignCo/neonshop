import { createOrder } from "../../../../server/handlers/order";
import nc from "next-connect";
import dbConnection from "../../../../server/middleware/dbConnection";
import ncConfig from "../../../../server/utils/ncConfig";
import authenticate from "../../../../server/middleware/authenticate";

const handler = nc(ncConfig)
  .use(dbConnection, authenticate)
  .post(createOrder)

export default handler;
