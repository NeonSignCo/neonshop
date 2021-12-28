import mongoose from "mongoose";
import ColorSchema from "../schemas/ColorSchema";
import AppError from "../utils/AppError";
import Product from "./product";

const ItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: [true, "product is required"],
  },
  selectedSize: {
    type: mongoose.Schema.Types.ObjectId,
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
});


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


CartSchema.statics.calcPrice = async function (doc) {
  return new Promise(async (resolve, reject) => {
    try {
      let subTotal = 0;
      let total = 0;
      let addedItems = [];
      await Promise.all(
        doc.items.map(async (item) => {
          // ignore if count is 0
          if (item.count <= 0) return;

          // check product
          const product = await Product.findById(item.product);
          if (!product) throw new AppError(404, "product in cart not found");

          // check duplicate item
          const dupIndex = addedItems.findIndex(i => i.product === item.product && i.selectedColor.hex === item.selectedColor.hex && i.selectedSize === item.selectedSize && i.selectedMountType === item.selectedMountType); 
          if (dupIndex !== -1) throw new AppError(400, 'duplicate items found');

          // check size
          const size = product.sizes.find(
            (size) => String(size._id) === String(item.selectedSize)
          );

          if (!size) throw new AppError(400, "invalid size");

          // update price
          subTotal += item.count * size.price;
          total += item.count * size.price;

          // add item
          addedItems.push(item);
        })
      );
      doc.subTotal = subTotal;
      doc.total = total;
      doc.items = addedItems;
      resolve(doc);
    } catch (error) {
      reject(error.code ? error:  new AppError(400, error.message));
    }
  });
};




 

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;
