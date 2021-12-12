import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { FaCaretLeft, FaCaretRight, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

 
 
const reviews = [
            { name: "suzy", img: "/img/client-images/client-1.jpg", text:"Thanks for our neon sign, it was the perfect backdrop for our event!", position: 'flowa liberal', neon: {img: '/img/product-images/product-1.jpg', name: 'neon art name'}},
            {
              name: "james",
              img: "/img/client-images/client-2.jpg",
              text: "Great communication! The neon signs we ordered are incredible and they were so lovely and amazing with helping us out"
              ,
              position: 'hactic arts',
              neon: { img: '/img/product-images/product-2.jpg', name: 'neon art name' }
            },
            {
              name: "leo",
              img: "/img/client-images/client-3.jpg", text:"NeonShop were SO easy to deal with, very attentive to ourvision and created the most stunning and...",
              position: 'street skate corp',
              neon: { img: '/img/product-images/product-3.jpg', name: 'neon art name' }
            },
            {
              name: "mary", img: "/img/client-images/client-4.jpg", text: "NeonShop have been so enjoyable to work with especially Tash. Their communication and attention to detail is amazing....", position: 'mariana cafe', neon: { img: '/img/product-images/product-4.jpg', name: 'neon art name' }
            },
            {
              name: "stephan",
              img: "/img/client-images/client-5.jpg",
              text: "Sent them through our logo, before we knew it it was designed and on our doorstep. Really happy...it’s just given...",
              position: 'Admire Artists', neon: { img: '/img/product-images/product-5.jpg', name: 'neon art name' }
            },
            {
              name: "liana", img: "/img/client-images/client-6.jpg",
              text: "They have their Neons down to a science! Even the way the item was packaged and shipped to the US...",
              position: 'Snared Services',
              neon: { img: '/img/product-images/product-6.jpg', name: 'neon art name' }
            },
          ]

const ReviewSlider = () => {
  const [review, setreview] = useState(0);

  const { width } = useWindowDimensions();

  useEffect(() => setreview(0), [width]);
  return (
    <div className="relative">
      <Controls
        review={review}
        setreview={setreview}
        reviews={reviews}
        width={width}
      />
      <div className="relative overflow-hidden">
        <motion.div
          className="flex mt-20"
          style={{ width: `${reviews.length * 100}%` }}
          initial={{ x: 0 }}
          animate={{
            x: `-${(review / reviews.length) * 100}%`,
            transition: { duration: 0.5 },
          }}
        >
          {reviews.map((review, i) => (
            <div
              className="px-5"
              key={i}
              style={{
                width:
                  width >= 768
                    ? `${(1 / reviews.length) * 33.33}%`
                    : width >= 640
                    ? `${(1 / reviews.length) * 50}%`
                    : `${(1 / reviews.length) * 50}%`,
              }}
            >
              <img
                src={review.neon?.img || "/img/product-images/product-1.jpg"}
                      alt={review.neon?.name || "neon art"}
              />
              <div className="text-center">
                <FaQuoteLeft className="mx-auto my-3" />
                <p>{review.text}</p>
                <FaQuoteRight className="mx-auto my-3" />
              </div>
              <div className="flex justify-center items-center gap-2">
                <img
                  src={review.img || "/img/client-2.jpg"}
                  alt="neon art"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="">
                  <p className="font-semibold capitalize text-lg">
                    {review.name}
                  </p>
                  <p className="text-sm">{review.position}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewSlider;

const Controls = ({ setreview, review, reviews, width }) => {
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
            ? review >= Math.floor((reviews.length - 1) / 3)
            : review >= Math.floor((reviews.length - 1) / 2)
        }
        onClick={() => setreview(review + 1)}
      >
        <FaCaretRight />
      </button>
    </div>
  );
};
