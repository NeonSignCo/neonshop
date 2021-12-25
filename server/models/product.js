import mongoose from 'mongoose';


const SizeSchema = new mongoose.Schema({
  info: {
    type: String,
    validate: {
      validator: (val) => typeof val === "string",
      message: "info must be stirng",
    },
    required: [true, "info is required for size"],
  },
  price: {
    type: Number,
    validate: {
      validator: (val) => typeof val === "number",
      message: "price must be number",
    },
    required: [true, "price is required for size"],
  },
});

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    validate: {
      validator: (val) => typeof val === "string",
      message: "url must be stirng",
    },
    required: [true, "url is required"],
  },
  version: {
    type: Number,
    validate: {
      validator: (val) => typeof val === "number",
      message: "version must be number",
    },
    required: [true, "version is required"],
  },
  public_id: {
    type: String,
    validate: {
      validator: (val) => typeof val === "string",
      message: "public_id must be stirng",
    },
    required: [true, "public_id is required"],
  },
});

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
