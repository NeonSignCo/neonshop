import Order from "../models/order";
import AppError from "../utils/AppError";
import catchASync from "../utils/catchASync";
import mongoose from 'mongoose';
import User from "../models/user";
import { findOrderByOrderId, findOrdersByCustomerId, findOrdersByCustomerName } from "../utils/queries";
import Product from "../models/product";
import Category from "../models/category";

// @route       POSET api/orders
// @purpose     create an order
// @access      User
export const createOrder = catchASync(async (req, res) => {
    const { items, shippingAddress } = req.body; 

    if (!shippingAddress) throw new AppError(400, "shippingAddress is required");
    if (!items) throw new AppError(400, "items is required");

    const data = { items, shippingAddress: { ...shippingAddress, userId: req.user._id }, userId: req.user._id, status: 'ORDERED', subTotal: 0, total: 0 };

    await Order.validate(data);

    // set final price after discount
    items.forEach((item, i) => {
        let price = item.selectedSize.price ;
        if (item.product.salePercentage > 0) {
          price = price - (price * item.product.salePercentage) / 100;
        }
       
        const totalPrice = price * item.count
        data.items[i].selectedSize.price = price
        data.subTotal += totalPrice; 
        data.total += totalPrice;

    })


    const order = await Order.create(data);

    return res.json({
        status: 'success', 
        message: 'your order has been placed', 
        order
    })
});


// @route       GET api/orders
// @purpose     Get orders via query params
// @access      Admin
export const getAllOrders = catchASync(async (req, res) => {
    let { page = 1, limit = 9999, from, till, id, customer_id, customer_name } = req.query;
    if (id && !mongoose.Types.ObjectId.isValid(id)) throw new AppError(400, "not a valid id");
    if (customer_id && !mongoose.Types.ObjectId.isValid(customer_id)) throw new AppError(400, "not a valid id");
    
    if (!page || !typeof eval(page) === Number)
      throw new AppError(400, "invalid page query. Page must me a number");
    if (!limit || !typeof eval(limit) === Number)
      throw new AppError(400, "invalid limit query. Limit must me a number");

    page = Number(page);
    limit = Number(limit);


    const skip = limit * (page - 1);
    const orders = customer_id
      ? await findOrdersByCustomerId(customer_id, from, till, skip, limit)
      : customer_name
      ? await findOrdersByCustomerName(customer_name, from, till, skip, limit)
      : id
      ? await findOrderByOrderId(id, from, till, skip, limit)
      : from && till
      ? await Order.find({ createdAt: { $gte: from, $lte: till } })
          .skip(skip)
          .limit(limit)
          .lean()
          .populate([
            { path: "userId", model: User },
            { path: "items.product", model: Product, populate: {path: 'category', model: Category} },
          ])
      : from
      ? await Order.find({ createdAt: { $gte: from } })
          .skip(skip)
          .limit(limit)
          .lean()
          .populate([
            { path: "userId", model: User },
            { path: "items.product", model: Product, populate: {path: 'category', model: Category} },
          ])
      : till
      ? await Order.find({ createdAt: { $lte: till } })
          .skip(skip)
          .limit(limit)
          .lean()
          .populate([
            { path: "userId", model: User },
            { path: "items.product", model: Product, populate: {path: 'category', model: Category} },
          ])
      : await Order.find()
          .skip(skip)
          .limit(limit)
          .lean()
          .populate([
            { path: "userId", model: User },
            { path: "items.product", model: Product, populate: {path: 'category', model: Category} },
          ]);

    return res.json({
      status: "success",
      message: "retrieved all orders",
      page,
      limit,
      from,
      till,
      customer_id,
      customer_name,
      id,
      results: Array.isArray(orders) ? orders.length : orders? 1: 0,
      orders,
    });
})







// @route       PATCH api/orders/:id
// @purpose     UPdate order
// @access      Admin
export const updateOrder = catchASync(async (req, res) => {
  const { status } = req.body; 
  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id))
    throw new AppError(400, "not a valid id");

  if (!status) throw new AppError(400, 'status is required'); 

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { $set: {status} },
    { new: true, runValidators: true }
  ).populate([
    { path: "userId", model: User },
    {
      path: "items.product",
      model: Product,
      populate: { path: "category", model: Category },
    },
  ]);


  if (!updatedOrder) throw new AppError(404, 'Order not found'); 

  return res.json({
    status: 'success', 
    message: 'order updated', 
    order: updatedOrder
  })
})


// @route       PATCH api/orders/:id
// @purpose     Delete order
// @access      Admin
export const deleteOrder = catchASync(async (req, res) => {
  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id))
    throw new AppError(400, "not a valid id");

  const doc = await Order.findByIdAndDelete(id);
  
  if(!doc) throw new AppError(404, 'Order not found')

  return res.json({
    status: 'success', 
    message: 'order deleted'
  })
})



// @route       PUT /api/orders
// @purpose     Delete specific orders
// @access      Admin
export const deleteOrdersById = catchASync(async (req, res) => {
  const { ids } = req.body;
  if (!ids) throw new AppError(400, 'ids is required');

  await Order.deleteMany({ _id: { $in: ids } });
  
  return res.json({
    status: "success",
    message: "orders deleted",
  });
});