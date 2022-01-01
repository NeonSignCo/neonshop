import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import catchAsync from '../../../../../utils/catchASync';
import CheckoutForm from "./StripeCheckoutForm";
import { useGlobalContext } from '../../../../../context/GlobalContext'
import Axios from '../../../../../utils/Axios';
import { useCheckoutContext } from "../../../../../context/CheckoutContext";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function StripePayment() {
    const [globalState, setGlobalState] = useGlobalContext();
    const [clientSecret, setClientSecret] = useState("");
  const [state] = useCheckoutContext();
    
    const createPaymentIntent = () =>
      catchAsync(async () => {
          
          const res = await Axios.post('orders/stripe/payment-intent', { cartId: globalState.cartData.cart._id, shippingAddress: state.shipping }); 
          setClientSecret(res.data.clientSecret);

      }, setGlobalState);
    
  useEffect( () => {
    // Create PaymentIntent as soon as the page loads
      createPaymentIntent();

      return () => { };
  }, []);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#1d61a5",
      colorText: "#141f94",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
