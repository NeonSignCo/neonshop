import CustomLink from "../../CustomLink";
import { FaCartArrowDown } from "react-icons/fa";
import { colors, fonts } from "../../../utils/CustomNeonAssets";
import styles from "../../../public/styles/range.module.css";
import Navigation from "./Navigation";
import { BOXED, CUTTOLETTER, RECTANGLE, STAND, useNeonBuilderContext } from "../../../context/NeonBuilderContext";
import { AnimatePresence } from "framer-motion";
import { useGlobalContext } from "../../../context/GlobalContext";
import { CUSTOMNEONMODEL } from "../../models/ModalContainer";

const Controls = () => {
  const [state, setState] = useNeonBuilderContext();
  const [, setGlobalState] = useGlobalContext();

  return (
    <div className=" col-span-3 lg:col-span-1 row-span-4 lg:row-span-6 overflow-hidden md:p-5">
      <div className=" flex flex-col bg-gray-200 relative overflow-hidden h-full">
        <AnimatePresence>
          {state.controls.showNavigation && <Navigation />}
        </AnimatePresence>
        <div className="flex flex-col gap-8 p-5 overflow-auto">
          <div className="grid gap-2" id="text">
            <h2 className="text-center text-lg p-2">
              What would you like your neon to say?
            </h2>
            <textarea
              rows="3"
              className=" p-1 outline-none transition"
              placeholder="what's on your mind? "
              value={state.data.text}
              onChange={(e) =>
                setState((state) => ({
                  ...state,
                  data: { ...state.data, text: e.target.value },
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
          <div className="grid gap-2" id="size">
            <h2 className="text-center text-lg p-2 ">
              Select your size{" "}
              <span className="font-semibold">(in inches)</span>{" "}
            </h2>
            <div className="grid gap-3 ">
              <SizingBtn type="heightScale" />
              <SizingBtn type="width" />
            </div>
          </div>
          <div className="grid gap-2 " id="backing">
            <h2 className="text-center capitalize text-lg p-2">
              How your neon's backing is finished
            </h2>
            <BackingBtn
              title="cut to letter"
              text="Acrylic backing the outlines the shape of the design"
              value={CUTTOLETTER}
              price={0}
            />
            <BackingBtn
              title="rectangle"
              text="Acrylic backing is rectangular behind the design"
              value={RECTANGLE}
              price={0}
            />
            <BackingBtn
              title="stand"
              text="Rectangle backing with removable acrylic stands"
              value={STAND}
              price={44.12}
            />
            <BackingBtn
              title="boxed"
              text="Free standing acrylic box"
              value={BOXED}
              price={97.07}
            />
          </div>
          <div className="grid gap-2" id="install-location">
            <h2 className="text-center capitalize text-lg p-2">
              select your install location
            </h2>
            <div className="flex gap-2 uppercase">
              <LocationBtn type="indoor" />
              <LocationBtn type="outdoor" />
            </div>
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
                  data: { ...state.data, deliveryTime: e.target.vlaue },
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
              onClick={() =>
                setGlobalState((state) => ({
                  ...state,
                  modal: {
                    show: true,
                    type: CUSTOMNEONMODEL,
                    data: state.data,
                  },
                }))
              }
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
      className={`flex items-center justify-between  p-3  gap-2 transition ${
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
        <p className={`transition text-sm`}>
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


const SizingBtn = ({type}) => {
  
  const [state, setState] = useNeonBuilderContext(); 

  return (
    <div className="grid gap-2"> 
      <p className="text-xl">{type}({state.data.size[type].value})</p>
      <input
        type="range"
        className={`${styles["styled-range"]}`}
        min={state.data.size[type].min}
        max={state.data.size[type].max}
        step={0.01}
        value={state.data.size[type].value}
        onChange={(e) =>
          setState((state) => ({
            ...state,
            data: {
              ...state.data,
              size: {
                ...state.data.size, 
                [type]: {...state.data.size[type], value: e.target.value}
              },
            },
          }))
        }
      />
    </div>
  );
}



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