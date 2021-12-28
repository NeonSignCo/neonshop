import mongoose from 'mongoose';
import ImageSchema from '../schemas/ImageSchema';
import SizeSchema from '../schemas/SizeSchema';


const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true,
    },
    slug: {
      type: String,
      required: [true, "slug is required"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    image: ImageSchema,
    category: {
      type: mongoose.Schema.ObjectId,
      required: [true, "product category is required"],
      ref: "category",
    },
    sizes: [SizeSchema], 
    salePercentage: Number
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
