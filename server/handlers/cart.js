import Cart from "../models/cart";
import AppError from "../utils/AppError";
import catchASync from "../utils/catchASync";

// @route       POST /api/cart
// @purpose     Add cart
// @access      user
export const addCart = catchASync(async (req, res) => {

  const { items } = req.body; 

  if (!items) throw new AppError(400, 'items is required');

  await Cart.validate()

  const cart = await Cart.create({items, userId: req.user._id});

  return res.json({
    status: "success",
    cart
  });
});

// @route       PATCH /api/cart
// @purpose     Update cart
// @access      user
export const updateCart = catchASync(async (req, res) => {
  
  const cart = await Cart.findOneAndUpdate({ userId: req.user._id }, { $set: req.body }, { new: true, runValidators: true });

  if (!cart) throw new AppError(404, 'no cart found');

  return res.json({
    status: "success",
    message: "cart updated",
    cart
  });
});
// @route       GET /api/cart
// @purpose     Get cart
// @access      user
export const getCart = catchASync(async (req, res) => {

  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) throw new AppError(404, 'cart  not found');

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
