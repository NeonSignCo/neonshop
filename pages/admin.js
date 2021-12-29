import Head from "next/head";
import { createContext, useContext, useState } from "react"
import AdminSection from "../components/sections/admin/AdminSection";
import Cart from "../server/models/cart";
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
  try {

    await connectDb();
    const user = await getLoggedInUser(req);
    
    if (!user || user.role !== 'ADMIN') {
      return {
        notFound: true
      }
    }
     const cart = await Cart.findOne({ userId: user._id })
       .populate({
         path: "items.product",
         model: Product,
         populate: { path: "category", model: Category },
       })
       .lean();
    const products = await Product.find().lean();
    const categories = await Category.find().lean();
    return {
      props: {
        orders: [],
        products: JSON.parse(JSON.stringify(products)),
        user: JSON.parse(JSON.stringify(user)),
        cart: JSON.parse(JSON.stringify(cart)), 
        categories: JSON.parse(JSON.stringify(categories)), 
        serverRendered: true
      },
    };
  } catch (error) {
    return {
      props: {
        error: {
          code: 500, 
          message: 'server error. Please try again later'
        }
      }
    }
  }
}
