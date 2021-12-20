import { motion } from "framer-motion"
import { useEffect } from "react";
import { FaChevronRight, FaMinus, FaPlane, FaPlus } from "react-icons/fa"
import { useGlobalContext } from "../context/GlobalContext";
import CustomLink from "./CustomLink";

const CartPreview = () => {
    const [globalState, setGlobalState] = useGlobalContext();

    // close preview on escape key
    useEffect(() => {
        const listener = (e) => e.key === 'Escape' &&
          setGlobalState((state) => ({
            ...state,
            showCart: false
          }));
        document.addEventListener('keydown', listener);
        return () => document.removeEventListener('keydown', listener);
    }, [])

    

    return (
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.3 } }}
        exit={{ opacity: 0, x: "100%", transition: { duration: 0.3 } }}
        className=" fixed top-0 right-0 z-40 w-full sm:w-auto h-full bg-white "
      >
        <div className="bg-white w-full sm:w-[370px] flex flex-col justify-between h-full">
          <button
            className="flex items-center text-white bg-gray-800 p-3 w-full"
            onClick={() =>
              setGlobalState((state) => ({
                ...state,
                showCart: false,
              }))
            }
          >
            <div className=" uppercase flex-1 flex items-center justify-center   gap-4">
              <p>free shipping</p>
              <FaPlane />
            </div>
            <FaChevronRight />
          </button>
          <div className="flex-1 h-full overflow-hidden ">
            {globalState.cart.items?.length > 0 ? (
              <div className="flex flex-col h-full">
                <div className="overflow-auto p-2 bg-gray-200 text-black flex flex-col gap-4">
                  {globalState.cart.items?.map((item, i) => (
                    <CartItem item={item} key={i} />
                  ))}
                </div>
                <div className="flex-1 p-3 pt-5 flex flex-col gap-3 ">
                  <div className="flex flex-wrap justify-between">
                    <p className="font-semibold uppercase">subtotal</p>
                    <p className="font-semibold">{globalState.cart.subTotal}</p>
                  </div>
                  <div className="flex flex-wrap justify-between">
                    <p className="font-semibold uppercase">shipping</p>
                    <p className="font-semibold uppercase">free</p>
                  </div>
                  <CustomLink
                    href="/checkout"
                    className="w-full bg-black p-2 uppercase text-white text-center"
                    onClick={() =>
                      setGlobalState((state) => ({
                        ...state,
                        showCart: false,
                      }))
                    }
                  >
                    checkout
                  </CustomLink>
                  <CustomLink
                    href="/cart"
                    className="w-full bg-white p-2 uppercase border border-gray-400 font-semibold text-center transition hover:bg-black hover:text-white"
                    onClick={() =>
                      setGlobalState((state) => ({
                        ...state,
                        showCart: false,
                      }))
                    }
                  >
                    view cart
                  </CustomLink>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center h-full bg-white gap-3 p-2">
                <h3 className="text-xl sm:text-3xl uppercase my-4">
                  your cart is empty
                </h3>
                <p className="text-center">
                  Ever wanted to create your dream neon?
                </p>
                <CustomLink
                  href="/custom-neon-sign"
                  className="px-6 py-3 uppercase bg-black text-white tracking-widest"
                  onClick={() =>
                    setGlobalState((state) => ({
                      ...state,
                      showCart: false,
                    }))
                  }
                >
                  start creating now
                </CustomLink>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
}

export default CartPreview


const CartItem = ({ item }) => {
    const [globalState, setGlobalState] = useGlobalContext();

  const changeQuantity = (plus = true) => {
      

      setGlobalState((state) => {

        let cart
       
        // remove item from cart if quantity becomes less than 1
        if (!plus && item.quantity === 1) { 
          const deleteIndex = state.cart.items.findIndex(
            (cartItem) =>
              cartItem._id === item._id &&
              cartItem.color.hex === item.color.hex &&
              cartItem.mountType === item.mountType &&
              cartItem.size.name === item.size.name
          );
          cart = {
            ...state.cart,
            subTotal: Number(state.cart.subTotal) - Number(item.size.price),
          }; 
          cart.items.splice(deleteIndex, 1);
        } else {
          // increase or decrease quantity
          cart = {
            ...state.cart,
            items: state.cart.items.map((cartItem) =>
              cartItem._id === item._id &&
              cartItem.color.hex === item.color.hex &&
              cartItem.mountType === item.mountType &&
              cartItem.size.name === item.size.name
                ? {
                    ...cartItem,
                    quantity: plus
                      ? Number(cartItem.quantity) + 1
                      : Number(cartItem.quantity) - 1,
                  }
                : cartItem
            ),
            subTotal: plus
              ? Number(state.cart.subTotal) + Number(item.size.price)
              : Number(state.cart.subTotal) - Number(item.size.price),
          };
        }

       

        // save to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // update state
        return {
          ...state,
          cart,
        };
      });
    };

    return (
      <div className="flex items-center gap-2 bg-white p-2">
        <img
          src="/img/product-images/product-3.jpg"
          alt="product"
          className="h-20 w-20 object-cover"
        />
        <div className="flex flex-col justify-between flex-1">
          <h3 className="font-semibold capitalize">{item.name}</h3>
          <p className="capitalize text-sm">
            color: <span className="uppercase">{item.color.name}</span> | size:{" "}
            <span className="uppercase">{item.size.shortHand}</span> | mount:{" "}
            <span className="uppercase">{item.mountType}</span>
          </p>
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center gap-2">
              <button
                className="h-5 w-5 flex items-center justify-center bg-gray-300 transition hover:bg-black hover:text-white text-[10px]"
                onClick={() => changeQuantity(false)}
              >
                <FaMinus />
              </button>
              <p>{item.quantity}</p>
              <button
                className="h-5 w-5 flex items-center justify-center bg-gray-300 transition hover:bg-black hover:text-white text-[10px]"
                onClick={changeQuantity}
              >
                <FaPlus />
              </button>
            </div>
            <p className="font-semibold">
              $
              {item.size.price * item.quantity}
            </p>
          </div>
        </div>
      </div>
    );
}