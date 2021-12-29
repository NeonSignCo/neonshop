import bodyParser from "body-parser";
import Stripe from 'stripe'; 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: null});

// ./utils/middleware.utils.ts
 function runMiddleware(req, res, fn
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // use bodyParser.raw() as middleware instead
  await runMiddleware(req, res, bodyParser.raw({ type: "application/json" }));

  try {
    const signature = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    res.status(200).json({received: true, event});

    // TODO: Handle event
  } catch (e) {
    return res.status(400).json({ error: `Webhook error: ${e.message}` });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
