import Head from "next/head";
import { createContext, useContext, useState } from "react";
import AccountSection from "../components/sections/account/AccountSection";

const Context = createContext();

export const useACcountContext = () => useContext(Context);

// variables
export const MY_ORDERS = "MY_ORDERS";
export const ACCOUNT_DETAILS = "ACCOUNT_DETAILS";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const ADDRESS = "ADDRESS";

const Admin = ({ orders }) => {
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

export default Admin;

export const getStaticProps = () => {
  const orders = [];
  for (let x = 1; x <= 3; x++) {
    const randNumber = Math.random();
    orders.push({
      _id: Math.round(Math.random() * 100000),
      date: Date.now(),
      address: `this is the address for client ${x}`,
      items: [1, 2],
      shippedDate: Date.now(),
      status: randNumber < 0.5 ? "ORDERED" : "DELIVERED",
    });
  }

  return {
    props: { orders },
  };
};
