import { BsDash, BsPlus } from "react-icons/bs";
import CustomLink from "../components/CustomLink";
import LoadingBtn from "../components/LoadingBtn";
import FollowSection from "../components/sections/FollowSection"
import NewsLetterSection from "../components/sections/NewsLetterSection"
import { useGlobalContext } from "../context/GlobalContext";
import Cart from "../server/models/cart";
import Category from "../server/models/category";
import Product from "../server/models/product";
import Axios from "../utils/Axios";
import catchASync from "../utils/catchASync";
import getLoggedInUser from "../utils/getLoggedInUser";

const CartPage = () => {
    const [globalState] = useGlobalContext(); 
    
    return (
      <div className=" pt-20">
        <div className="px-5 lg:px-20">
          <h1 className="text-2xl sm:text-5xl text-center uppercase font-semibold mb-10">
            cart
          </h1>
          {globalState.cartData.cart?.items.length > 0 ? (
            <div className="flex flex-col lg:flex-row  gap-5 bg-gray-100">
              <div className="flex lg:self-start flex-col gap-4 bg-gray-200 p-2">
                {globalState.cartData.cart.items.map((item, i) => (
                  <CartItem item={item} key={i} />
                ))}
              </div>
              <div className="w-full md:w-[500px] mx-auto">
                <div className="sticky top-20 bg-white px-4 grid gap-2">
                  <h3 className="text-3xl uppercase text-center border-b pb-2 border-gray-300">
                    summary
                  </h3>
                  <div className="flex justify-between">
                    <p className="capitalize text-lg">subtotal</p>
                    <p className="text-xl ">
                      ${globalState.cartData.cart.subTotal}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="capitalize text-lg">shipping</p>
                    <p className="text-xl uppercase">free</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="capitalize text-lg ">total</p>
                    <p className="text-xl uppercase">
                      ${globalState.cartData.cart.subTotal}
                    </p>
                  </div>
                  <LoadingBtn
                    loading={globalState.cartData.loading}
                    className="bg-black text-white  text-center text-xl uppercase"
                  >
                    <CustomLink
                      href="/checkout"
                      text="checkout"
                      className="py-3 px-7 w-full"
                    />
                  </LoadingBtn>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-5">
              {" "}
              <h1 className="text-center text-xl  md:text-3xl mb-5">
                your cart is empty!
              </h1>{" "}
              <div className="flex flex-col sm:flex-row gap-3 items-center sm:justify-center">
                <CustomLink
                  href="/shop"
                  text="shop now"
                  className="h-12 w-52 flex items-center justify-center bg-black text-white uppercase font-semibold transition hover:text-gray-200"
                />
                <CustomLink
                  text="custom neon sign"
                  href="/custom-neon-sign"
                  className="h-12 w-52 flex items-center justify-center bg-white text-black border border-black uppercase font-semibold transition hover:bg-black hover:text-white"
                />
              </div>
            </div>
          )}
        </div>
        <div className="mt-20">
          <NewsLetterSection />
          <FollowSection />
        </div>
      </div>
    );
}

export default CartPage



const CartItem = ({ item }) => {
  console.log(item)
  const [globalState, setGlobalState] = useGlobalContext();
  const size = item.product.sizes.find(
    (size) => size._id === item.selectedSize
  );
     const updateCart = ({ plus = true, remove = false }) =>
       catchASync(
         async () => {
           setGlobalState((state) => ({
             ...state,
             cartData: { ...state.cartData, loading: true },
           }));
           const items = globalState.cartData.cart.items.map((cartItem) => {
             const sameVariation =
               cartItem._id === item._id &&
               cartItem.product._id === item.product._id &&
               cartItem.selectedColor.hex === item.selectedColor.hex &&
               cartItem.selectedMountType === item.selectedMountType &&
               cartItem.size === item.size;

             if (sameVariation) {
               cartItem.count =remove ? 0:  plus ? cartItem.count + 1 : cartItem.count - 1;
             }
             return cartItem;
           });

           const res = await Axios.post("cart", { items });

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
  return (
    <div className="flex flex-col md:flex-row gap-2 bg-white p-2">
      <CustomLink href={`shop/${item.product.category.slug}/${item.product.slug}`}>
        <img
          src={item.product.image.url}
          alt="product"
          className="w-full md:w-60 object-cover"
        />
      </CustomLink>
      <div className="flex flex-col gap-3 flex-1">
        <CustomLink
          href={item.productLink}
          className="font-semibol capitalize text-2xl"
        >
          {item.product.name}
        </CustomLink>
        <p className="capitalize text-sm">
          <span className="font-semibold">color:</span>{" "}
          <span className="uppercase">{item.selectedColor.name}</span> |{" "}
          <span className="font-semibold">size:</span>{" "}
          <span className="uppercase">{item.selectedSize.info}</span> |{" "}
          <span className="font-semibold">mount:</span>{" "}
          <span className="uppercase">{item.selectedMountType}</span>
        </p>
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              className="h-7 w-7 flex items-center justify-center bg-gray-300 transition hover:bg-black hover:text-white text-5xl disabled:bg-gray-300 disabled:text-black disabled:cursor-text"
              onClick={() => updateCart({ plus: false })}
              disabled={item.count === 1}
            >
              <BsDash />
            </button>
            <p className="text-2xl">{item.count}</p>
            <button
              className="h-7 w-7 flex items-center justify-center bg-gray-300 transition hover:bg-black hover:text-white text-5xl"
              onClick={updateCart}
            >
              <BsPlus />
            </button>
          </div>
          <p className="font-semibold">${size.price * item.count}</p>
        </div>
        <div className="flex justify-end">
          <button
            className="py-1 px-2 bg-gray-200 transition hover:bg-black hover:text-white"
            onClick={() => updateCart({ remove: true })}
          >
            remove
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ req }) => {
  try {
    const user = await getLoggedInUser(req);

    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const cart = await Cart.findOne({ userId: user._id })
      .populate(
       [ { path: "items.product", model: Product },
        { path: "items.product.category", model: Category }]
      )
      .lean();
    const orders = [];
    return {
      props: {
        orders,
        user: JSON.parse(JSON.stringify(user)),
        cart: JSON.parse(JSON.stringify(cart)),
        serverRendered: true,
      },
    };
  } catch (error) {
    return {
      props: {
        error: { code: 500, message: "server error" },
      },
    };
  }
};
