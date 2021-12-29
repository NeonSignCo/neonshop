import { buffer } from "micro";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: null});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const handler = async (req, res) => {
    if (req.method === "POST") {
        let sig;
    try {
        const buf = await buffer(req);
        sig = req.headers["stripe-signature"];
        const event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
        return res.json({ status: "success", received: true, event });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 'fail', 
            message: error.message, 
            sig
        })
    }
  } else {
    res.status(405).end("Method Not Allowed");
  }
};

export default handler;


export const config = {
  api: {
    bodyParser: false,
  },
};