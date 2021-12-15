import CustomLink from "../../CustomLink";
import { FaCartArrowDown } from "react-icons/fa";
import { colors, fonts, icons } from "../../../utils/CustomNeonAssets";
import Navigation from "./Navigation";
import { BLACKACRYLIC, CLEARACRYLIC, GOLDACRYLIC, MIRRORACRYLIC, useNeonBuilderContext } from "../../../context/NeonBuilderContext";
import { AnimatePresence } from "framer-motion";
import Preview from "./Preview";

const Controls = () => {
  const [state, setState] = useNeonBuilderContext();

  const showPreview = () => {
    // text check
    if (!state.data.text) {
      setState((state) => ({
        ...state,
        error: {
          ...state.error,
          text: "Please write what would you like your neon to say",
        },
      }));

      // scroll to erro section
      return document
        .getElementById("text")
        .scrollIntoView({ behavior: "smooth" });
    }

    // size check
    if (!state.data.height || !state.data.width) {
      setState((state) => ({
        ...state,
        error: {
          ...state.error,
          size: "Please select both height and width",
        },
      }));

      // scroll to error section
      return document
        .getElementById("size")
        .scrollIntoView({ behavior: "smooth" });
    }

    // show preview
    setState((state) => ({
      ...state,
      controls: { ...state.controls, showPreview: true },
    })); 
    return document
      .getElementById("size")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className=" col-span-3 lg:col-span-1 row-span-4 lg:row-span-6 overflow-hidden md:p-5">
      <div className=" flex flex-col bg-gray-200 relative overflow-hidden h-full">
        <AnimatePresence>
          {state.controls.showNavigation && <Navigation />}
        </AnimatePresence>
        <AnimatePresence>
          {state.controls.showPreview && <Preview />}
        </AnimatePresence>
        <div className="flex flex-col gap-8 p-5 overflow-auto">
          <div className="grid gap-2" id="text">
            <h2 className="text-center text-lg p-2">
              {state.error.text ? (
                <span className="text-red-500">{state.error.text}</span>
              ) : (
                " What would you like your neon to say?"
              )}
            </h2>
            <textarea
              rows="3"
              className=" p-1 outline-none "
              placeholder="what's on your mind? "
              value={state.data.text}
              onChange={(e) =>
                setState((state) => ({
                  ...state,
                  data: { ...state.data, text: e.target.value }, 
                  error: {...state.error, text: ''}
                }))
              }
            ></textarea>
          </div>
          <div className="grid gap-2" id="font">
            <h2 className="text-center text-lg p-2">
              Choose a font that suits your style
            </h2>
            <div className="grid gap-3 grid-cols-3 text-white">
              {fonts.map((font, i) => (
                <button
                  className={`py-3  transition  ${
                    state.data.font === font.family
                      ? "bg-gray-900  text-white "
                      : "bg-white text-black"
                  }  ${font.family === "MontserratRegular" ? "text-xs" : ""}`}
                  key={i}
                  style={{ fontFamily: font.family }}
                  onClick={() =>
                    setState((state) => ({
                      ...state,
                      data: { ...state.data, font: font.family },
                    }))
                  }
                >
                  {font.text}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-2" id="color">
            <h2 className="text-center text-lg p-2">Pick your color</h2>
            <div className="grid gap-4 grid-cols-4 text-sm">
              {colors.map((color, i) => (
                <button
                  className={`capitalize  flex flex-col items-center gap-2 transition p-2 ${
                    state.data.color === color.hex
                      ? "bg-gray-900 text-white "
                      : "bg-white text-black "
                  }`}
                  key={i}
                  onClick={() =>
                    setState((state) => ({
                      ...state,
                      data: { ...state.data, color: color.hex },
                    }))
                  }
                >
                  <div
                    className={`h-8 w-8 rounded-full ${
                      color.name === "white" ? "border border-black" : ""
                    }`}
                    style={{ background: color.hex }}
                  ></div>
                  <span>{color.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-2" id="icon">
            <h2 className="text-center text-lg p-2 ">
              Add an Icon
              <span className="font-semibold"> (optional)</span>{" "}
            </h2>
            <div className="grid gap-4 grid-cols-4">
              {icons.map((icon, i) => (
                <button
                  className={`transition  ${
                    state.data.icon.name === icon.name
                      ? "bg-gray-900"
                      : "bg-gray-400"
                  }`}
                  key={i}
                  onClick={() =>
                    setState((state) => ({
                      ...state,
                      data: { ...state.data, icon: state.data.icon.name === icon.name ? {link: '', name: ''}: icon},
                    }))
                  }
                >
                  <img src={`/img/neon-logos/${icon.link}`} alt={icon.name} />
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-2" id="size">
            <h2 className="text-center text-lg p-2 ">
              {state.error.size ? (
                <span className="text-red-500">{state.error.size}</span>
              ) : (
                "select your size"
              )}
              <span className="font-semibold"> (in inches)</span>{" "}
            </h2>
            <div className="grid grid-cols-2 gap-4 text-black">
              <div className="flex items-center gap-2">
                <p className="capitalize">height</p>
                <input
                  type="number"
                  min={1}
                  className="p-2 w-20"
                  value={state.data.height}
                  onChange={(e) => {
                    if (e.target.value < 0) e.target.value = 0;
                    setState((state) => ({
                      ...state,
                      data: { ...state.data, height: e.target.value }, 
                      error: {...state.error, size: ''}
                    }));
                  }}
                />
              </div>
              <flex className="flex items-center gap-2">
                <p className="capitalize">width</p>
                <input
                  type="number"
                  min={1}
                  className="p-2 w-20"
                  value={state.data.width}
                  onChange={(e) => {
                    if (e.target.value < 0) e.target.value = 0;
                    setState((state) => ({
                      ...state,
                      data: { ...state.data, width: e.target.value },
                      error: { ...state.error, size: "" },
                    }));
                  }}
                />
              </flex>
            </div>
          </div>
          <div className="grid gap-2 " id="backing">
            <h2 className="text-center capitalize text-lg p-2">
              How your neon's backing is finished
            </h2>
            <BackingBtn
              title="clear acrylic"
              text="Acrylic backing with transparent color"
              value={CLEARACRYLIC}
              price={0}
            />
            <BackingBtn
              title="black acrylic"
              text="Acrylic backing with black color"
              value={BLACKACRYLIC}
              price={0}
            />
            <BackingBtn
              title="mirror acrylic"
              text="Acrylic backing with same color as text"
              value={MIRRORACRYLIC}
              price={44.12}
            />
            <BackingBtn
              title="gold mirror acrylic"
              text="Acrylic backing with gold color"
              value={GOLDACRYLIC}
              price={97.07}
            />
          </div>
          <div className="grid gap-2" id="mount-type">
            <h2 className="text-center capitalize text-lg p-2">
              select how you want to mount your neon
            </h2>
            <div className="flex gap-2 uppercase">
              <MountBtn type="wall" />
              <MountBtn type="hanging" />
            </div>
          </div>
          <div className="grid gap-2" id="delivery-time">
            <h2 className="text-center capitalize text-lg p-2">
              Select your preferred delievry time
            </h2>
            <select
              id="delivery-time"
              className="w-full p-2 bg-white"
              name="expectedDeliveryTime"
              value={state.data.deliveryTime}
              onChange={(e) =>
                setState((state) => ({
                  ...state,
                  data: { ...state.data, deliveryTime: e.target.value },
                }))
              }
            >
              <option value="2-3 weeeks" className="">
                2-3 Weeks (Rush Fees Apply)
              </option>
              <option value="4-6 weeks" className="">
                4-6 Weeks
              </option>
              <option value="6+ weeks" className="">
                6+ Weeks
              </option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-center lg:justify-start  gap-2 py-2 lg:p-4 bg-gray-300 border-t border-gray-300">
          <div className="lg:mt-auto  ">
            <button
              className="p-2 bg-gray-900 text-white grid gap-1"
              onClick={() =>
                setState((state) => ({
                  ...state,
                  controls: { ...state.contorls, showNavigation: true },
                }))
              }
            >
              <div className="bg-white h-[2px] w-5"></div>
              <div className="bg-white h-[2px] w-5"></div>
              <div className="bg-white h-[2px] w-5"></div>
            </button>
          </div>
          <div className="lg:flex-1 grid gap-2">
            <button
              className="bg-gray-900 max-w-max mx-auto px-8 py-3 uppercase text-white text-xs flex justify-center items-center gap-2 "
              onClick={showPreview}
            >
              <FaCartArrowDown className="text-xl" />
              <span>add to cart</span>
            </button>
            <CustomLink
              target="_blank"
              href="/contact"
              text="Got a logo? send us your details"
              className="font-semibold text-center hidden lg:block"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;


const BackingBtn = ({ title, text, value, price = 0 }) => {

  const [state, setState] = useNeonBuilderContext(); 
  const selected = value === state.data.backing; 


  return (
    <button
      className={`flex items-center justify-between  p-3  gap-2 ${
        selected ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
      onClick={() =>
        setState((state) => ({
          ...state,
          data: { ...state.data, backing: value, price:  {...state.data.price, backing: price}},
        }))
      }
    >
      <div className="flex-1 text-left">
        <h3 className="uppercase font-semibold">{title}</h3>
        <p className={` text-sm`}>
          {text}
        </p>
      </div>
      <p
        className={`py-1 px-2 transition font-semibold text-lg transition ${
          selected ? "bg-white text-black" : "bg-gray-400 text-white"
        }`}
      >
        ${Number(price).toFixed(2)}
      </p>
    </button>
  );
};




const LocationBtn = ({type}) => {
const [state, setState] = useNeonBuilderContext();
const selected = state.data.installLocation === type;

  return (
    <button
      className={`p-2  transition uppercase ${
        selected
          ? "bg-gray-900 text-white"
          : "bg-white black"
      }`}
      onClick={() =>
        setState((state) => ({
          ...state,
          data: { ...state.data, installLocation: type },
        }))
      }
    >
      {type}
    </button>
  );
}

const MountBtn = ({ type }) => {
  const [state, setState] = useNeonBuilderContext();
  const selected = state.data.mountType === type;

  return (
    <button
      className={`p-2  transition uppercase ${
        selected ? "bg-gray-900 text-white" : "bg-white black"
      }`}
      onClick={() =>
        setState((state) => ({
          ...state,
          data: { ...state.data, mountType: type },
        }))
      }
    >
      {type}
    </button>
  );
};