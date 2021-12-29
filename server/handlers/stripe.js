import Stripe from 'stripe';
import Cart from '../models/cart';
import AppError from '../utils/AppError';
import catchASync from "../utils/catchASync";
import mongoose from 'mongoose';
import Product from '../models/product';
import allowedCountries from '../../utils/allowedCountries';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: null});

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
