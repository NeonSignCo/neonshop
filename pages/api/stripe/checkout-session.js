import nc from "next-connect";
import { createCheckoutSession } from "../../../server/handlers/stripe/createCheckoutSession";
import dbConnection from "../../../server/middleware/dbConnection";
import ncConfig from "../../../server/utils/ncConfig";
import authenticate from '../../../server/middleware/authenticate';

const handler = nc(ncConfig).use(dbConnection).post(createCheckoutSession);

export default handler;
