import { createContext, useContext, useEffect, useState } from "react";
import getInitialData from "../utils/getInitialData";

const Context = createContext();
export const useGlobalContext = () => useContext(Context);

// variables
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";
export const NOT_LOGGED_IN_EVALUATED = "NOT_LOGGED_IN_EVALUATED";
const GlobalContext = ({ children, props }) => {
  const user = props.user || null;

  const [state, setState] = useState({
    showBanner: true,
    modal: { show: false, type: "", data: {} },
    cart: {
      subTotal: 0,
      items: [],
      discount: 0,
    },
    showCart: false,
    auth: { loading: user ? false : true, user },
    alert: { show: false, type: SUCCESS, text: "", timeout: 5000 },
  });

  // fetch initial data
  useEffect(async () => {
    await getInitialData(state, setState);

    return () => {};
  }, []);

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};

export default GlobalContext;
