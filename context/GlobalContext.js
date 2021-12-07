import { createContext, useContext, useEffect, useState } from "react"
import { USD } from "../components/CurrencyConverter";

const Context = createContext();
export const useGlobalContext = () => useContext(Context);

const GlobalContext = ({ children }) => {
    
    const [state, setState] = useState({
        showBanner: false,
        currency: USD 
    }) 

    useEffect(() => {
        const currency = localStorage.currency;
        const showBanner = localStorage.showBanner;
        setState((state) => ({
          ...state,
          currency: currency || USD,
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
