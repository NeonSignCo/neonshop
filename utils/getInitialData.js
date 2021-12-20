import { NOT_LOGGED_IN_EVALUATED } from "../context/GlobalContext";
import Axios from "./Axios";

const getInitialData = async (state, setState) => {
  let cart = state.cart;
  let user = state.auth.user;

  try {
    // cart data
    const savedCart = localStorage.getItem("cart");
    if (savedCart) cart = JSON.parse(savedCart);

    // user data (NOT_LOGGED_IN_EVALUATED indicates that a user authentication has been already done on a page via getServerSideProps, so trying again to get user here is pointless)



    if (user === !NOT_LOGGED_IN_EVALUATED || !state.auth.user) { 
      const loggedInUser = (await Axios.get("/users/me")).data.user;
      if (loggedInUser) user = loggedInUser;
    } else {
      user = user === NOT_LOGGED_IN_EVALUATED ? null : user;
    }

    setState((state) => ({
      ...state,
      auth: { loading: false, user },
      cart,
    }));
  } catch (error) {
    setState((state) => ({
      ...state,
      auth: { loading: false, user },
      cart,
    }));
  }
};

export default getInitialData;
