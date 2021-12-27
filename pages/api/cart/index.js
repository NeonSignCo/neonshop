import {
    addCart, 
    updateCart, 
    getCart, 
    deleteCart
} from "../../../server/handlers/cart";
import authenticate from "../../../server/middleware/authenticate";
import nc from "next-connect";
import dbConnection from "../../../server/middleware/dbConnection";
import ncConfig from "../../../server/utils/ncConfig";

const handler = nc(ncConfig)
  .use(dbConnection, authenticate)
  .get(getCart)
    .post(addCart)
    .patch(updateCart)
    .delete(deleteCart);

export default handler;
