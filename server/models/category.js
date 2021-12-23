import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"], 
      unique: true
    },
    description: {
      type: String,
      required: [true, "description is required"],
    }
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
