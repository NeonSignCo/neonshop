import Head from "next/head";
import { createContext, useContext, useState } from "react"
import AdminSection from "../components/sections/admin/AdminSection";
import Category from '../server/models/category'
import Order from "../server/models/order";
import Product from "../server/models/product";
import User from "../server/models/user";
import connectDb from "../server/utils/connectDb";
import getUpdatedCart from "../server/utils/getUpdatedCart";
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

const Admin = ({orders, products, categories, numOfProducts}) => {
  const [state, setState] = useState({
      sidebar: {
        expand: true, 
      }, 
      activeSection: DASHBOARD, 
      orders, 
      products, 
      numOfProducts,
      categories
    });
console.log(orders)
    return (
        <Context.Provider value={[state, setState]}>
            <Head>
              <title>Admin | NeonShop</title>  
              <meta name="robots" content="noindex"></meta> 
              <meta name="googlebot" content="noindex"></meta>
            </Head>
            <AdminSection state={state}/>
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
     const cart = await getUpdatedCart(user._id)
    const products = await Product.find()
      .limit(30)
      .lean();
     const numOfProducts = await Product.countDocuments().lean();
    const categories = await Category.find().lean();
    const orders = await Order.find({
      status: { $ne: "PENDING_PAYMENT" },
    }).populate([
      { path: "userId", model: User },
      {
        path: "items.product",
        model: Product,
        populate: { path: "category", model: Category },
      },
    ]);
    return {
      props: {
        orders: JSON.parse(JSON.stringify(orders)),
        products: JSON.parse(JSON.stringify(products)),
        user: JSON.parse(JSON.stringify(user)),
        cart: JSON.parse(JSON.stringify(cart)),
        categories: JSON.parse(JSON.stringify(categories)),
        numOfProducts,
        serverRendered: true,
      },
    };
  } catch (error) {
    console.log(error)
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
