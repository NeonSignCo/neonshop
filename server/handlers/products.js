import Product from "../models/product";
import AppError from "../utils/AppError";
import catchASync from "../utils/catchASync";
import mongoose from 'mongoose';
import uploadImage from "../utils/uploadImage";
import {v2 as cloudinary} from 'cloudinary';

// @route       GET /api/products
// @purpose     Get all products
// @access      public
export const getAllProducts = catchASync(async (req, res) => {
  let { page = 1, limit = 9999, category , name  } = req.query;

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
  const { name, sizes, description, category } = req.body;
  if (!req.file) throw new AppError(400, "image is required");
  if (!name) throw new AppError(400, "name is required");
  if (!sizes) throw new AppError(400, "sizes is required");
  if (!description) throw new AppError(400, " description is required");
  if (!category) throw new AppError(400, "category is required");
  if (!mongoose.Types.ObjectId.isValid(category))
    throw new AppError(400, "catgegory is not valid");

  const product = await Product.create({ name, sizes: JSON.parse(sizes), description, category });

  // cloudinary
  const img = await uploadImage({
    buffer: req.file.buffer,
    width: 500,
    folder: "neonshop/img/products",
  });
  
  product.image = {version: img.version, public_id: img.public_id, url: img.secure_url }

  await product.save(); 


    return res.json({
      status: 'success',
      message: "product uploaded successfully",
      product
    })
})
 

// @route       PATCH /api/products/:id 
// @purpose     Update product
// @access      Admin
export const updateProduct = catchASync(async (req, res) => {
  const { name, description, category } = req.body;
  let image;
  let sizes = req.body.sizes;
  const id = req.query?.id;

  if (!mongoose.Types.ObjectId.isValid(id)) throw new AppError(400, 'not a valid id');

  // check if product exists 
  const product = await Product.findById(id);
  if (!product) throw new AppError(404, 'product not found');


  // update image if provided 
  if (req.file) {
    // delete previous image if exists
    if (product.image?.public_id) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      await cloudinary.v2.uploader.destroy(product.image.public_id);
    }
    const img = await uploadImage({
      buffer: req.file.buffer,
      width: 500,
      folder: "neonshop/img/products",
    });
    image = {
      version: img.version,
      public_id: img.public_id,
      url: img.secure_url,
    };
  }

  if (sizes) {
    sizes = JSON.parse(sizes); 
  };

  const updatedProduct = await Product.findByIdAndUpdate(id, { $set: { name, description, sizes, category, image } }, {new: true, runValidators: true});

  return res.json({
    status: "success",
    message: "product updated successfully",
    product: updatedProduct,
  });
});
 
// @route       DELETE /api/products/:id 
// @purpose     delete product
// @access      Admin
export const deleteProduct = catchASync(async (req, res) => {
  const id = req.query?.id;

  if (!mongoose.Types.ObjectId.isValid(id)) throw new AppError(400, 'not a valid id');

  // check if product exists 
  const product = await Product.findById(id);
  if (!product) throw new AppError(404, 'product not found');
  
  // delete product image is exist
  if (product.image?.public_id) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
      await cloudinary.v2.uploader.destroy(product.image.public_id);
    }

  await product.delete()

  return res.json({
    status: "success",
    message: "product deleted" 
  });
});
 


// @route       DELETE /api/products
// @purpose     Delete all products
// @access      Admin
export const deleteAllProducts = catchASync(async (req, res) => {

   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET,
   });  

  //  delete all products
  await Product.deleteMany();

  // delete cloudinary folder containing all product images | don't show error if folder does not exist
  try {
    await cloudinary.api.delete_folder("neonshop/img/products");
  } catch (error) { 
  }


  return res.json({
    status: "success",
    message: "product deleted", 
  });
});