import { FaStar } from "react-icons/fa";
import { BsPlus, BsDash } from "react-icons/bs";
import BreadCrumb from "../../../components/BreadCrumb";
import { useState } from "react";
import { useGlobalContext } from "../../../context/GlobalContext";
import NewsLetterSection from "../../../components/sections/NewsLetterSection";
import FollowSection from "../../../components/sections/FollowSection";
import { AnimatePresence, motion } from "framer-motion";
import CustomLink from "../../../components/CustomLink";
import ContactForm from "../../../components/forms/ContactForm";
import { useRouter } from "next/router";
import connectDb from "../../../server/utils/connectDb";
import Product from "../../../server/models/product";
import Category from "../../../server/models/category";


// variations
const colors = [
  { name: "red", hex: "#ff0000" },
  { name: "green", hex: "#008000" },
  { name: "blue", hex: "#0000ff" },
];
const mountTypes = ['WALL', 'HANGING']

const ProductPage = ({ product }) => {
  const Router = useRouter();
  const productLink = Router.asPath;
  const [globalState, setGlobalState] = useGlobalContext();
  const [state, setState] = useState({
    color: { name: '', hex: '' },
    size: { info: '', price: '' },
    quantity: 1,
    mountType: "",
    errors: {
      color: "",
      size: "",
      mountType: "",
      quantity: "",
    },
  });
  const [showForm, setShowForm] = useState(false);

  const addToCart = () => {
    // check if all options are selected
    if (
      !state.color ||
      !state.size.info ||
      !state.mountType ||
      !state.quantity
    ) {
      setState((state) => ({
        ...state,
        errors: {
          color: !state.color.hex ? "Please select a color" : "",
          size: !state.size.name ? "Please select a size" : "",
          mountType: !state.mountType ? "Please select mount type" : "",
          quantity: !state.quantity ? "Please select quantity" : "",
        },
      }));

      // scroll to error point
      const scrollTarget = document.getElementById(
        !state.color.hex
          ? "color"
          : !state.size.name
          ? "size"
          : !state.mountType
          ? "mount-type"
          : !state.quantity && "quantity"
      );
      window.scrollTo(0, scrollTarget.offsetTop - 70);
      return;
    }

    const cart = globalState.cart;
    const productInfo = {
      _id: product._id,
      productLink,
      name: product.name,
      image: product.image,
      size: state.size,
      color: state.color,
      mountType: state.mountType,
      quantity: Number(state.quantity),
    };

    // ignoring product quantity while calculating duplicate
    const duplicateIndex = cart.items.findIndex(
      (item) =>
        item._id === productInfo._id &&
        item.size.name === productInfo.size.name &&
        item.color.hex === productInfo.color.hex &&
        item.mountType === productInfo.mountType
    );

    if (duplicateIndex !== -1) {
      // increase the quantity of the same variation
      const increasedQuantity =
        Number(cart.items[duplicateIndex].quantity) +
        Number(productInfo.quantity);

      // increase subtotal price accroding to new quantity
      cart.subTotal +=
        Number(cart.items[duplicateIndex].size.price) *
        (increasedQuantity - Number(cart.items[duplicateIndex].quantity));
      cart.items[duplicateIndex].quantity = increasedQuantity;
    } else {
      cart.items.push(productInfo);
      cart.subTotal +=
        Number(productInfo.size.price) * Number(productInfo.quantity);
    }

    // save to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // update state and show cart
    setGlobalState((state) => ({ ...state, cart, showCart: true }));
  };

  return (
    <div className=" pt-10">
      <div className="px-5 lg:px-20 mb-4">
        <BreadCrumb />
      </div>
      <div className="px-5 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-7">
        <img
          src={product.image.url}
          alt={product.name || "product name"}
          className="w-full object-cover  md:sticky top-16"
        />
        <div className="grid gap-5 place-content-star">
          <h1 className="text-3xl font-semibold uppercase">{product.name}</h1>
          <div className="flex items-center gap-1">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStar
                  key={i}
                  className={i > product.rating ? "text-gray-400" : ""}
                />
              ))}
            </div>
            <span>| {product.reviewsCount || 0} reviews</span>
          </div>
          <p className="flex items-center font-semibold text-2xl text-gray-600">
            <span>$</span> 
            <span>{state.size.price || product.sizes[0].price}</span>
          </p>
          <p>{product.description}</p>
          <div id="color">
            <h3 className="uppercase font-semibold mb-1">
              {!state.errors.color ? (
                "color"
              ) : (
                <span className="text-red-500">{state.errors.color}</span>
              )}
            </h3>
            <div className="flex flex-wrap gap-5 items-center">
              {colors.map((color, i) => (
                <button
                  key={i}
                  className={`grid gap-2 p-3 transition justify-items-center ${
                    state.color.hex === color.hex
                      ? "bg-black text-white"
                      : "bg-gray-200 "
                  }`}
                  onClick={() =>
                    setState((options) => ({
                      ...options,
                      color,
                      errors: { ...state.errors, color: "" },
                    }))
                  }
                >
                  <div
                    className="h-9 w-9 rounded-full"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <p className="capitalize">{color.name}</p>
                </button>
              ))}
            </div>
          </div>
          <div id="size">
            <h3 className="uppercase font-semibold mb-1">
              {!state.errors.size ? (
                "size"
              ) : (
                <span className="text-red-500">{state.errors.size}</span>
              )}
            </h3>
            <div className="flex flex-wrap gap-5 items-center uppercase">
              {product.sizes.map((size, i) => (
                <button
                  key={i}
                  className={` px-6 py-2 transition uppercase ${state.size.info === size.info ? 'bg-black text-white': 'bg-gray-200'}`}
                  onClick={() =>
                    setState((options) => ({
                      ...options,
                      size,
                      errors: { ...state.errors, size: "" },
                    }))
                  }
                >
                  {size.info}
                </button>
              ))}
            </div>
          </div>
          <div id="mount-type">
            <h3 className="uppercase font-semibold mb-1">
              {!state.errors.mountType ? (
                "mount type"
              ) : (
                <span className="text-red-500">{state.errors.mountType}</span>
              )}
            </h3>
            <div className="flex flex-wrap gap-5 items-center uppercase">
              {mountTypes.map((mountType, i) => (
                <button
                  key={i}
                  className={` px-6 py-2 transition capitalize ${
                    state.mountType === mountType
                      ? "bg-black text-white"
                      : "bg-gray-200 "
                  }`}
                  onClick={() =>
                    setState((options) => ({
                      ...options,
                      mountType,
                      errors: { ...state.errors, mountType: "" },
                    }))
                  }
                >
                  {mountType}
                </button>
              ))}
            </div>
          </div>
          <div id="quantity">
            <h3 className="uppercase font-semibold mb-1">
              {!state.errors.quantity ? (
                "quantity"
              ) : (
                <span className="text-red-500">{state.errors.quantity}</span>
              )}
            </h3>
            <div className="flex items-center gap-1">
              <button
                className="h-8 w-8 flex items-center justify-center bg-gray-200 transition hover:bg-black hover:text-white text-2xl"
                disabled={state.quantity <= 1}
                onClick={() =>
                  setState((state) => ({
                    ...state,
                    quantity: Number(state.quantity) - 1,
                  }))
                }
              >
                <BsDash />
              </button>
              <input
                type="number"
                min={1}
                value={state.quantity}
                onChange={(e) => {
                  if (e.target.value < 0) e.target.value = 1;
                  setState((state) => ({
                    ...state,
                    quantity: Number(e.target.value),
                  }));
                }}
                className="h-8 w-8 border border-gray-300 text-black hide-controls text-lg text-center"
              />
              <button
                className="h-8 w-8 flex items-center justify-center bg-gray-200 transition hover:bg-black hover:text-white text-2xl"
                onClick={() =>
                  setState((state) => ({
                    ...state,
                    quantity: Number(state.quantity) + 1,
                  }))
                }
              >
                <BsPlus />
              </button>
            </div>
          </div>
          <div className="">
            <QnA title="shipping">
              {product.shippingDescription ||
                "All our neons are crafted from scratch just for you. Standardorders will normally take 2-4 weeks to be made and get from usto you from proof approval date. Express orders normally take10-15 days to be delivered to you from proof approval date."}
            </QnA>
            <QnA title="faq">
              <div className="flex flex-col gap-4">
                <p className="font-semibold ">Are they hard to install?</p>{" "}
                <p>
                  Not at all! Sketch and Etch Neon signs come ready to hang,
                  with pre-drilled holes. If you can hang a picture frame, you
                  can hang a neon!
                </p>{" "}
                <p className="font-semibold ">How do Neon lights work?</p>
                <p>
                  Your neon will come with an adaptor suited to your delivery
                  location, and a remote control and dimmer. All you need to do
                  is plug it in to a power socket, just like a lamp. Then all
                  that's left to do is turn on and enjoy! Plus, you can adjust
                  your brightness with the remote control. Please note, your
                  neon will also come with approximately 10ft of translucent
                  cord which connects to your neon sign, this then connects to
                  an additional 6ft of black cord and your power pack. Quality
                  and care We pride ourselves in exceptional quality, and
                  happily offer an extended 24 month manufacturers warranty
                  (double the industry standard!). Please note, pre-designed
                  neons in our shop are intended for indoor use only.
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

          <button
            className="px-12 text-lg py-3 bg-black text-white uppercase max-w-max"
            onClick={addToCart}
          >
            add to cart
          </button>

          <button
            className="p-2 border border-gray-500 max-w-max"
            onClick={() => {
              setShowForm((bool) => !bool);
              !showForm &&
                document
                  .getElementById("form-section")
                  .scrollIntoView({ behavior: "smooth" });
            }}
          >
            Need something more custom?
          </button>
        </div>
      </div>
      <div className="">
        <div className="pt-20" id="form-section">
          {showForm && (
            <div className="mb-16">
              <h3 className="text-3xl text-center mb-5">
                Type your enquiry here
              </h3>
              <ContactForm
                productInfo={{
                  name: "produc 1",
                  link: productLink,
                  image: "/img/product-images/product-2.jpg",
                }}
              />
            </div>
          )}
        </div>
        <NewsLetterSection />
        <FollowSection />
      </div>
    </div>
  );
};

export default ProductPage;

const QnA = ({ title, children }) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className=" w-full">
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
};

export const getStaticProps = async ({ params }) => {
  try {
    await connectDb();
    const product = await Product.findOne({ slug: params.product }).lean();

    if (!product)
      return {
        notFound: true,
      };
    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
      },
      revalidate: 10,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        error: { code: 500, message: "server error" },
      },
      revalidate: 10,
    };
  }
};



export const getStaticPaths = async () => {
  try { 
   
    const paths = []; 
    await connectDb(); 
    const products = await Product.find().populate({ path: 'category', model: Category , select: 'slug -_id'}).select('slug -_id').lean();
     
    products.forEach((item) =>
      paths.push({ params: { product: item.slug, category: item.category.slug } })
    );

    return {  
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.log(error)
    return {
      paths: [],
      fallback: false,
    };
  }
};
