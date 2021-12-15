import { createContext, useContext, useEffect, useState } from "react"
import { USD } from "../components/CurrencyConverter";

const Context = createContext();
export const useGlobalContext = () => useContext(Context);

const GlobalContext = ({ children }) => {
      
    const [state, setState] = useState({
      showBanner: false,
      currency: USD,
      currencySign: "$",
      modal: { show: false, type: "", data: {} },
      cart: {
        subTotal: 0, 
        items: [
        ], 
        discount: 0
      }, 
      showCart: false, 
      user: null
    }); 

    useEffect(() => { 
        const currency = localStorage.currency || USD; 
        const currencySign = currency === USD
          ? "$"
          : globalState.currency === EURO
          ? "€"
          : globalState.currency === POUND
          ? "£"
          : "$";
        const showBanner = localStorage.getItem('showBanner');
        const cart = localStorage.getItem('cart');
        setState((state) => ({
          ...state,
          currency,
          currencySign,
          showBanner: !showBanner
            ? true
            : showBanner === "true"
            ? true
            : showBanner === "false" && false, 
            cart: cart ? JSON.parse(cart) : state.cart
        }));


    }, [])

    return (
        <Context.Provider value={[state, setState]}>
            {children}
        </Context.Provider>
    )
}

export default GlobalContext
