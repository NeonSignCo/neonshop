import { buffer } from "micro";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const handler = async (req, res) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
        res.status(400).json({
            status: 'fail', 
            message: err.message
      })
    }

    res.json({status: 'success',  received: true, event });
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