import { motion } from "framer-motion"
import { useEffect } from "react";
import { FaChevronRight, FaMinus, FaPlane, FaPlus } from "react-icons/fa"
import { useGlobalContext } from "../context/GlobalContext";
import Axios from "../utils/Axios";
import catchASync from "../utils/catchASync";
import CustomLink from "./CustomLink";
import LoadingBtn, { Loader } from "./LoadingBtn";

const CartPreview = () => {
    const [globalState, setGlobalState] = useGlobalContext();
  
  
    // close preview on escape key
    useEffect(() => {
        const listener = (e) => e.key === 'Escape' &&
          setGlobalState((state) => ({
            ...state,
           cartData: {...state.cartData, show: false}
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
                cartData: { ...state.cartData, show: false },
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
            {globalState.cartData.cart?.items?.length > 0 ? (
              <div className="flex flex-col h-full">
                <div className="overflow-auto p-2 bg-gray-200 text-black flex flex-col gap-4">
                  {globalState.cartData.cart?.items?.map((item, i) => (
                    <CartItem item={item} key={i} />
                  ))}
                </div>
                <div className="flex-1 p-3 pt-5 flex flex-col gap-3 ">
                  <div className="flex flex-wrap justify-between">
                    <p className="font-semibold uppercase">subtotal</p>
                    <p className="font-semibold">
                      {globalState.cartData.cart?.subTotal}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-between">
                    <p className="font-semibold uppercase">shipping</p>
                    <p className="font-semibold uppercase">free</p>
                  </div>
                  <CustomLink
                    href="/checkout"
                    className="p-2 w-full bg-black text-white uppercase font-semibold transition flex items-center gap-2 justify-center"
                    onClick={() =>
                      setGlobalState((state) => ({
                        ...state,
                        cartData: { ...state.cartData, show: false },
                      }))
                    }
                  > 
                    <span className="">checkout </span>
                    {globalState.cartData.loading && <Loader />}
                  </CustomLink>
                  <CustomLink
                    href="/cart"
                    className="w-full bg-white p-2 uppercase border border-gray-400 font-semibold text-center transition hover:bg-black hover:text-white"
                    onClick={() =>
                      setGlobalState((state) => ({
                        ...state,
                        cartData: {...state.cartData, show: false}
                      }))
                    }
                  >
                    view cart
                  </CustomLink>
                </div>
              </div>
            ) : globalState.cartData.loading ? <div className="mt-20 max-w-max mx-auto">
              <Loader borderColor="border-black" />
            </div>: (
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
                      cartData: {...state.cartData, show: false}
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
  
  const updateCart = ({plus = true}) =>
    catchASync(
      async () => {
        setGlobalState((state) => ({
          ...state,
          cartData: { ...state.cartData, loading: true },
        }));
        const itemsCopy = JSON.parse(JSON.stringify(globalState.cartData.cart.items))
        const items = itemsCopy.map(cartItem => {
          const sameVariation =
            cartItem._id === item._id &&
            cartItem.product._id === item.product._id &&
            cartItem.selectedColor.hex === item.selectedColor.hex &&
            cartItem.selectedMountType === item.selectedMountType &&
            cartItem.selectedSize._id === item.selectedSize._id;
          
          if (sameVariation) {
            cartItem.count = plus ? cartItem.count + 1 : cartItem.count - 1;
          }
          return cartItem;
        } )
        const res = await Axios.post("cart", {items});

        setGlobalState((state) => ({
          ...state,
          cartData: {
            ...state.cartData,
            loading: false,
            cart: res.data.cart,
          },
        }));
      },
      setGlobalState,
      () =>
        setGlobalState((state) => ({
          ...state,
          cartData: { ...state.cartData, loading: false },
        }))
    );

const price = item.selectedSize.price

const salePrice =
  item.product.salePercentage > 0
    ? price - (price * item.product.salePercentage) / 100
    : price;
    return (
      <div className="flex items-center gap-2 bg-white p-2">
        <img
          src={item.product.image.url}
          alt="product"
          className="h-20 w-20 object-cover"
        />
        <div className="flex flex-col justify-between flex-1">
          <h3 className="font-semibold capitalize">{item.name}</h3>
          <p className="capitalize text-sm">
            color: <span className="uppercase">{item.selectedColor.name}</span> | size:{" "}
            <span className="uppercase">{item.selectedSize.info}</span> | mount:{" "}
            <span className="uppercase">{item.selectedMountType}</span>
          </p>
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center gap-2">
              <button
                className="h-5 w-5 flex items-center justify-center bg-gray-300 transition hover:bg-black hover:text-white text-[10px]"
                onClick={() => updateCart({plus: false})}
              >
                <FaMinus />
              </button>
              <p>{item.count}</p>
              <button
                className="h-5 w-5 flex items-center justify-center bg-gray-300 transition hover:bg-black hover:text-white text-[10px]"
                onClick={updateCart}
              >
                <FaPlus />
              </button>
            </div>
            <p className="font-semibold">
              $
              {salePrice * item.count}
            </p>
          </div>
        </div>
      </div>
    );
}