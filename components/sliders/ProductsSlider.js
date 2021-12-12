import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import CustomLink from "../CustomLink";

const ProductsSlider = () => { 
  const products = [
            { name: "product 1", img: "/img/product-images/product-1.jpg", price: "299" },
            {
              name: "product 2",
              img: "/img/product-images/product-2.jpg",
              price: "400",
              hot: true,
            },
            { name: "product 3", img: "/img/product-images/product-3.jpg", price: "459" },
            { name: "product 4", img: "/img/product-images/product-4.jpg", price: "269" },
            {
              name: "product 5",
              img: "/img/product-images/product-5.jpg",
              price: "129",
              hot: true,
            },
            { name: "product 6", img: "/img/product-images/product-6.jpg", price: "579" },
  ]
  
  const [review, setreview] = useState(0);

  const { width } = useWindowDimensions();

  useEffect(() => setreview(0), [width]);
  return (
    <div className="relative">
      <Controls
        review={review}
        setreview={setreview}
        products={products}
        width={width}
      />
      <div className="relative overflow-hidden">
        <motion.div
          className="flex mt-20"
          style={{ width: `${products.length * 100}%` }}
          initial={{ x: 0 }}
          animate={{
            x: `-${(review / products.length) * 100}%`,
            transition: { duration: 0.5 },
          }}
        >
          {products.map((product, i) => (
            <div
              className={`px-5`}
              key={i}
              style={{
                width:
                  width >= 768
                    ? `${(1 / products.length) * 33.33}%`
                    : width >= 640
                    ? `${(1 / products.length) * 50}%`
                    : `${(1 / products.length) * 50}%`,
              }}
            >
              <ProductPreview
                name={product.name}
                img={product.img}
                text={product.text}
                price={product.price}
                hot={product.hot}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductsSlider;

const Controls = ({ setreview, review, products, width }) => {
  return (
    <div className="absolute z-10 top-1/2 -inset-x-5 transform translate-y-10 flex justify-between text-3xl">
      <button
        className="transform focus:outline-none focus:scale-125 focus:ring-2 transition py-5 bg-black text-white disabled:bg-gray-800"
        disabled={review === 0}
        onClick={() => setreview(review - 1)}
      >
        <FaCaretLeft />
      </button>
      <button
        className="transform focus:outline-none focus:scale-125 focus:ring-2 transition py-5 bg-black text-white disabled:bg-gray-800"
        disabled={
          width >= 768
            ? review >= Math.floor((products.length - 1) / 3)
            : review >= Math.floor((products.length - 1) / 2)
        }
        onClick={() => setreview(review + 1)}
      >
        <FaCaretRight />
      </button>
    </div>
  );
}; 



const ProductPreview = ({
  name = "yeet neon sign",
  img = "/img/product-1.jpg",
  price = 500,
  text = "buy now",
  link = "/",
  hot = false,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center gap-5 text-black relative">
      <CustomLink hre={link} className="relative h-60">
        <img src={img} alt={name} className="object-cover h-full" />
      </CustomLink>
      <p className="uppercase">{name}</p>
      <p className="flex items-center tracking-[3px]">
        <FaDollarSign /> {Number(price).toFixed(2)}
      </p>
      <CustomLink
        href={link}
        text={text}
        className="px-5 py-2 sm:px-10 sm:py-4 md:px-16 flex items-center justify-center bg-black text-white"
      />
      {hot && (
        <div className="absolute bg-gray-800 py-[2px] px-3 text-white -top-3 -right-2 uppercase">
          hot
        </div>
      )}
    </div>
  );
};
