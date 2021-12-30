import mongoose from "mongoose";
import ItemSchema from "../schemas/ItemSchema";

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "userId is required"],
    },
    items: [ItemSchema],
    subTotal: Number,
    discount: Number,
    total: Number,
  },
  { timestamps: true }
);


const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;
