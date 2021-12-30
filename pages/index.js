import Head from "next/head";
import {
  FaBrush,
  FaClock,
  FaCogs,
  FaDesktop,
  FaFacebook,
  FaFileSignature,
  FaHandHoldingHeart,
  FaHands,
  FaInstagram,
  FaRibbon,
  FaShippingFast,
} from "react-icons/fa";
import CustomLink from "../components/CustomLink";
import InstaGallery from "../components/InstaGallery";
import ProductsSlider from "../components/sliders/ProductsSlider";
import ReviewSlider from "../components/sliders/ReviewSlider";
import NewsLetterSection from "../components/sections/NewsLetterSection";
import connectDb from "../server/utils/connectDb";
import Product from "../server/models/product";
import Category from "../server/models/category";
 
export default function Home({products}) {
  return (
    <div className="">
      <Head>
        <title>Neon Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section
        className="bg-gray-800 px-5 lg:px-20 py-20 sm:py-32 lg:pt-48 flex flex-col items-center md:items-start gap-10 text-white"
        style={{
          background:
            "linear-gradient(rgba(0, 0, 0,0.5), rgba(0, 0, 0,0.5)), url('/img/neon-banner.jpg')",
        }}
      >
        <h2 className="text-2xl md:text-4xl lg:text-6xl text-center md:text-left">
          NEON SIGNS TO CELEBRATE, <br /> MOTIVATE & INSPIRE
        </h2>
        <p className="text-lg">Imagination is your only limit.</p>
        <div className="flex flex-col items-start md:flex-row gap-3 md:gap-10 uppercase whitespace-nowrap font-semibold">
          <CustomLink
            href="/shop"
            text="shop"
            className="h-12 w-52 flex items-center justify-center bg-black"
          />
          <CustomLink
            href="/custom-neon-sign"
            text="design your neon"
            className="h-12 w-52 flex items-center justify-center bg-white text-black"
          />
        </div>
      </section>
      <section className="px-5 lg:px-20 py-20 bg-white text-black ">
        <h3 className="text-3xl uppercase font-semibold uppercase mb-20 text-center">
          our neon process
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-16">
          <div className="bg-black text-white p-4 grid gap-3 uppercase">
            <FaDesktop className="text-3xl" />
            <p className="text-2xl">design</p>
            <p className="text">design and order your neon sign</p>
          </div>
          <div className="bg-black text-white p-4 grid gap-3 uppercase">
            <FaBrush className="text-3xl" />
            <p className="text-2xl">create</p>
            <p className="text">
              WE CREATE YOUR NEON SIGN USING PREMIUM MATERIAL
            </p>
          </div>
          <div className="bg-black text-white p-4 grid gap-3 uppercase">
            <FaShippingFast className="text-3xl" />
            <p className="text-2xl">ship</p>
            <p className="text">WE SHIP YOUR NEON CREATION TO YOUR HOUSE</p>
          </div>
          <div className="bg-black text-white p-4 grid gap-3 uppercase">
            <FaHandHoldingHeart className="text-3xl" />
            <p className="text-3xl">enjoy</p>
            <p className="text">YOU BASK IN YOUR NEW NEON GLOW</p>
          </div>
        </div>
      </section>
      <section
        className="px-5 lg:px-20 py-10 flex flex-col lg:flex-row items-center justify-between gap-10 bg-black text-white relative text-center md:text-left"
        style={{
          background:
            "linear-gradient(rgba(0, 0, 0,0.94), rgba(0, 0, 0,0.94)), url('/img/neon-banner-3.jpg')",
        }}
      >
        <div className="flex-1 grid gap-5 justify-items-center md:justify-items-start">
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
        <img src="/img/neon-banner-4.png" alt="" />
      </section>
      <section className="px-5 lg:px-20 py-20 bg-white">
        <h3 className="text-3xl uppercase font-semibold uppercase text-center mb-10">
          our best-selling products
        </h3>
        <ProductsSlider
          products={products.map((product) => ({
            name: product.name,
            img: product.image.url,
            price: product.sizes[0].price,
            link: `/shop/${product.category.slug}/${product.slug}`
          }))}
        />
      </section>
      <section
        className="px-5 lg:px-20 py-20 bg-black"
        style={{
          background:
            "linear-gradient(rgba(0, 0, 0,0.9), rgba(0, 0, 0,0.9)), url('/img/neon-banner-2.jpg')",
          backgroundAttachment: "fixed",
        }}
      >
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
            text="They go up like a picture frame and plug in like a lamp! Every NeonShop Neon comes with an installation kit and pre-drilled holes, ready to hang and enjoy right out of the box. Find out more about how to hang your Neon here."
          >
            <FaCogs className="text-green-500" />
          </Item>
          <Item
            title="HAND-MADE"
            text="We make Neons to order. Whether it’s your custom creation, or one of our pre-designed items, each piece is handmade by a specialist Neon artisan, especially for you."
          >
            <FaHands className="text-indigo-500" />
          </Item>
        </div>
      </section>
      <section className="px-5 lg:px-20 py-20 bg-white">
        <h3 className="text-3xl uppercase font-semibold uppercase text-center mb-10">
          what our clients say
        </h3>
        <ReviewSlider />
      </section>
      <section
        className="px-5 lg:px-20 py-20 bg-black text-white"
        style={{
          background:
            "linear-gradient(rgba(0, 0, 0,0.94), rgba(0, 0, 0,0.94)), url('/img/neon-banner-3.jpg')",
        }}
      >
        <h3 className="text-3xl  font-semibold uppercase text-center mb-10">
          want some inspo?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-10">
          <CustomLink className="grid gap-3 text-center bg-white text-black pb-3">
            <img
              src="/img/product-images/product-1.jpg"
              alt="product"
              className="w-full object-cover"
            />
            <p className="text-xl px-5  font-bold uppercase">
              Juddchella - An Event By NeonShop
            </p>
            <p className="px-5">
              Move over Coachella, The Judd’s are in town. The only person we
              know that could pull off a housewarming party theme this
              extravagant is non-other than...
            </p>
          </CustomLink>
          <CustomLink className="grid gap-3 text-center bg-white text-black pb-3">
            <img
              src="/img/product-images/product-3.jpg"
              alt="product"
              className="w-full object-cover"
            />
            <p className="text-xl px-5  font-bold uppercase">
              Home office ideas to boost your productivity{" "}
            </p>
            <p className="px-5">
              ‘Home Office Ideas’ would have to be one of the most searched for
              phrases in 2020. Thanks to Covid, our work environments have
              undergone a...
            </p>
          </CustomLink>
          <CustomLink className="grid gap-3 text-center bg-white text-black pb-3">
            <img
              src="/img/product-images/product-4.jpg"
              alt="product"
              className="w-full object-cover"
            />
            <p className="text-xl px-5  font-bold uppercase">
              retail design | first impressions count
            </p>
            <p className="px-5">
              Retail Design | First Impressions Count 11 mins read This one is
              for all you business owners out there. Everyone knows that first
              impressions count....
            </p>
          </CustomLink>
        </div>
      </section>
      <section className="px-5 lg:px-20 py-20 bg-white text-center md:text-left">
        <h3 className="text-3xl uppercase font-semibold uppercase text-center mb-16">
          our story
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 ">
          <div className="flex flex-col gap-4 justify-center">
            <p className="font-semibold">
              Meet Ash & Tash (Co-Founders of NeonShop)
            </p>
            <p>
              NeonShop was co-founded in 2015 by two friends with one vision -
              to light up people’s lives by creating lasting impressions.
            </p>
            <p>
              From humble beginnings in Geelong, Australia, Ash and Tash came to
              meet hundreds of miles/kilometers away from where their own
              individual stories began.
            </p>
            <p>
              Ash originally owned a drone business, while Tash had her roots
              grounded in photography. Thank the Neon stars, that in a
              bitter-sweet twist of fate, Ash’s drone business literally crashed
              and burned. And soon after from the embers, the NeonShop
              partnership was founded. The rest, as they say, is history.
              <CustomLink className="font-semibold"> Read more.</CustomLink>
            </p>
          </div>
          <div className="relative">
            <img src="/img/our-story.jpg" alt="our neon store story" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center mt-10 gap-10">
          <CustomLink
            href="/shop"
            text="shop now"
            className="h-12 w-52 flex items-center justify-center bg-black text-white uppercase font-semibold transition hover:text-gray-200"
          />
          <CustomLink
            text="chat to us"
            className="h-12 w-52 flex items-center justify-center bg-white text-black border border-black uppercase font-semibold transition hover:bg-black hover:text-white"
          />
        </div>
      </section>
      <NewsLetterSection />
      <section className=" pt-20 bg-white text-blackflex flex flex-col gap-10 items-center">
        <h3 className="px-5 lg:px-20 text-3xl font-semibold uppercase ">
          follow us on
        </h3>
        <div className="px-5 lg:px-20 flex items-center gap-3 text-4xl">
          <CustomLink>
            <FaFacebook />
          </CustomLink>
          <CustomLink className="relative">
            <FaInstagram />{" "}
            <span className="text-sm absolute left-1 font-semibold">100k</span>
          </CustomLink>
        </div>
        <InstaGallery />
      </section>
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



export const getStaticProps = async () => {
  try {
    await connectDb();

    const products = await Product.find()
      .populate({ path: "category", model: Category, select: "slug -_id" })
      .sort({ createdAt: -1 })
      .limit(9)
      .lean()

    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      props: {
        error: { code: 500, message: "this is the error" },
      },
      revalidate: 10,
    };
  }
};