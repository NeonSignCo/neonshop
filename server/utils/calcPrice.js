import Product from "../models/product";
import AppError from "./AppError";

const calcPrice = async function (doc) {
  return new Promise(async (resolve, reject) => {
    try {
      let subTotal = 0;
      let total = 0;
      let addedItems = [];  
      let addedCustomItems = [];
      
      // check if cart is empty
      if (!doc.items || !doc.customItems) throw new AppError(400, 'cart is empty');
      if (doc.items.length <= 0 && doc.customItems.length <= 0) throw new AppError(400, 'cart is empty');
      
      // for regular items
        if (doc.items?.length > 0) {
          await Promise.all(
            doc.items.map(async (item) => {
              // ignore if count is 0
              if (item.count <= 0) return;

              // check product
              const product = await Product.findById(item.product);
              if (!product)
                throw new AppError(404, "product in cart not found");

              // check duplicate item
              const dupIndex = addedItems.findIndex(
                (i) =>
                  i.product === item.product &&
                  i.selectedColor.hex === item.selectedColor.hex &&
                  i.selectedSize === item.selectedSize &&
                  i.selectedMountType === item.selectedMountType
              );
              if (dupIndex !== -1)
                throw new AppError(400, "duplicate items found");

              // adjust size if updated
              const size = product.sizes.find(
                (size) =>
                  String(size._id) === String(item.selectedSize.sizeId)
              ) || product.sizes[0];
              
              item.selectedSize = {info: size.info, price: size.price, sizeId: size._id};
                 // update price
                 const price =
                   product.salePercentage > 0
                     ? size.price - (size.price * product.salePercentage) / 100
                     : size.price;
                 subTotal += item.count * price;
                 total += item.count * price;

                 // add item
                 addedItems.push(item);
               })
             );
      }
      
      // // for custom items 
      if (doc.customItems?.length > 0) {
        
      }

      doc.subTotal = subTotal;
      doc.total = total;
        doc.items = addedItems;
      resolve(doc);
    } catch (error) {
      reject(error.code ? error : new AppError(400, error.message));
    }
  });
};


export default calcPrice;