import { createContext, useContext, useState } from "react";
import { useGlobalContext } from './GlobalContext'

// variables 
export const INFO_SECTION = 'INFO_SECTION';
export const PAYMENT_SECTION = 'PAYMENT_SECTION';
export const SHIPPING= "SHIPPING";
export const BILLING = "BILLING";
export const CREDIT_CART = 'CREDIT_CARD'; 
export const PAYPAL = 'PAYPAL'; 

const Context = createContext();
export const useCheckoutContext = () => useContext(Context);

const CheckoutContext = ({ children }) => {
  const [globalState] = useGlobalContext();
  const userShipping = globalState.auth.user?.shippingAddress?.[0];
  const userBilling = globalState.auth.user?.billingAddress?.[0];

    const [state, setState] = useState({
      activeSection: INFO_SECTION,  
      activeElement: '',
      billingSameAsShipping: true,
      email: globalState.auth.user?.email || "",
      allowNewsLetterSignUp: true,
      allowTextMessageOffers: false, 
      paymentMethod: CREDIT_CART,
      shipping: {
        ...userShipping,
        errors: {
          country: "",
          firstName: "",
          lastName: "",
          addressLine1: "",
          city: "",
          stateOrProvince: "",
          zip: "",
        },
      },
      billing: {
        ...userBilling,
        errors: {
          country: "",
          firstName: "",
          lastName: "",
          addressLine1: "",
          city: "",
          stateOrProvince: "",
          zip: "",
        },
      },
      errors: {
        email: "",
      },
    });



  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};

export default CheckoutContext;
