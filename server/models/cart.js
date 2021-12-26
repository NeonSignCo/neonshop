import mongoose from "mongoose";
import ColorSchema from "../schemas/ColorSchema";
import SizeSchema from "../schemas/SizeSchema";

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "userId is required"],
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: [true, "product is required"],
        },
        selectedSize: {
          type: SizeSchema,
          required: [true, "selectedSize is required"],
        },
        selectedColor: {
          type: ColorSchema,
          required: [true, "selectedColor is requried"],
        },
        selectedMountType: {
          type: String,
          enum: {
            values: ["WALL", "HANGING"],
            message: "selectedMountType must be either WALL or HANGING",
          },
          required: [true, "selectedMountType is required"],
        },
        count: {
          type: Number,
          required: [true],
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;
