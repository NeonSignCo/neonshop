import { FaChevronLeft } from "react-icons/fa";
import {  INFO_SECTION, useCheckoutContext } from "../../../../context/CheckoutContext";
import PayPalPayment from "./PayPalPayment";
import StripePayment from "./stripe/StripePayment";

const PaymentSection = () => {
  const [state, setState] = useCheckoutContext();

  return (
    <div className="flex flex-col gap-10">
      <div className="">
        <div className="flex flex-wrap justify-between items-center gap-2 p-2 border border-b-0  border-gray-400 rounded-t">
          <div className="flex flex-col md:flex-row">
            <div className="font-semibold w-40">Contact</div>
            <div className="flex-1">{state.email}</div>
          </div>
          <button
            onClick={() =>
              setState((state) => ({
                ...state,
                activeSection: INFO_SECTION,
                activeElement: "email",
              }))
            }
          >
            change
          </button>
        </div>
        <div className="flex flex-wrap justify-between items-center gap-2 p-2 border  border-gray-400">
          <div className="flex flex-col md:flex-row">
            <div className="font-semibold w-40">Shipping Address</div>
            <div className="flex-1">
              {state.shipping.addressLine1}, {state.shipping.stateOrProvince}{" "}
              {state.shipping.zip}, {state.shipping.country}
            </div>
          </div>
          <button
            onClick={() =>
              setState((state) => ({
                ...state,
                activeSection: INFO_SECTION,
                activeElement: "addressLine1",
              }))
            }
          >
            change
          </button>
        </div>
        <div className="flex flex-wrap justify-between items-center gap-2 p-2 border border-t-0 rounded-b  border-gray-400">
          <div className="flex flex-col md:flex-row">
            <div className="font-semibold w-40">Method</div>
            <div className="flex-1">
              10-20 Days (the majority of our past orders were delivered in
              under 2 weeks) · Free
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-semibold capitalize">payment</h2>
        <p>All transactions are secure and encrypted.</p>
        <StripePayment />
        <PayPalPayment />
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-5 md:justify-between mt-5">
        <button
          className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-400 transition hover:bg-black hover:text-white"
          onClick={() => {
            setState((state) => ({ ...state, activeSection: INFO_SECTION }));
            window.scroll({ top: 0 });
          }}
        >
          <FaChevronLeft />
          <p>Return to info</p>
        </button>
      </div>
    </div>
  );
}

export default PaymentSection
