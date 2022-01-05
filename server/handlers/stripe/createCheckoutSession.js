import Cart from "../../models/cart";
import Order from "../../models/order";
import Product from "../../models/product";
import AppError from "../../utils/AppError";
import catchASync from "../../utils/catchASync";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

// @route       POST /api/stripe/checkout-session
// @purpose     Create stripe checkout session
// @access      User
export const createCheckoutSession = catchASync(async (req, res) => {
  const { cartId, shippingAddress, contactEmail, paymentMethod } = req.body;
    const userId = req.user._id;

    // check paymentMethod
    if (paymentMethod !== "card" && paymentMethod !== "afterpay_clearpay") throw new AppError('paymentMethod must be either card or afterpay_clearpay')
      
    if (!cartId) throw new AppError(400, "cartId is required");

    if (!shippingAddress)
    throw new AppError(400, "shippingAddress is required"); 

    if (!contactEmail) throw new AppError(400, "contactEmail is required");
 
  // check cart
  const cart = await Cart.findById(cartId).populate({path: 'items.product', model: Product});
  if (!cart)
    throw new AppError(404, "cart not found. Please add to cart again");

//   // validate data
//   const data = {
//     items: cart.items, 
//     customItems: cart.customItems,
//     shippingAddress: { ...shippingAddress, userId },
//     userId, 
//     contactEmail,
//     status: "PENDING_PAYMENT",
//     subTotal: cart.subTotal,
//     total: cart.total,
//     expireAt: new Date(Date.now() + 1000 * 60 * 60 * 2), //expire after 2 hours
//   };
//   await Order.validate(data);

//   // create order
//   const order = await Order.create(data);

    const line_items = []; 
    
    // for regular products
    cart.items.forEach(item => {
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
          description: item.product.description,
          images: [item.product.image.url],
          metadata: {
            type: JSON.stringify('custom'),
            productId: JSON.stringify(item.product._id),
            selectedSize: JSON.stringify(item.selectedSize),
            selectedColor: JSON.stringify(item.selectedColor),
            selectedMountType: JSON.stringify(item.selectedMountType),
          },
        },
        unit_amount: item.selectedSize.price * 100,
      },
      quantity: item.count,
    });
  })
    
//   for custom products 
    cart.customItems.forEach(item => {
        line_items.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: "Custom Neon",
              description: "custom neon created by you",
              metadata: {
                type: JSON.stringify("custom"),
                text: JSON.stringify(item.text),
                font: JSON.stringify(item.font),
                color: JSON.stringify(item.color),
                size: JSON.stringify(item.size),
                icon: JSON.stringify(item.icon),
                backing: JSON.stringify(item.backing),
                mountType: JSON.stringify(item.mountType),
                note: JSON.stringify(item.note),
                width: JSON.stringify(item.width),
              },
            },
            unit_amount: item.price * 100,
          },
          quantity: item.count,
        });
    })
   const session = await stripe.checkout.sessions.create({
     mode: "payment",
     payment_method_types: [paymentMethod],
     line_items,
     client_reference_id: userId,
     customer_email: contactEmail,
     success_url: `${req.headers.origin}/thank-you?ordered=true`,
     cancel_url: `${req.headers.origin}/shop?text=order cancelled&type=ERROR&timeout=5000`,
     metadata: {
       userId
     },
   });

    res.json({
        status: 'success', 
        sessionId: session.id,
        sessionUrl: session.url
    })

});
