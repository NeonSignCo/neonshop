import Head from "next/head";
import {
  FaClock,
  FaFileSignature,
  FaHands,
  FaInstalod,
  FaRibbon,
  FaShippingFast,
} from "react-icons/fa";
import CustomLink from "../components/CustomLink";
import ProductsSlider from "../components/ProductsSlider";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Neon Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="bg-gray-800 px-5 lg:px-20 py-32 lg:pt-48 grid gap-10 text-white backdrop-filter  backdrop-brightness-0"
        style={{
          background: 
            "linear-gradient(rgba(0, 0, 0,0.5), rgba(0, 0, 0,0.5)), url('./img/neon-banner.jpg')",
        }}
      >
        <h2 className="text-2xl md:text-4xl lg:text-6xl">
          NEON SIGNS TO CELEBRATE, <br /> MOTIVATE & INSPIRE
        </h2>
        <p className="text-lg">Imagination is your only limit.</p>
        <div className="flex flex-col items-start md:flex-row gap-3 md:gap-10 uppercase whitespace-nowrap font-semibold">
          <CustomLink
            text="shop"
            className="h-12 w-52 flex items-center justify-center bg-black"
          />
          <CustomLink
            text="design your neon"
            className="h-12 w-52 flex items-center justify-center bg-white text-black"
          />
        </div>
      </div>
      <div className="px-5 lg:px-20 py-20 flex flex-col md:flex-row items-center gap-10 bg-black text-white">
        <div className="flex flex-col gap-5">
          <h3 className="text-3xl uppercase font-semibold uppercase">
            DESIGN A CUSTOM LED NEON SIGN
          </h3>
          <p className="font-semibold text-lg">
            Customize your very own neon sign
          </p>
          <CustomLink
            text="customize"
            className="h-12 w-52 flex items-center justify-center bg-white uppercase text-black font-semibold mt-10"
          />
        </div>
        <div>
          <img
            src="//cdn.shopify.com/s/files/1/0361/0781/3004/files/Neon-Builder-Mockupv3_800x.png?v=1603862532"
            alt=""
          />
        </div>
      </div>
      <div className="px-5 lg:px-20 py-20 bg-white">
        <h3 className="text-3xl uppercase font-semibold uppercase text-center mb-10">
          our best-selling products
        </h3>
        <ProductsSlider products={
          [
            { name: 'product 1', img: './img/product-1.jpg', price: '299' },
            { name: 'product 2', img: './img/product-2.jpg', price: '400', hot: true },
            { name: 'product 3', img: './img/product-3.jpg', price: '459' },
            { name: 'product 4', img: './img/product-4.jpg', price: '269' },
            { name: 'product 5', img: './img/product-5.jpg', price: '129', hot: true },
            { name: 'product 6', img: './img/product-6.jpg', price: '579' },
          ]
        } />
      </div>
      <div className="px-5 lg:px-20 py-20 bg-black">
        <h3 className="text-3xl uppercase font-semibold uppercase text-center mb-20 text-white">
          Why choose us?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-24">
          <Item
            title="free shipping"
            text="We’ve got your back. From our door to yours, we ship Neons to all the corners of the globe - for FREE! It doesn’t matter where you are, we’ll get it to you using the most reliable couriers available."
          >
            <FaShippingFast className="text-blue-500" />
          </Item>
          <Item
            title="24 month warranty"
            text="Don’t stress, we’re here for you. We provide a 24-month manufacturer warranty, double the industry standard, on any neon signs that have been used indoors."
          >
            <FaRibbon className="text-yellow-500" />
          </Item>
          <Item
            title="best value"
            text="We believe we have the best value Neons in the world – and 1000s of our awesome clients agree. Have a quote for a cheaper price? Let us know. We’ll match it and give you a virtual high-five!"
          >
            <FaFileSignature className="text-green-500" />
          </Item>
          <Item
            title="100% ON TIME GUARANTEE"
            text="Let us know your event date as soon as you've purchased. In the unlikely chance your sign delivery misses the event date and we've agreed that we can deliver, we'll give you 100% money back - and you get to keep the neon! Full T & C's here."
          >
            <FaClock className="text-pink-500" />
          </Item>
          <Item
            title="EASY INSTALLATION"
            text="They go up like a picture frame and plug in like a lamp! Every Sketch & Etch Neon comes with an installation kit and pre-drilled holes, ready to hang and enjoy right out of the box. Find out more about how to hang your Neon here."
          >
            <FaInstalod className="text-green-500" />
          </Item>
          <Item
            title="HAND-MADE"
            text="We make Neons to order. Whether it’s your custom creation, or one of our pre-designed items, each piece is handmade by a specialist Neon artisan, especially for you."
          >
            <FaHands className="text-indigo-500" />
          </Item>
        </div>
      </div>
    </div>
  );
}

const Item = ({ title, text, children }) => {
  return (
    <div className="flex-1 flex flex-col gap-5 items-center p-2 border-2 hover-animation bg-white">
      <div className="h-24 w-24 bg-gray-900 rounded-full flex items-center justify-center text-5xl">
        {children}
      </div>
      <p className="uppercase font-semibold text-lg ">{title}</p>
      <p className="text-sm text-center">{text}</p>
    </div>
  );
};
