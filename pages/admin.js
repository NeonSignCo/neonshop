import Head from "next/head";
import { createContext, useContext, useState } from "react"
import AdminSection from "../components/sections/admin/AdminSection";

const Context = createContext(); 

export const useAdminContext = () => useContext(Context); 


// variables 
export const DASHBOARD = 'DASHBOARD'; 
export const ORDERS = 'ORDERS'; 
export const CUSTOMERS = 'CUSTOMERS'; 
export const PRODUCTS = 'PRODUCTS';  
export const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';
export const REVIEWS = 'REVIEWS';


const Admin = ({orders, products}) => {
    
    const [state, setState] = useState({
      sidebar: {
        expand: true, 
      }, 
      activeSection: ADD_NEW_PRODUCT, 
      orders, 
      products
    });

    return (
        <Context.Provider value={[state, setState]}>
            <Head>
                <title>Admin | NeonShop</title> 
            </Head>
            <AdminSection/>
        </Context.Provider>
    )
}

export default Admin



export const getServerSideProps = () => {
  
  const orders = []; 
  const products = [];
  for (let x = 1; x <= 50; x++) {
    const randNumber = Math.random();
    products.push({
      _id: Math.round(Math.random() * 100000000),
      name: `product ${x}`,
      photo: `/img/product-images/product-2.jpg`, 
      price: 400, 
      description: 'this is the product description'
    });
    orders.push({
      _id: Math.round(Math.random() * 100000),
      date: Date.now(),
      user: {
        name: `client ${x}`,
        photo: `/img/client-images/client-1.jpg`,
      },
      address: `this is the address for client ${x}`,
      items: [1],
      status:
        randNumber < 0.3
          ? "ORDERED"
          : randNumber < 0.6
          ? "DELIVERED"
          : "CANCELLED",
    });
  }

 
  return {
    props: {orders, products}
  }
}
