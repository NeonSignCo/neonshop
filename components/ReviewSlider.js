import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { FaCaretLeft, FaCaretRight, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const ReviewSlider = ({ reviews = [1, 2, 3, 4, 5, 6] }) => {
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
                src={review.neon?.img || "/img/product-1.jpg"}
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
