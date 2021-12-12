import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaSearch, FaStar, FaStarAndCrescent, FaStarHalfAlt } from "react-icons/fa";
import BreadCrumb from "../../components/BreadCrumb";
import CustomLink from "../../components/CustomLink";
import FollowSection from "../../components/sections/FollowSection"
import NewsLetterSection from "../../components/sections/NewsLetterSection"
import { useGlobalContext  } from '../../context/GlobalContext'


const Shop = () => { 
  const productsCount = 100; 
  const products = []; 
  for (let x = 1; x <= productsCount; x++) products.push(x); 


  const [state, setState] = useState({
    startIndex: 1,
    endIndex: 30, 
    productPerPage: 30
  });
    return (
      <div>
        <div className=" py-10 bg-gray-100">
          <div className="px-5 lg:px-20">
            <h1 className="text-3xl lg:text-4xl max-w-max mx-auto uppercase">
              Products
            </h1>
            <div className=" mb-5">
              <BreadCrumb />
            </div>
            <div className="flex flex-col md:flex-row justify-end gap-4 ">
              <form className="flex items-center ">
                <input
                  type="text"
                  className="p-1 border border-gray-300 h-full w-full"
                  placeholder="Search Product"
                />
                <button className="bg-black p-2 text-white h-full">
                  <FaSearch />
                </button>
              </form>
              <div className="flex items-center gap-1">
                <p>Sort by</p>
                <select className="capitalize p-1 border border-gray-300">
                  <option value="featured">featured</option>
                  <option value="low-to-high">price:low to high</option>
                  <option value="high-to-low">price:high to low</option>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                  <option value="oldest-to-newest">newest to oldest</option>
                  <option value="newest-to-oldest">newest to oldest</option>
                </select>
              </div>
            </div>
          </div>
          <div className="px-5 lg:px-20 grid grid-cols-2 md:grid-cols-3  gap-x-7 gap-y-16 bg-white mt-4">
            {products.map(
              (i) =>
                i >= state.startIndex &&
                i <= state.endIndex && <Product i={i} key={i}/>
            )}
          </div>
          <ProductNavigation
            productsCount={productsCount}
            state={state}
            setState={setState}
          />
        </div>
        <NewsLetterSection />
        <FollowSection />
      </div>
    );
}

export default Shop


const Product = ({ i }) => {
  const [globalState] = useGlobalContext();
  const rating = 4

  return (
    <CustomLink href={`/shop/category/product-${i}`} className="grid gap-1" key={i}>
      <img src={`/img/product-images/product-2.jpg`} alt="product" />
      <h3 className="text-xl font-semibold uppercase">product {i}</h3>
      <div className="flex gap-1">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <FaStar key={i} className={ i > rating ? 'text-gray-400': 'text-black'}/>
          ))}
        </div>
        <span>| 10 Reviews</span>
      </div>
      <p className="">
        {globalState.currencySign} 300
      </p>
    </CustomLink>
  );
}



const ProductNavigation = ({productsCount, state, setState}) => {
  const btnCount = Math.ceil(productsCount / state.productPerPage);
  const btns = []; 
  for (let x = 1; x <= btnCount; x++) btns.push(x);

  return (
    <div className="flex justify-center gap-1 flex-wrap mt-10">
      <button
        className="bg-black h-10 w-10 flex items-center justify-center text-white disabled:bg-gray-500 disabled:cursor-text"
        disabled={state.startIndex === 1}
        onClick={() => {
          setState((state) => ({
            ...state,
            startIndex: state.startIndex - state.productPerPage,
            endIndex: state.endIndex - state.productPerPage,
          })); 
          window.scroll({ top: 0 });
        }}
      >
        <FaChevronLeft />
      </button>
      {btns.map((i) => (
        <button
          key={i}
          className="border border-black h-10 w-10 flex items-center justify-center bg-white transition hover:bg-black hover:text-white disabled:bg-black disabled:text-white disabled:cursor-text" 
          disabled={state.endIndex === i * state.productPerPage}
          onClick={() => {
            setState((state) => ({
              ...state,
              startIndex: (i - 1) * state.productPerPage + 1,
              endIndex: i * state.productPerPage ,
            })); 
            window.scroll({ top: 0 });
          }}
        >
          {i}
        </button>
      ))}
      <button
        className="bg-black h-10 w-10 flex items-center justify-center text-white disabled:bg-gray-500 disabled:cursor-text"
        disabled={state.endIndex >= productsCount}
        onClick={() => {
          setState((state) => ({
            ...state,
            startIndex: state.endIndex + 1,
            endIndex: state.endIndex + state.productPerPage,
          })); 
          window.scroll({ top: 0 });
        }}
      >
        <FaChevronRight />
      </button>
    </div>
  );
}