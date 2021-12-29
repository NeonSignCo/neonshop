import Head from "next/head";
import { createContext, useContext, useState } from "react";
import AccountSection from "../components/sections/account/AccountSection";
import Cart from "../server/models/cart";
import Category from "../server/models/category";
import Product from "../server/models/product";

import getLoggedInUser from "../utils/getLoggedInUser";

const Context = createContext();

export const useACcountContext = () => useContext(Context);

// variables
export const MY_ORDERS = "MY_ORDERS";
export const ACCOUNT_DETAILS = "ACCOUNT_DETAILS";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const ADDRESS = "ADDRESS";

const Account = ({ orders }) => {
  const [state, setState] = useState({
    activeSection: ACCOUNT_DETAILS,
    orders,
  });

  return (
    <Context.Provider value={[state, setState]}>
      <Head>
        <title>My Account | NeonShop</title>
      </Head>
      <AccountSection />
    </Context.Provider>
  );
};

export default Account;

export const getServerSideProps = async ({ req }) => {
  try {
    const user = await getLoggedInUser(req);

     if (!user) {
       return {
         redirect: {
           destination: "/login",
           permanent: false,
         },
       };
     }
    const cart = await Cart.findOne({ userId: user._id })
      .populate({
        path: "items.product",
        model: Product,
        populate: { path: "category", model: Category },
      })
      .lean();

    const orders = [];
    return {
      props: {
        orders,
        user: JSON.parse(JSON.stringify(user)),  
        cart: JSON.parse(JSON.stringify(cart)),
        serverRendered: true
      }
    };
  } catch (error) {
    return {
      props: {
        error: { code: 500, message: "server error" },
      },
    };
  }
};
