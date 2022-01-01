import { FaChevronLeft } from "react-icons/fa";
import isEmail from "../../../utils/isEmail";
import CustomLink from "../../CustomLink";
import { PAYMENT_SECTION, useCheckoutContext } from '../../../context/CheckoutContext';
import ShippingAddressForm from "../../forms/CheckoutShippingAddressForm";
import { useEffect } from "react";
import BillingAddressForm from "../../forms/CheckoutBillingAddressForm";


const InfoSection = () => {
  const [state, setState] = useCheckoutContext();
 

  useEffect(() => {
    if (!state.activeElement) return;
    const target = document.getElementById(state.activeElement);  
    setState(state => ({ ...state, activeElement: '' }));
    target.focus();
  }, [state.activeElement])

    const goToNextSection = (e) => {
      e.preventDefault();
      setState((state) => {
        // check if any requried field is empty
        const errors = { ...state.shipping.errors };
        const newErrors = [];
        const emailError = !state.email;
        Object.keys(state.shipping.errors).forEach((key) => {
          if (!state.shipping[key]) newErrors.push(key);
        });

        if (emailError || newErrors.length > 0) {
          newErrors.forEach((item) => (errors[item] = `${item} is required`));
          const scrollTarget = document.getElementById(
            emailError ? "email" : newErrors[0]
          );
          window.scrollTo(0, scrollTarget.offsetTop - 40);
          return {
            ...state,
            errors: {
              ...state.errors,
              email: emailError ? "email is required" : "",
            },
            shipping: { ...state.shipping, errors },
          };
        }

        window.scrollTo(0, 0)
        return { ...state, activeSection: PAYMENT_SECTION };
      });
    };

    return (
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row md:justify-between">
            <h2 className="font-semibold capitalize">Contact Information</h2>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">
              {state.errors.email ? (
                <span className="text-red-500">{state.errors.email}</span>
              ) : (
                "Email "
              )}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={state.email}
              onChange={(e) => {
                setState((state) => ({
                  ...state,
                  email: e.target.value,
                  errors: {
                    ...state.errors,
                    email: e.target.value
                      ? isEmail(e.target.value)
                        ? ""
                        : "not a valid email address"
                      : "email  is required",
                  },
                }));
              }}
              className="border border-gray-400 rounded p-2"
              required
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="allowNewsLetterSignUp"
                id="allowNewsLetterSignUp"
                checked={state.allowNewsLetterSignUp}
                onChange={(e) =>
                  setState((state) => ({
                    ...state,
                    allowNewsLetterSignUp: e.target.checked,
                  }))
                }
              />
              <label htmlFor="allowNewsLetterSignUp">
                Email me with news and offers
              </label>
            </div>
          </div>
        </div>
        <ShippingAddressForm />
        
        <div className="flex flex-col-reverse md:flex-row gap-5 md:justify-between">
          <CustomLink
            href="/cart"
            className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-400 transition hover:bg-black hover:text-white"
          >
            <FaChevronLeft />
            <p>Return to cart</p>
          </CustomLink>
          <button
            className="py-2 px-4 bg-black text-white uppercase tracking-widest"
            onClick={goToNextSection} 
            disabled={
                    !state.email ||
                    !Object.values(state.shipping.errors).every(
                      (val) => val === ""
                    )
                  }
          >
            continue to payment
          </button>
        </div>
      </div>
    );
}

export default InfoSection
