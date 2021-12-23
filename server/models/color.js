import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
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

const color =
  mongoose.models.color || mongoose.model("color", colorSchema);

export default color;
