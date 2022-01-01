import Head from "next/head";
import { createContext, useContext, useState } from "react";
import AccountSection from "../components/sections/account/AccountSection";
import Category from "../server/models/category";
import Order from "../server/models/order";
import Product from "../server/models/product";
import connectDb from "../server/utils/connectDb";
import getUpdatedCart from "../server/utils/getUpdatedCart";

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
    activeSection: MY_ORDERS,
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
    await connectDb();
    const user = await getLoggedInUser(req);

     if (!user) {
       return {
         redirect: {
           destination: "/login",
           permanent: false,
         },
       };
     }
    const cart = await getUpdatedCart(user._id)

    const orders = await Order.find({ userId:user._id, status: {$ne: 'PENDING_PAYMENT'} }).populate({ path: 'items.product', model: Product, populate: {path: 'category', model: Category} }).lean();
    return {
      props: {
        orders: JSON.parse(JSON.stringify(orders)),
        user: JSON.parse(JSON.stringify(user)),
        cart: JSON.parse(JSON.stringify(cart)),
        orders: JSON.parse(JSON.stringify(orders)),
        serverRendered: true,
      },
    };
  } catch (error) {
    console.log(error)
    return {
      props: {
        error: { code: 500, message: "server error" },
      },
    };
  }
};
