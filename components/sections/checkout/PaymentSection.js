import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { CREDIT_CART, PAYPAL, useCheckoutContext } from "../../../context/CheckoutContext";
import { SUCCESS, useGlobalContext } from "../../../context/GlobalContext";
import Axios from "../../../utils/Axios";
import catchASync from "../../../utils/catchASync";
import CustomLink from "../../CustomLink";
import LoadingBtn from "../../LoadingBtn";
// import { loadStripe } from '@stripe/stripe-js';
// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );

const PaymentSection = () => {

  const [state, setState] = useCheckoutContext();
  const [globalState, setGlobalState] = useGlobalContext();
  const [loading, setLoading] = useState(false);

  const checkout = () => catchASync(async () => {
    setLoading(true); 
  
    //  const stripe = await stripePromise;

    const res = await Axios.post('orders', { items: globalState.cartData.cart.items, shippingAddress: globalState.auth.user.shippingAddress[0] });

    //  const result = await stripe.redirectToCheckout({
    //    sessionId: res.data.session.id,
    //  });
    //  if (result.error) {
    //    setGlobalState((state) => ({
    //      ...state,
    //      alert: {
    //        ...state.alert,
    //        show: true,
    //        text: result.error.message,
    //        type: ERROR,
    //        timeout: 5000,
    //      },
    //    }));
    //  }
    setGlobalState(state => ({ ...state, alert: { ...state.alert, show: true, text: res.data.message, type: SUCCESS, timeout: 5000 } }));
    setLoading(false);   
   }, setGlobalState, () => setLoading(false));

  useEffect(() => () => { }, []);
    return (
      <div className="flex flex-col gap-10">
        
          
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold capitalize">payment</h2>
          <p>All transactions are secure and encrypted.</p>
          <div>
            <label
              htmlFor="credit-card"
              className="flex items-center gap-3 p-2 border border-gray-400 border-b-0 rounded-t"
            >
              <input
                type="radio"
                name="creditCart"
                id="credit-card"
                checked={state.paymentMethod === CREDIT_CART}
                onChange={() =>
                  setState((state) => ({
                    ...state,
                    paymentMethod: CREDIT_CART,
                  }))
                }
              />
              <div className="capitalize flex items-center justify-between w-full">
                <p className="">Credit Card</p>
                <div className="flex items-center gap-2">
                  <img
                    src="/img/card-icons/visa.svg"
                    alt="visa credit card"
                    className="h-12"
                  />
                  <img
                    src="/img/card-icons/master.svg"
                    alt="master card"
                    className="h-12"
                  />
                  <img
                    src="/img/card-icons/amex.svg"
                    alt="amex credit card"
                    className="h-12"
                  />
                  <img
                    src="/img/card-icons/discover.svg"
                    alt="discover credit card"
                    className="h-12"
                  />
                  <img
                    src="/img/card-icons/afterpay.svg"
                    alt="discover credit card"
                    className="h-7"
                  />
                  <p className="lowercase text-sm">and more...</p>
                </div>
              </div>
            </label>
            <label
              htmlFor="paypal"
              className={`flex items-center gap-3 p-3 border border-gray-400 ${
                !state.billingSameAsShipping ? "" : "rounded-b"
              }`}
            >
              <input
                type="radio"
                name="paypal"
                id="paypal"
                checked={state.paymentMethod === PAYPAL}
                onChange={() => {
                  setState((state) => ({
                    ...state,
                    paymentMethod: PAYPAL,
                  }));
                }}
              />
              <img src="/img/card-icons/paypal.svg" alt="paypal" className="h-10"/>
            </label>
          </div>
        </div>
        
        <div className="flex flex-col-reverse md:flex-row gap-5 md:justify-between mt-5">
          <CustomLink
            href="/cart"
            className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-400 transition hover:bg-black hover:text-white"
          >
            <FaChevronLeft />
            <p>Return to cart</p>
          </CustomLink>
          <LoadingBtn loading={loading} className="py-2 px-4 bg-black text-white uppercase tracking-widest" onClick={checkout}>
            Complete payment
          </LoadingBtn>
        </div>
      </div>
    );
}

export default PaymentSection
