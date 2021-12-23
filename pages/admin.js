import Head from "next/head";
import { createContext, useContext, useState } from "react"
import AdminSection from "../components/sections/admin/AdminSection";
import connectDb from '../server/connectDb';
import Category from '../server/models/category'

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
      activeSection: CATEGORIES, 
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
  try {
    const orders = [];
    const products = [];

    await connectDb();
    const categories = await Category.find();
    for (let x = 1; x <= 50; x++) {
      const randNumber = Math.random();
      products.push({
        _id: Math.round(Math.random() * 100000000),
        name: `product ${x}`,
        photo: `/img/product-images/product-2.jpg`,
        price: 400,
        description: "this is the product description",
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
      props: {
        orders,
        products,
        categories: JSON.parse(JSON.stringify(categories)),
      },
    };
  } catch (error) {
    return {
      props: {
        
      }
    }
  }
}
