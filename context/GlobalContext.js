import { createContext, useContext, useEffect, useState } from "react"
import { USD } from "../components/CurrencyConverter";

const Context = createContext();
export const useGlobalContext = () => useContext(Context);

const GlobalContext = ({ children }) => {
      
    const [state, setState] = useState({
        showBanner: false, 
        currency: USD,  
        currencySign: '$',
        modal: {show: true, type: '', data: {}}
    }) 

    useEffect(() => {
        const currency = localStorage.currency || USD; 
        const currencySign = currency === USD
          ? "$"
          : globalState.currency === EURO
          ? "€"
          : globalState.currency === POUND
          ? "£"
          : "$";
        const showBanner = localStorage.showBanner;
        setState((state) => ({
          ...state,
          currency,
          currencySign,
          showBanner: !showBanner
            ? true
            : showBanner === "true"
            ? true
            : showBanner === "false" && false,
        }));
    }, [])

    return (
        <Context.Provider value={[state, setState]}>
            {children}
        </Context.Provider>
    )
}

export default GlobalContext
