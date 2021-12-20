
import { BsDash, BsPlus } from "react-icons/bs";
import CustomLink from "../components/CustomLink";
import FollowSection from "../components/sections/FollowSection"
import NewsLetterSection from "../components/sections/NewsLetterSection"
import { useGlobalContext } from "../context/GlobalContext";

const Cart = () => {
    const [globalState] = useGlobalContext(); 
    
    return (
      <div className=" pt-20">
        <div className="px-5 lg:px-20">
          <h1 className="text-2xl sm:text-5xl text-center uppercase font-semibold mb-10">
            cart
          </h1>
          {globalState.cart.items.length > 0 ? (
            <div className="flex flex-col lg:flex-row  gap-5 bg-gray-100">
              <div className="flex lg:self-start flex-col gap-4 bg-gray-200 p-2">
                {globalState.cart.items.map((item, i) => (
                  <CartItem item={item} key={i} />
                ))}
              </div>
              <div className="w-full md:w-[500px] mx-auto">
                <div className="sticky top-20 bg-white px-4 grid gap-2">
                  <h3 className="text-3xl uppercase text-center border-b pb-2 border-gray-300">summary</h3>
                  <div className="flex justify-between">
                    <p className="capitalize text-lg">subtotal</p>
                    <p className="text-xl ">
                      $
                      {globalState.cart.subTotal}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="capitalize text-lg">shipping</p>
                    <p className="text-xl uppercase">free</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="capitalize text-lg ">total</p>
                    <p className="text-xl uppercase">
                      $
                      {globalState.cart.subTotal}
                    </p>
                                </div> 
                  <CustomLink
                    href="/checkout"
                    text="checkout"
                    className="bg-black text-white py-3 px-7 text-center text-xl uppercase"
                  />
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

export default Cart



const CartItem = ({ item }) => {
  const [globalState, setGlobalState] = useGlobalContext();

    const changeItem = ({ plus = true, remove = false }) => {
        setGlobalState((state) => {
            let cart;

            // remove item from cart if quantity becomes less than 1
            if (!plus && item.quantity === 1 || remove) {
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
    <div className="flex flex-col md:flex-row gap-2 bg-white p-2">
      <CustomLink href={item.productLink}>
        <img
          src="/img/product-images/product-3.jpg"
          alt="product"
          className="w-full md:w-60 object-cover"
        />
      </CustomLink>
      <div className="flex flex-col gap-3 flex-1">
        <CustomLink
          href={item.productLink}
          className="font-semibol capitalize text-2xl"
        >
          {item.name}
        </CustomLink>
        <p className="capitalize text-sm">
          <span className="font-semibold">color:</span>{" "}
          <span className="uppercase">{item.color.name}</span> |{" "}
          <span className="font-semibold">size:</span>{" "}
          <span className="uppercase">{item.size.shortHand}</span> |{" "}
          <span className="font-semibold">mount:</span>{" "}
          <span className="uppercase">{item.mountType}</span>
        </p>
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              className="h-7 w-7 flex items-center justify-center bg-gray-300 transition hover:bg-black hover:text-white text-5xl disabled:bg-gray-300 disabled:text-black disabled:cursor-text"
              onClick={() => changeItem({plus: false})} 
              disabled={item.quantity === 1}
            >
              <BsDash />
            </button>
            <p className="text-2xl">{item.quantity}</p>
            <button
              className="h-7 w-7 flex items-center justify-center bg-gray-300 transition hover:bg-black hover:text-white text-5xl"
              onClick={changeItem}
            >
              <BsPlus />
            </button>
          </div>
          <p className="font-semibold">
            $
            {item.size.price * item.quantity}
          </p>
              </div> 
            <div className="flex justify-end">
                <button className="py-1 px-2 bg-gray-200 transition hover:bg-black hover:text-white" onClick={() => changeItem({plus: false, remove: true})}>remove</button>
            </div>
      </div>
    </div>
  );
};