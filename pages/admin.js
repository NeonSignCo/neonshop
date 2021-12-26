import Head from "next/head";
import { createContext, useContext, useState } from "react"
import AdminSection from "../components/sections/admin/AdminSection";
import { NOT_LOGGED_IN_EVALUATED } from "../context/GlobalContext";
import Category from '../server/models/category'
import Product from "../server/models/product";
import connectDb from "../server/utils/connectDb";
import getLoggedInUser from "../utils/getLoggedInUser";

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
              <meta name="robots" content="noindex"></meta> 
              <meta name="googlebot" content="noindex"></meta>
            </Head>
            <AdminSection/>
        </Context.Provider>
    ) 
}

export default Admin



export const getServerSideProps = async ({req}) => {
  let orders = [] 
  let categories = []; 
  let products = [];
  let user = NOT_LOGGED_IN_EVALUATED;
  try {

    await connectDb();
    const loggedInUser = await getLoggedInUser(req);
    user = loggedInUser || NOT_LOGGED_IN_EVALUATED;

     if (user === NOT_LOGGED_IN_EVALUATED) {
       return {
         redirect: {
           destination: "/login",
           permanent: false,
         },
       };
    }
    
    if (user.role !== 'ADMIN') {
      return {
        notFound: true
      }
    }

    categories = await Category.find(); 
    products = await Product.find()

    return {
      props: {
        orders,
        products: JSON.parse(JSON.stringify(products)),
        categories: JSON.parse(JSON.stringify(categories)), 
        user: JSON.parse(JSON.stringify(user))
      },
    };
  } catch (error) {
    console.log(error)
    return {
      props: {
        error: {
          code: 500, 
          message: 'server error. Please try again or contact developer'
        }
      }
    }
  }
}
