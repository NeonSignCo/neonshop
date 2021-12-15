import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaStar,
} from "react-icons/fa";
import BreadCrumb from "../../../components/BreadCrumb";
import CustomLink from "../../../components/CustomLink";
import FollowSection from "../../../components/sections/FollowSection";
import NewsLetterSection from "../../../components/sections/NewsLetterSection";
import { useGlobalContext } from "../../../context/GlobalContext";

const Category = () => {
  const productsCount = 100;
  const products = [];
  for (let x = 1; x <= productsCount; x++) products.push(x);

  const [state, setState] = useState({
    startIndex: 1,
    endIndex: 30,
    productPerPage: 30,
  });
  return (
    <div>
      <div
        className="px-5 lg:px-20 py-20 bg-black text-white flex flex-col gap-5 items-center text-center "
        style={{
          background:
            "linear-gradient(rgba(0, 0, 0,0.9), rgba(0, 0, 0,0.9)), url('/img/neon-banner-5.jpg')",
        }}
      >
        <h3 className="text-3xl md:text-5xl font-semibold uppercase">
          category name
        </h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          dolor ducimus similique tempora quas quia voluptates eveniet minima
          nemo, consequatur ut inventore amet quidem ipsam assumenda
          perspiciatis incidunt? Tempora, perferendis?
        </p>
      </div>
      <div className=" py-10 bg-gray-100">
        <div className="px-5 lg:px-20">
          <div className=" mb-5">
            <BreadCrumb />
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 md:flex-row justify-between">
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
            <form className="flex items-center ">
              <input
                type="text"
                className="p-2 border border-gray-300 h-full w-full"
                placeholder="Search Product  "
              />
              <button className="bg-black py-3 px-4 text-white h-full">
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
        <div className="px-5 lg:px-20 grid grid-cols-2 md:grid-cols-3  gap-x-12 gap-y-16 bg-white mt-4">
          {products.map(
            (i) =>
              i >= state.startIndex &&
              i <= state.endIndex && <Product i={i} key={i} />
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
};

export default Category;

const Product = ({ i }) => {
  const [globalState] = useGlobalContext();
  const rating = 4;

  return (
    <CustomLink
      href={`/shop/category/product-${i}`}
      className="grid gap-1"
      key={i}
    >
      <img src={`/img/product-images/product-2.jpg`} alt="product" />
      <h3 className="text-lg sm:text-xl font-semibold uppercase">
        product {i}
      </h3>
      <div className="flex flex-col sm:flex-row gap-1">
        <div className="flex flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <FaStar
              key={i}
              className={i > rating ? "text-gray-400" : "text-black"}
            />
          ))}
        </div>
        <span>| 10 Reviews</span>
      </div>
      <p className="">{globalState.currencySign} 300</p>
    </CustomLink>
  );
};

const ProductNavigation = ({ productsCount, state, setState }) => {
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
              endIndex: i * state.productPerPage,
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
};

export const getStaticProps = () => {
  return {
    props: {},
  };
};

export const getStaticPaths = () => {
  const categories = [
    "category-1",
    "category-2",
    "category-3",
    "category-4",
    "category-5",
  ];

  const paths = [];
  for (let x = 0; x < categories.length; x++)
    paths.push({ params: { category: categories[x] } });
  return {
    paths,
    fallback: false,
  };
};
