import Cart from "../../models/cart";
import Order from "../../models/order";
import AppError from "../../utils/AppError";
import catchASync from "../../utils/catchASync";
import { buffer } from "micro";
import Stripe from "stripe"; 
import User from "../../models/user";
import Product from "../../models/product";
import Category from "../../models/category";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
// @route       POST /api/stripe/webhook-checkout
// @purpose     Listen for checkout session completion
// @access      Public
export const webhookCheckout = catchASync(async (req, res) => {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  const event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);

 
  if (event.type !== "checkout.session.completed") return;

  if (!event.data.object.metadata)
    throw new AppError(400, "metadata is required");
  const { orderId, userId } = event.data.object.metadata;

  if (!orderId) throw new AppError(400, "orderId is required");
  if (!userId) throw new AppError(400, "userId is required");

  const user = await User.findById(userId).select("firstName lastName");

  if (!user) throw new AppError(400, "user not found");

  const order = await Order.findOneAndUpdate(
    { _id: orderId, userId, status: "PENDING_PAYMENT" },
    { $set: { status: "ORDERED", expireAt: null } },
    { new: true, runValidators: true }
  ).populate([
    { path: "userId", model: User },
    {
      path: "items.product",
      model: Product,
      populate: { path: "category", model: Category },
    },
  ]);

  if (!order) throw new AppError(404, "order not found");

  // delete user cart
  await Cart.deleteMany({ userId });

  // send confirmation email
  try {
    const text = `Congrats ${user.firstName} ${user.lastName}, \n Your order has been successfully received by us. \n Your order id is: ${order._id} \n Check your order status from your account: \n ${req.headers.origin}/account`;
    await sendMail({
      from: "neonshopco@gmail.com",
      to: order.contactEmail,
      subject: "Your order has been received!",
      text,
    });
  } catch (error) {}

  return res.json({
    status: "success",
    message: "successfully received order",
  });
});