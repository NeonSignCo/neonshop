import Cart from "../models/cart";
import Product from "../models/product";
import AppError from "../utils/AppError";
import catchASync from "../utils/catchASync";

// @route       POST /api/cart
// @purpose     Add or update cart
// @access      user
export const addOrUpdateCart = catchASync(async (req, res) => {
  if (!req.body.items) throw new AppError(400, "items is required");

  const data = { items: req.body.items, userId: req.user._id };

  await Cart.validate(data);

  const calculatedCart = await Cart.calcPrice(data);

  const cart = await Cart.findOneAndUpdate({ userId: data.userId }, calculatedCart, {
    new: true,
    upsert: true,
    runValidators: true, 
  }).populate({ path: "items.product", model: Product });

  return res.json({
    status: "success",
    message: 'cart updated',
    cart,
  });
});

// @route       GET /api/cart
// @purpose     Get cart
// @access      user
export const getCart = catchASync(async (req, res) => {

  const cart = await Cart.findOne({ userId: req.user._id }).populate({path: 'items.product', model: Product});

  return res.json({
    status: "success",
    message: "successfully retrieved cart data",
    cart
  });
});


// @route       DELETE /api/cart
// @purpose     Delete cart
// @access      user
export const deleteCart = catchASync(async (req, res) => {
  

  const cart = await Cart.findOneAndDelete({ userId: req.user._id });

  if(!cart) throw new AppError(404, 'cart not found')

  return res.json({
    status: "success",
    message: "cart deleted", 
    cart
  });
});
