import { FaChevronLeft } from "react-icons/fa";
import { CREDIT_CART, INFO_SECTION, PAYPAL, useCheckoutContext } from "../../../context/CheckoutContext";
import BillingAddressForm from "../../forms/CheckoutBillingAddressForm";


const PaymentSection = () => {

  const [state, setState] = useCheckoutContext();

    return (
      <div className="flex flex-col gap-10">
        <div className="border border-gray-400 rounded px-2">
          <div className="flex justify-between flex-wrap gap-2 items-center border-b border-gray-400 p-3 ">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-10 ">
              <p className="capitalize font-semibold whitespace-nowrap w-12">
                contact
              </p>
              <p>{state.email}</p>
            </div>
            <button
              className="py-1 px-2 bg-gray-300 text-whit rounded transition hover:bg-black hover:text-white"
              onClick={() =>
                setState((state) => ({
                  ...state,
                  activeElement: "email",
                  activeSection: INFO_SECTION,
                }))
              }
            >
              Change
            </button>
          </div>
          <div className="flex justify-between flex-wrap gap-2 items-center border-b border-gray-400 p-3 ">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-10 ">
              <p className="capitalize font-semibold whitespace-nowrap w-12">
                ship to
              </p>
              <p>
                {state.shipping.addressLine1}, {state.shipping.zip},{" "}
                {state.shipping.country}
              </p>
            </div>
            <button
              className="py-1 px-2 bg-gray-300 text-whit rounded transition hover:bg-black hover:text-white"
              onClick={() =>
                setState((state) => ({
                  ...state,
                  activeElement: "addressLine1",
                  activeSection: INFO_SECTION,
                }))
              }
            >
              Change
            </button>
          </div>
          <div className="flex justify-between flex-wrap gap-2 items-center p-3 ">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-10 ">
              <p className="capitalize font-semibold whitespace-nowrap w-12">
                Method
              </p>
              <p>
                10-20 Days (the majority of our past orders were delivered in
                under 2 weeks) · Free
              </p>
            </div>
          </div>
        </div>
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
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold capitalize">billing address</h2>
          <p>Select the address that matches your card or payment method.</p>
          <div>
            <label
              htmlFor="sameAsShippingAddress"
              className="flex items-center gap-3 p-3 border border-gray-400 border-b-0 rounded-t"
            >
              <input
                type="radio"
                name="billingAddress"
                id="sameAsShippingAddress"
                checked={state.billingSameAsShipping}
                onChange={(e) =>
                  setState((state) => ({
                    ...state,
                    billingSameAsShipping: e.target.checked,
                  }))
                }
              />
              <div>Same as shipping address</div>
            </label>
            <label
              htmlFor="differentAddress"
              className={`flex items-center gap-3 p-3 border border-gray-400 ${
                !state.billingSameAsShipping ? "" : "rounded-b"
              }`}
            >
              <input
                type="radio"
                name="billingAddress"
                id="differentAddress"
                checked={!state.billingSameAsShipping}
                onChange={(e) => {
                  document
                    .getElementById("diff-billing-area")
                    .scrollIntoView({ behavior: "smooth" });
                  setState((state) => ({
                    ...state,
                    billingSameAsShipping: !e.target.checked,
                  }));
                }}
              />
              <div>Use a different billing address</div>
            </label>
            <div id="diff-billing-area">
              {!state.billingSameAsShipping && (
                <div className="border border-t-0 border-gray-400 rounded-b p-2">
                  <BillingAddressForm />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-5 md:justify-between mt-5">
          <button
            className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-400 transition hover:bg-black hover:text-white"
            onClick={() => {
              setState((state) => ({ ...state, activeSection: INFO_SECTION }));
              window.scrollTo(0, 0);
            }}
          >
            <FaChevronLeft />
            <p>Return to shipping</p>
          </button>
          <button className="py-2 px-4 bg-black text-white uppercase tracking-widest">
            Complete payment
          </button>
        </div>
      </div>
    );
}

export default PaymentSection
