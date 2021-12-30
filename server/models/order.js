import mongoose from "mongoose";
import AddressSchema from "../schemas/AddressSchema";
import ItemSchema from "../schemas/ItemSchema";


const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "userId is required"],
    },
    status: {
      type: String,
      enum: {
        values: ["ORDERED", "PROCESSING", "DELIVERED", "CANCELLED"],
        default: "ORDERED",
        message:
          "status must be one of 'ORDERED', 'PROCESSING', 'DELIVERED', 'CANCELLED",
      },
    },
    shippingAddress: {
      type: AddressSchema,
      required: [true, "shippingAddress is required"],
    },
    items: [ItemSchema],
    subTotal: Number,
    discount: Number,
    total: Number,
  },
  { timestamps: true }
);


const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
