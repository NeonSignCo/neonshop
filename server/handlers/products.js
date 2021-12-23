import Product from "../models/product";
import AppError from "../utils/AppError";
import catchASync from "../utils/catchASync";
import mongoose from 'mongoose';
import fs from 'fs';

// @route       GET /api/products
// @purpose     Get all products
// @access      public
export const getAllProducts = catchASync(async (req, res) => {
  let { page = 1, limit = 30, category , name  } = req.query;

  if (!page || !typeof eval(page) === Number)
    throw new AppError(400, "invalid page query. Page must me a number");
  if (!limit || !typeof eval(limit) === Number)
    throw new AppError(400, "invalid limit query. Limit must me a number");
  page = Number(page); 
  limit = Number(limit);
  const skip = limit * (page - 1);
  
  if (category && !mongoose.Types.ObjectId.isValid(category)) throw new AppError(400, 'invalid cateogry input');
    
  if (name) {
    name = new RegExp( name, "i");
  }

  const products =
    category && name
      ? await Product.find({ category, name }).skip(skip).limit(limit)
      : category
      ? await Product.find({ category }).skip(skip).limit(limit)
      : name
      ? await Product.find({ name }).skip(skip).limit(limit)
      : await Product.find().skip(skip).limit(limit);
  return res.json({
    status: "success",
    page,
    limit,
    results: products.length,
    products,
  });
});


// @route       POST /api/products
// @purpose     Upload product
// @access      Admin
export const uploadProduct = catchASync(async (req, res) => {

  const { name, sizes, description, category, image } = req.body; 

  if (!name) throw new AppError(400, 'name is required'); 
  if (!sizes) throw new AppError(400, 'sizes is required'); 
  if (!description) throw new AppError(400, ' description is required'); 
  if (!category) throw new AppError(400, 'category is required'); 

  const product = await Product.create({ name, sizes, description, category, image }); 
   
    return res.json({
      status: 'success', 
      message: "product uploaded successfully", 
      product
    })
  })
 

// @route       PATCH /api/products/:id
// @purpose     Upload product
// @access      Admin
export const updateProduct = catchASync(async (req, res) => {
  const { name, sizes, description, category, image } = req.body; 
  const id = req.query?.id; 

  if (!mongoose.Types.ObjectId.isValid(id)) throw new AppError(400, 'not a valid id');

  const product = await Product.findByIdAndUpdate(id, { $set: { name, sizes, description, category, image } }, { new: true, runValidators: true });

  return res.json({
    status: "success",
    message: "product updated successfully",
    product,
  });
});
 
