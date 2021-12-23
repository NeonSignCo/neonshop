import Product from "../models/product";
import AppError from "../utils/AppError";
import catchASync from "../utils/catchASync";
import mongoose from 'mongoose';
import formidable from 'formidable-serverless';
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
  const uploadDir = "public/img/products";

  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  const maxFileSize = 5; //mb

  const form = new formidable.IncomingForm({
    maxFields: 6,
    maxFilesSize: maxFileSize * 1024 * 1024,
    uploadDir,
    keepExtensions : true
  }); 

  form.parse(req, async (error, fields, files) => {
    if (error) {
      console.log(error); 
      return res.status(400).json({ status: 'fail', message: error.message }); 
    }
    fields.image = files.image.path.replace('public', '');
    if (fields.sizes) fields.sizes = JSON.parse(fields.sizes);

    const product = await Product.create(fields);

    return res.json({
      status: 'success', 
      message: "product uploaded successfully", 
      product
    })
  })
}) 