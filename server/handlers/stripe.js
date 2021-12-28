import * as Stripe from 'stripe';
import Cart from '../models/cart';
import AppError from '../utils/AppError';
import catchASync from "../utils/catchASync";
import mongoose from 'mongoose';
import Product from '../models/product';
import countries from '../../utils/countries';
import allowedCountries from '../../utils/allowedCountries';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @route       POST /api/stripe/checkout-session
// @purpose     Init a checkout session
// @access      User 
export const initCheckoutSession = catchASync(async (req, res) => {
    const { cartId } = req.body;
    
    // check cartId
    if (!cartId) throw new AppError(400, 'cartId is required');
    if (!mongoose.Types.ObjectId.isValid(cartId)) throw new AppError(400, 'invalid cartId');


    // check cart 
    const cart = await Cart.findById(cartId).populate({
      path: "items.product",
      model: Product,
    }).lean(); 
    if (!cart.items) throw new AppError(400, 'cart not found')
    
    // check if cart has items 
    if (!cart.items || cart.items.length === 0) throw new AppError(400, 'cart is empty');
    
    
    const metadata = {}; 
    const line_items = [];
    cart.items.forEach(
        (item, i) => {

            const size = item.product.sizes.find(
              (i) => String(i._id) === String(item.selectedSize)
            );
            const defaultPrice = size.price * 100;

            const price =
                item.product.salePercentage > 0
                ? defaultPrice -
                    (defaultPrice * item.product.salePercentage) / 100
                : defaultPrice;

            // metadata
            metadata[`item-${i + 1}`] = JSON.stringify({
              productId: item.product._id,
              size,
              count: item.count,
              color: item.selectedColor,
              mountType: item.selectedMountType,
            });

            // line_item
            line_items.push({
              name: item.product.name,
              description: item.product.description,
              images: [item.product.image.url],
              amount: price,
              currency: "usd",
              quantity: item.count,
            });
      }
    );
  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "afterpay_clearpay"],
      mode: "payment",
      customer_email: req.user.email,
      client_reference_id: req.user._id,
      success_url: `${req.headers.origin}/shop?text=your order has been received!&type=SUCCESS&timeout=7000&clearCart=true`,
      cancel_url: `${req.headers.origin}/shop?text=Order failed!&type=ERROR&timeout=5000`,
      shipping_address_collection: {
        allowed_countries: allowedCountries,
      },
      phone_number_collection: {
        enabled: true,
      },
      line_items,
      metadata,
    });
    
    
    return res.json({
        status: 'success', 
        session
  })

})


// @route       GET /api/stripe/webhook-checkkout
// @purpose     webhook checkout
// @access      Public
export const webhookCheckout = catchASync(async (req, res) => {
     let stripeEvent;
     try {
       // (1) get the signature from req.headers
       const signature = req.headers["stripe-signature"];

       // (2) get access to the checkout session success event
       stripeEvent = stripe.webhooks.constructEvent(
         req.body,
         signature,
         process.env.STRIPE_WEBHOOK_SECRET
       );

       // (3) create an order using the session object in stripeEvent
         if (stripeEvent.type !== "checkout.session.completed") return;
         
         const session = stripeEvent.data.object;

        console.log(session)

       res.json({
         status: "success",  
           message: "Your order has been received", 
         session
       });
     } catch (error) {
       res
         .status(500)
         .json({ status: "fail", message: `Webhook error: ${error.message}` });
     }
})


