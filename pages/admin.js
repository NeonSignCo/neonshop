import Head from "next/head";
import { createContext, useContext, useState } from "react"
import AdminSection from "../components/sections/admin/AdminSection";
import Category from '../server/models/category'
import Product from "../server/models/product";
import connectDb from "../server/utils/connectDb";

const Context = createContext(); 

export const useAdminContext = () => useContext(Context); 


// variables 
export const DASHBOARD = 'DASHBOARD'; 
export const ORDERS = 'ORDERS'; 
export const CUSTOMERS = 'CUSTOMERS'; 
export const PRODUCTS = 'PRODUCTS';  
export const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';
export const REVIEWS = 'REVIEWS';
export const CATEGORIES = 'CATEGORIES';

const Admin = ({orders, products, categories}) => {
    
    const [state, setState] = useState({
      sidebar: {
        expand: true, 
      }, 
      activeSection: PRODUCTS, 
      orders, 
      products, 
      categories
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



export const getServerSideProps = async () => {
  let orders = [] 
  let categories = []; 
  let products = [];
  try {

    await connectDb();
    categories = await Category.find(); 
    products = await Product.find()
    for (let x = 1; x <= 50; x++) {
      const randNumber = Math.random();
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
      props: {
        orders,
        products: JSON.parse(JSON.stringify(products)),
        categories: JSON.parse(JSON.stringify(categories))
      },
    };
  } catch (error) {
    return {
      props: {
        orders,
        categories, 
        products
      }
    }
  }
}
