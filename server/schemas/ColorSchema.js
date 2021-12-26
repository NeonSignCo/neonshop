import mongoose from "mongoose";

const ColorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    hex: {
      type: String,
      required: [true, "hex is required"],
    },
  },
  { timestamps: true }
);

export default ColorSchema;
