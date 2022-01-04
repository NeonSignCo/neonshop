import Cart from '../models/cart';
import Product from '../models/product';
import Category from '../models/category';

const getUpdatedCart = (userId) => new Promise(async (resolve, reject) => {
  try {
    let cart;
    cart = await Cart.findOne({ userId })
      .populate({
        path: "items.product",
        model: Product,
        populate: { path: "category", model: Category },
      })
      .lean();
     
    if (!cart) return resolve({});
    // filter cart in case any product has been updated
    const {changed, filteredCart} = filterCart(cart);
    if (changed) {
      cart = await Cart.findOneAndUpdate(
        { userId },
        filteredCart,
        { new: true, runValidators: true }
      )
        .populate({
          path: "items.product",
          model: Product,
          populate: { path: "category", model: Category },
        })
        .lean();;
    }

    resolve(cart);
  } catch (error) {
    reject(error)
  }
})

const filterCart = (doc) => {
   const cart = JSON.parse(JSON.stringify(doc));
  let changed = false;
   let subTotal = 0;
   let total = 0;
   let addedItems = [];

   if (cart.items?.length > 0) {
     cart.items.forEach((item) => {
       // check if count is 0
       if (item.count <= 0) return (changed = true);

       // check if product exists
       if (!item.product) return (changed = true);

       // check duplicate item
       const dupIndex = addedItems.findIndex(
         (i) =>
           String(i.product._id) === String(item.product._id) &&
           i.selectedColor.hex === item.selectedColor.hex &&
           String(i.selectedSize._id) === String(item.selectedSize._id) &&
           i.selectedMountType === item.selectedMountType
       );
       if (dupIndex !== -1) return (changed = true);

       // adjust size if updated
       const size =
         item.product.sizes.find(
           (size) => String(size._id) === String(item.selectedSize.sizeId)
         ) || item.product.sizes[0];

       item.selectedSize = {
         info: size.info,
         price: size.price,
         sizeId: size._id,
       };

       // update price
       const price =
         item.product.salePercentage > 0
           ? size.price - (size.price * item.product.salePercentage) / 100
           : size.price;
       subTotal += item.count * price;
       total += item.count * price;

       // add item
       addedItems.push(item);
     });
   }

   cart.subTotal = subTotal;
   cart.total = total;
  cart.items = addedItems;  
   return {changed, filteredCart: cart};
}

export default getUpdatedCart;
