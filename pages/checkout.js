import { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import CustomLink from "../components/CustomLink";
import InfoSection from "../components/sections/checkout/InfoSection";
import PaymentSection from "../components/sections/checkout/PaymentSection";
import CheckoutContext, {
  INFO_SECTION,
  PAYMENT_SECTION,
  useCheckoutContext,
} from "../context/CheckoutContext";
import { useGlobalContext } from "../context/GlobalContext";
import Nav from "../components/nav/Nav";
import Footer from "../components/Footer";

const Checkout = () => {
  return (
    <CheckoutContext>
      <Container />
    </CheckoutContext>
  );
};

export default Checkout;

const Container = () => {
  const [state, setState] = useCheckoutContext();
  const [globalState] = useGlobalContext();
  const [showMobileSummary, setshowMobileSummary] = useState(false);
  
  return (
    <div>
      {globalState.cart?.items?.length > 0 ? (
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">
            <div
              className="py-16 px-20 text-white text-center"
              style={{
                background:
                  "linear-gradient(rgba(0, 0, 0,0.87), rgba(0, 0, 0,0.87)), url('/img/neon-banner-5.jpg')",
              }}
            >
              <CustomLink className="text-3xl md:text-6xl" text="NeonShop" />
              <div className="flex items-center justify-center gap-3 md:gap-5 mt-5">
                <CustomLink
                  text="cart"
                  href="/cart"
                  className="text-gray-300"
                  onClick={() => window.scrollTo(0, 0)}
                />
                <FaChevronRight />
                <ToggleBtn
                  section={INFO_SECTION}
                  text="information"
                  state={state}
                  setState={setState}
                />
                <FaChevronRight />
                <ToggleBtn
                  section={PAYMENT_SECTION}
                  text="payment"
                  state={state}
                  setState={setState}
                />
              </div>
            </div>
            <div className="px-5 lg:px-12 pt-10 grid gap-10">
              <button
                className="lg:hidden border border-gray-300 py-2 flex items-center justify-center gap-2"
                onClick={() => setshowMobileSummary((bool) => !bool)}
              >
                <span>Cart Summary</span>
                <FaChevronDown
                  className={`transition ${
                    showMobileSummary ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showMobileSummary && <CartPreview />}
              {state.activeSection === INFO_SECTION ? (
                <InfoSection />
              ) : (
                state.activeSection === PAYMENT_SECTION && <PaymentSection />
              )}

              <div className="flex justify-center md:justify-start items-center p-2 border-t border-gray-300 gap-8 capitalize">
                <CustomLink href="/privacy-policy" text="privacy policy" />
                <CustomLink href="/refund-policy" text="refund policy" />
                <CustomLink
                  href="/terms-conditions"
                  text="terms and conditions"
                />
              </div>
            </div>
          </div>
          <div className="hidden lg:block px-4 py-10">
            <div className="sticky top-0">
              <CartPreview />
            </div>
          </div>
        </div>
      ) : (
        <CartEmptySection />
      )}
    </div>
  );
};

const ToggleBtn = ({ section, text, state, setState }) => {
  let disabled =
    section === PAYMENT_SECTION
      ? state.errors.email ||
        Object.keys(state.shipping.errors).some((key) => !state.shipping[key])
      : false;

  return (
    <button
      className={` capitalize transition disabled:cursor-text ${
        state.activeSection === section ? "font-semibold" : "text-gray-300"
      }`}
      onClick={() => {
        if (!section) return;
        setState((state) => ({ ...state, activeSection: section }));
      }}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

const CartPreview = () => {
  const [globalState] = useGlobalContext();
  return (
    <div>
      <div className="grid gap-2">
        {globalState.cart?.items?.map((item, i) => (
          <CartItem key={i} item={item} />
        ))}
      </div>
      <div className="h-[2px] bg-black/10 my-5"></div>
      <div className="flex gap-5  ">
        <input
          type="text"
          placeholder="Gift card or discount code"
          className="border border-gray-300 p-3 w-full"
        />
        <button className="py-4 px-6 text-lg uppercase bg-black text-white">
          apply
        </button>
      </div>
      <div className="h-[2px] bg-black/10 my-5"></div>
      <div className="flex justify-between">
        <p className="capitalize">subtotal</p>
        <p>${globalState.cart.subTotal}</p>
      </div>
      <div className="flex justify-between">
        <p className="capitalize">Shipping</p>
        <p className="uppercase">FREE</p>
      </div>
      {globalState.cart.discount ? (
        <div className="flex justify-between">
          <p className="capitalize">discount</p>
          <p className="uppercase font-semibold text-lg">
            -{globalState.cart.discount}
          </p>
        </div>
      ) : (
        ""
      )}
      <div className="h-[2px] bg-black/10 my-5"></div>
      <div className="flex justify-between">
        <p className="capitalize">total</p>
        <div className="flex items-center gap-1">
          <div className="capitalize">$</div>
          <div className="text-3xl">
            $
            {globalState.cart.discount
              ? globalState.cart.subTotal - globalState.cart.discount
              : globalState.cart.subTotal}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItem = ({ item }) => {
  const [globalState] = useGlobalContext();
  return (
    <div className="flex  items-center gap-3 py-2">
      <div className="relative">
        <div>
          <img
            src="/img/product-images/product-3.jpg"
            alt="product"
            className="w-16 h-16 rounded object-cover"
          />
        </div>
        <span className="absolute -top-1 -right-2 bg-gray-500 h-5 w-5 rounded-full text-white flex justify-center items-center">
          {item.quantity}
        </span>
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <div className="font-semibol capitalize text-xl">{item.name}</div>
        <p className="capitalize text-sm">
          <span className="font-semibold">color:</span>{" "}
          <span className="uppercase">{item.color.name}</span> |{" "}
          <span className="font-semibold">size:</span>{" "}
          <span className="uppercase">{item.size.shortHand}</span> |{" "}
          <span className="font-semibold">mount:</span>{" "}
          <span className="uppercase">{item.mountType}</span>
        </p>
      </div>
      <div className="flex h-full items-center justify-center">
        <span className="text-">${item.quantity * item.size.price}</span>
      </div>
    </div>
  );
};

const CartEmptySection = () => {
  return (
    <div className="">
      <Nav />
      <div className="py-20">
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

      <Footer />
    </div>
  );
};
