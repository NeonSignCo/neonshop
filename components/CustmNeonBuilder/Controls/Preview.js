import { motion } from "framer-motion"
import { FaChevronLeft } from "react-icons/fa";
import { useGlobalContext } from "../../../context/GlobalContext";
import { useNeonBuilderContext } from "../../../context/NeonBuilderContext";

const Preview = () => { 
    const [state, setState] = useNeonBuilderContext(); 
    const [globalState] = useGlobalContext();
    const price = Object.values(state.data.price).reduce((a, b) => a + b);

    return (
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0, transition: { duration: 0.2 } }}
        exit={{ x: "100%", transition: { duration: 0.2 } }}
        className="absolute inset-0 bg-white flex flex-col "
      >
        <div className="p-2 border-b border-gray-200 ">
          <button
            className="bg-black max-w-max p-2 text-white"
            onClick={() =>
              setState((state) => ({
                ...state,
                controls: { ...state.controls, showPreview: false },
              }))
            }
          >
            <FaChevronLeft />
          </button>
        </div>
        <div className="flex flex-col overflow-hidden h-full gap-5">
          <div className="grid gap-3 overflow-auto flex-1 px-10">
            <h3 className="font-semibold text-center text-2xl md:text-4xl">
              {globalState.currencySign}
              <span className="italic">{Number(price).toFixed(2)}</span>
            </h3>
            <p className="text-2xl">Details:</p>
            <div className="grid gap-2">
              <div>
                <span className="font-semibold text-lg">text: </span>{" "}
                {state.data.text}
              </div>
              {state.data.icon.name && (
                <div className="flex gap-2 items-center">
                  <span className="font-semibold text-lg">icon:</span>
                  <img
                    src={`/img/neon-logos/${state.data.icon.link}`}
                    alt={state.data.icon.name}
                    className="h-20 bg-black"
                  />
                </div>
              )}
              <div>
                <span className="font-semibold text-lg">font: </span>{" "}
                {state.data.font}
              </div>
              <div>
                <span className="font-semibold text-lg">color: </span>{" "}
                {state.data.color}
              </div>
              <div>
                <span className="font-semibold text-lg">size: </span>{" "}
                {state.data.height} x {state.data.width} (inches)
              </div>
              <div>
                <span className="font-semibold text-lg">backing: </span>{" "}
                {state.data.backing}
              </div>
              <div>
                <span className="font-semibold text-lg">
                  Install Location:{" "}
                </span>{" "}
                {state.data.installLocation}
              </div>
              <div>
                <span className="font-semibold text-lg">Mount Type: </span>{" "}
                {state.data.mountType}
              </div>
              <div>
                <span className="font-semibold text-lg">deliveryTime: </span>{" "}
                {state.data.deliveryTime}
              </div>
            </div>
          </div>
          <div className="border-t py-2 border-t text-center">
            <button className="bg-black  text-white py-2 px-5 text-xl uppercase">
              add to cart
            </button>
          </div>
        </div>
      </motion.div>
    );
}

export default Preview
