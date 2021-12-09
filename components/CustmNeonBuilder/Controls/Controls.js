import CustomLink from "../../CustomLink";
import { FaCartArrowDown } from "react-icons/fa";
import { colors, fonts, sizes } from "../../../utils/CustomNeonAssets";
import styles from "../../../public/styles/range.module.css";
import Navigation from './Navigation';
import { useNeonBuilderContext} from '../../../context/NeonBuilderContext'
import { AnimatePresence } from "framer-motion";


const Controls = () => {
  const [state, setState] = useNeonBuilderContext();
  return (
    <div className="bg-black p-5 ">
      <div className="flex flex-col gap-8 bg-white h-full relative overflow-hidden">
        <AnimatePresence>{state.controls.showNavigation && <Navigation />}</AnimatePresence>
        <div className="flex flex-col gap-10 p-5 overflow-auto" style={{scrollBehavior: 'smooth'}}>
          <div className="grid gap-2" id="text">
            <h2 className="text-center text-lg p-2">
              What would you like your neon to say?
            </h2>
            <textarea rows="5" className="border-4 p-1"></textarea>
          </div>
          <div className="grid gap-2" id="font">
            <h2 className="text-center text-lg p-2">
              Choose a font that suits your style
            </h2>
            <div className="grid gap-3 grid-cols-3 text-white">
              {fonts.map((font, i) => (
                <button className="py-3  bg-gray-900" key={i}>
                  font {i + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-2" id="color">
            <h2 className="text-center text-lg p-2">Pick your color</h2>
            <div className="grid gap-4 grid-cols-4 text-sm">
              {colors.map((color, i) => (
                <button
                  className=" capitalize  flex flex-col items-center gap-2 bg-gray-900 text-white p-2"
                  key={i}
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
            <div className="grid gap-3 grid-cols-3 text-white">
              {sizes.map((size, i) => (
                <button
                  className="py-3  bg-gray-900 flex flex-col gap-1 items-center capitalize"
                  key={i}
                >
                  <span>{size.text}</span>
                  <span>
                    {size.width} x {size.height}
                  </span>
                </button>
              ))}
            </div>
            <div className="grid gap-2" >
              <h2 className="text-center capitalize">
                custom size ({state.data.customSize}inch)
              </h2>
              <input
                type="range"
                className={`${styles["styled-range"]}`}
                min={state.settings.minSize}
                max={state.settings.maxSize}
                value={state.customSize}
                onChange={(e) =>
                  setState((state) => ({
                    ...state,
                    data: {...state.data, customSize: e.target.value,}
                  }))
                }
              />
            </div>
          </div>
          <div className="grid gap-2" id="backboard">
            <h2 className="text-center capitalize text-lg p-2">
              How your neon's backing is finished
            </h2>
            <button className="flex items-center justify-between bg-gray-900 text-white p-3  gap-2">
              <div className="flex-1 flex flex-col justify-center items-center flex-wrap">
                <h3 className="uppercase font-semibold">cut to letter</h3>
                <p>Acrylic backing the outlines the shape of the design</p>
              </div>
              <p className="py-1 px-2 bg-white text-black font-semibold text-lg">
                $0.00
              </p>
            </button>
            <button className="flex items-center justify-between bg-gray-900 text-white p-3  gap-2">
              <div className="flex-1 flex flex-col justify-center items-center flex-wrap">
                <h3 className="uppercase font-semibold">rectangle</h3>
                <p>Acrylic backing is rectangular behind the design</p>
              </div>
              <p className="py-1 px-2 bg-white text-black font-semibold text-lg">
                $0.00
              </p>
            </button>
            <button className="flex items-center justify-between bg-gray-900 text-white p-3  gap-2">
              <div className="flex-1 flex flex-col justify-center items-center flex-wrap">
                <h3 className="uppercase font-semibold">stand</h3>
                <p>Rectangle backing with removable acrylic stands </p>
              </div>
              <p className="py-1 px-2 bg-white text-black font-semibold text-lg">
                €44.12
              </p>
            </button>
            <button className="flex items-center justify-between bg-gray-900 text-white p-3  gap-2">
              <div className="flex-1 flex flex-col justify-center items-center flex-wrap">
                <h3 className="uppercase font-semibold">boxed</h3>
                <p>Free standing acrylic box </p>
              </div>
              <p className="py-1 px-2 bg-white text-black font-semibold text-lg">
                €97.07
              </p>
            </button>
          </div>
        </div>
        <div className="flex gap-2 p-4 bg-gray-300 border-t border-gray-300">
          <div className="mt-auto">
            <button
              className="p-2 bg-gray-900 text-white grid gap-1"
              onClick={() => setState(state => ({...state, controls: {...state.contorls, showNavigation: true}}))}
            >
              <div className="bg-white h-[2px] w-5"></div>
              <div className="bg-white h-[2px] w-5"></div>
              <div className="bg-white h-[2px] w-5"></div>
            </button>
          </div>
          <div className=" flex-1 text-center">
            <button className="bg-gray-900 max-w-max mx-auto px-8 py-3 uppercase text-white flex justify-center items-center gap-2 mb-2">
              <FaCartArrowDown className="text-3xl" />
              <span>add to cart</span>
            </button>
            <CustomLink
              target="_blank"
              href="/contact"
              text="Got a logo? send us your details"
              className="font-semibold text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
