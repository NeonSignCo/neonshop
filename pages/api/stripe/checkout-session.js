import nc from "next-connect";
import { createCheckoutSession } from "../../../server/handlers/stripe/checkout-session";
import dbConnection from "../../../server/middleware/dbConnection";
import ncConfig from "../../../server/utils/ncConfig";
import authenticate from '../../../server/middleware/authenticate';

const handler = nc(ncConfig).use(dbConnection, authenticate).post(createCheckoutSession);

export default handler;
