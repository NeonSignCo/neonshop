import { FaStar } from "react-icons/fa";
import { BsPlus } from 'react-icons/bs'
import BreadCrumb from "../../../components/BreadCrumb"
import { useState } from 'react';
import { useGlobalContext } from '../../../context/GlobalContext';
import NewsLetterSection from "../../../components/sections/NewsLetterSection";
import FollowSection from "../../../components/sections/FollowSection";
import { AnimatePresence, motion } from "framer-motion";
import CustomLink from "../../../components/CustomLink";


const Product = () => {
    const [globalState] = useGlobalContext();
    const rating = 4
    const colors = ['white', 'red', 'purple', 'green', 'blue', 'yellow'];
    const sizes = ['small', 'medium', 'large', 'custom']
    const mountTypes = ['hanging', 'wall'];

    const [selectedOptons, setSelectedOptions] = useState({
        color: '', 
        size: '', 
        mountType: ''
    })

    return (
      <div className=" pt-10">
        <div className="px-5 lg:px-20 mb-4">
          <BreadCrumb />
        </div>
        <div className="px-5 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-7 ">
          <img
            src={`/img/product-images/product-2.jpg`}
            alt="product"
            className="w-full object-cover md:sticky top-16"
          />
          <div className="grid gap-5 place-content-start">
            <h1 className="text-3xl font-semibold uppercase">Product name</h1>
            <div className="flex items-center gap-1">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FaStar
                    key={i}
                    className={i > rating ? "text-gray-400" : ""}
                  />
                ))}
              </div>
              <span>| 10 reviews</span>
            </div>
            <p className="flex items-center font-semibold text-2xl text-gray-600">
              <span>{globalState.currencySign}</span>
              <span>300</span>
            </p>
            <p>
              Shout your love from the rooftops with a custom neon sign from our
              Wedding collection. Personalize the color to show off your style!
            </p>
            <div className="">
              <h3 className="uppercase font-semibold mb-1">color</h3>
              <div className="flex flex-wrap gap-5 items-center">
                {colors.map((color, i) => (
                  <button
                    key={i}
                    className={`grid gap-2 p-3 transition justify-items-center ${
                      selectedOptons.color === color
                        ? "bg-black text-white"
                        : "bg-gray-200 "
                    }`}
                    onClick={() =>
                      setSelectedOptions((options) => ({ ...options, color }))
                    }
                  >
                    <div
                      className="h-9 w-9 rounded-full"
                      style={{ backgroundColor: color }}
                    ></div>
                    <p className="capitalize">{color}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="">
              <h3 className="uppercase font-semibold mb-1">size</h3>
              <div className="flex flex-wrap gap-5 items-center uppercase">
                {sizes.map((size, i) => (
                  <button
                    key={i}
                    className={` px-6 py-2 transition capitalize ${
                      selectedOptons.size === size
                        ? "bg-black text-white"
                        : "bg-gray-200 "
                    }`}
                    onClick={() =>
                      setSelectedOptions((options) => ({ ...options, size }))
                    }
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="">
              <h3 className="uppercase font-semibold mb-1">mount type</h3>
              <div className="flex flex-wrap gap-5 items-center uppercase">
                {mountTypes.map((mountType, i) => (
                  <button
                    key={i}
                    className={` px-6 py-2 transition capitalize ${
                      selectedOptons.mountType === mountType
                        ? "bg-black text-white"
                        : "bg-gray-200 "
                    }`}
                    onClick={() =>
                      setSelectedOptions((options) => ({
                        ...options,
                        mountType,
                      }))
                    }
                  >
                    {mountType}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <QnA title="shipping">
                All our neons are crafted from scratch just for you. Standard
                orders will normally take 2-4 weeks to be made and get from us
                to you from proof approval date. Express orders normally take
                10-15 days to be delivered to you from proof approval date.
              </QnA>
              <QnA title="faq">
                <div className="grid gap-3">
                  <p className="font-semibold ">Are they hard to install?</p>{" "}
                  <p>
                    Not at all! Sketch and Etch Neon signs come ready to hang,
                    with pre-drilled holes. If you can hang a picture frame, you
                    can hang a neon!
                  </p>{" "}
                  <p className="font-semibold ">How do Neon lights work?</p>
                  <p>
                    Your neon will come with an adaptor suited to your delivery
                    location, and a remote control and dimmer. All you need to
                    do is plug it in to a power socket, just like a lamp. Then
                    all that's left to do is turn on and enjoy! Plus, you can
                    adjust your brightness with the remote control. Please note,
                    your neon will also come with approximately 10ft of
                    translucent cord which connects to your neon sign, this then
                    connects to an additional 6ft of black cord and your power
                    pack. Quality and care We pride ourselves in exceptional
                    quality, and happily offer an extended 24 month
                    manufacturers warranty (double the industry standard!).
                    Please note, pre-designed neons in our shop are intended for
                    indoor use only.
                  </p>{" "}
                  <p className="font-semibold ">
                    Looking for something more custom?
                  </p>{" "}
                  <p>
                    All our pre-designed Shop neons can be tailored to suit your
                    style.
                  </p>{" "}
                  <p className="font-semibold ">Want a mix of fonts?</p>{" "}
                  <p>If you can imagine it, we can create it.</p>{" "}
                  <p className="font-semibold ">
                    After a different coloured Acrylic backing board?
                  </p>
                  <p>
                    Try our{" "}
                    <CustomLink
                      href="/custom-neon-sign"
                      className="font-semibold"
                      text="Online Neon Builder"
                    />{" "}
                    Tool or{" "}
                    <CustomLink
                      href="/contact"
                      className="font-semibold"
                      text="Contact"
                    />{" "}
                    us today to see how we can help.
                  </p>
                </div>
              </QnA>
            </div> 
            <button className="px-12 text-lg py-3 bg-black text-white uppercase max-w-max">
                add to cart
            </button>
          </div>
        </div>
        <div className="mt-28">
          <NewsLetterSection />
          <FollowSection />
        </div>
      </div>
    );
}

export default Product




const QnA = ({ title, children }) => {
    const [expand, setExpand] = useState(false);

    return (
      <div className="">
        <button
          className="w-full border-t border-b py-2 border-gray-400 flex items-center justify-between"
          onClick={() => setExpand((bool) => !bool)}
        >
          <h3 className="uppercase font-semibold">{title}</h3>
          <BsPlus
            className={`text-2xl transition ${expand ? "rotate-45" : ""}`}
          />
        </button>
        <AnimatePresence>
          {expand && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: { duration: 0.3 },
              }}
              exit={{ height: 0, opacity: 0, transition: { duration: 0.3 } }}
            >
              <div className="py-5">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );

}