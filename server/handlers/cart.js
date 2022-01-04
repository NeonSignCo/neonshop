import mongoose from "mongoose";
import Cart from "../models/cart";
import Category from "../models/category";
import Product from "../models/product";
import AppError from "../utils/AppError";
import calcPrice from "../utils/calcPrice";
import catchASync from "../utils/catchASync";
import getUpdatedCart from "../utils/getUpdatedCart";
import getLoggedInUser from '../../utils/getLoggedInUser';
import setToken from "../utils/setToken";

// @route       POST /api/cart
// @purpose     Add to cart
// @access      Public
export const addToCart = catchASync(async (req, res) => {
  const { items, customItems } = req.body; 

  if (!items && !customItems) throw new AppError(400, "items or customItems is required");
  let userId;

  // get userId from logged in user
  const user = await getLoggedInUser(req);
  if (user) userId = user._id;

  // else get temporary userId from cookie
  if (!userId && req.cookies.tempUserId) userId = req.cookies.tempUserId;

  // else assign a new temporary userId
  if (!userId) {
    const newId = new mongoose.Types.ObjectId();
    setToken(res, "tempUserId", newId);
    userId = newId;
  }
  const data = { items, customItems, userId };

  
  await Cart.validate(data);

  const calculatedCart = await calcPrice(data);
  // update cart if exists
  const cart = await Cart.findOneAndUpdate({ userId }, calculatedCart, {
    new: true,
    upsert: true,
    runValidators: true,
  }).populate({
    path: "items.product",
    model: Product,
    populate: { path: "category", model: Category },
  });

  return res.json({
    status: "success",
    message: "added to cart",
    cart,
  });
});
// @route       PATCH /api/cart
// @purpose     update
// @access      User/tempUser
export const updateCart = catchASync(async (req, res) => {
  const { items, customItems } = req.body;
  if (!items && !customItems) throw new AppError(400, "items or customItems is required");
 let userId;

 // get userId from logged in user
 const user = await getLoggedInUser(req);
 if (user) userId = user._id;

 // else get temporary userId from cookie
  if (!userId && req.cookies.tempUserId) userId = req.cookies.tempUserId; 
  
  if (!userId) throw new AppError(404, 'not authorized'); 
  
  const data = { items, customItems, userId };

  await Cart.validate(data);
 
  const calculatedCart = await calcPrice(data);
  if (calculatedCart.items.length <= 0) {
    const deletedCart = await Cart.findOneAndDelete({ userId });
    if (!deletedCart) throw new AppError(404, 'cart not found');
    return res.json({
      status: 'success', 
      message: 'cart deleted duo to no items'
    })
  }
  const cart = await Cart.findOneAndUpdate(
    { userId },
    calculatedCart,
    {
      new: true,
      runValidators: true,
    }
  ).populate({
    path: "items.product",
    model: Product,
    populate: { path: "category", model: Category },
  });

  if (!cart) throw new AppError(404, 'cart not found');

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
   let userId;

   // get userId from logged in user
   const user = await getLoggedInUser(req);
   if (user) userId = user._id;

   // else get temporary userId from cookitempU
   if (!userId && req.cookies.tempUserId) userId = req.cookies.tempUserId;

  if (!userId) throw new AppError(404, "not authorized"); 
  
  const cart = await getUpdatedCart(userId);
  return res.json({
    status: "success",
    message: "successfully retrieved cart data",
    cart,
  });
});


// @route       DELETE /api/cart
// @purpose     Delete cart
// @access      user/tempUser
export const deleteCart = catchASync(async (req, res) => {

   let userId;

   // get userId from logged in user
   const user = await getLoggedInUser(req);
   if (user) userId = user._id;

   // else get temporary userId from cookie
   if (!userId && req.cookies.tempUserId) userId = req.cookies.tempUserId;

   if (!userId) throw new AppError(404, "not authorized"); 

  const cart = await Cart.findOneAndDelete({ userId });

  if(!cart) throw new AppError(404, 'cart not found')

  return res.json({
    status: "success",
    message: "cart deleted", 
    cart
  });
});
