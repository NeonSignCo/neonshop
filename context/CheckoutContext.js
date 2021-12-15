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
  
    const [globalState] = useGlobalContext()
    const [state, setState] = useState({
      activeSection: INFO_SECTION,  
      activeElement: '',
      billingSameAsShipping: true,
      email: globalState.user?.email || "",
      allowNewsLetterSignUp: true,
      allowTextMessageOffers: false, 
      paymentMethod: CREDIT_CART,
      shipping: {
        country: "",
        firstName: "",
        lastName: "",
        company: "",
        city: "",
        addressLine1: "",
        addressLine2: "",
        stateOrProvince: "",
        zip: "",
        phone: "",
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
        country: "",
        firstName: "",
        lastName: "",
        company: "",
        city: "",
        addressLine1: "",
        addressLine2: "",
        stateOrProvince: "",
        zip: "",
        phone: "",
        allowNewsLetterSignUp: true,
        allowTextMessageOffers: false,
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
