import mongoose from 'mongoose';
import ImageSchema from '../schemas/ImageSchema';
import SizeSchema from '../schemas/sizeSchema';


const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"], 
      unique: true
    },
    slug: String,
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
  },
  { timestamps: true }
);

ProductSchema.pre("save", function (next) {
  this.slug = slugify(this.name);
  next();
}); 

// function to slugify a name
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
