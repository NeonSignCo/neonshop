import { FaAngleDoubleRight, FaChevronRight } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import { useNeonBuilderContext } from "../../../context/NeonBuilderContext";
import { motion } from "framer-motion";
import CustomLink from "../../CustomLink";
import { colors } from "../../../utils/CustomNeonAssets";

const Navigation = () => {
  const [state, setState] = useNeonBuilderContext();


  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0, transition: { duration: 0.2 } }}
      exit={{ y: "100%", transition: { duration: 0.2 } }}
      className="absolute inset-0 bg-white flex flex-col overflow-auto"
    >
      <button
        className="flex gap-2 items-center px-3 py-2 border-b capitalize text-lg transition hover:bg-gray-200"
        onClick={() =>
          setState((state) => ({
            ...state,
            controls: { ...state.controls, showNavigation: false },
          }))
        }
      >
        <BsX /> <span>all steps</span>
      </button>
      <Item title="Neon Text" text={state.data.text} number="1" target="text" />

      <Item title="Neon Font" text={state.data.font} number="2" target="font" />

      <Item
        title="Neon Color"
        text={colors.find((item) => item.hex === state.data.color)?.name}
        number="3"
        target="color"
      />

      <Item
        title="Neon Size"
        text={`${state.data.height || 0} x ${state.data.width || 0} (inches)`}
        number="4"
        target="size"
      />

      <Item
        title="Neon backing"
        text={state.data.backing === 'CUTTOLETTER' ? 'cut to letter': state.data.backing}
        number="5"
        target="backing"
      />
      <Item
        title="Install location"
        text={state.data.installLocation}
        number="6"
        target="install-location"
      />
      <Item
        title="Moun type"
        text={state.data.mountType}
        number="7"
        target="mount-type"
      />
      <Item
        title="Delivery time"
        text={state.data.deliveryTime}
        number="8"
        target="delivery-time"
      />
      <button className="flex justify-between items-center px-3 py-5 border-b capitalize font-semibold text-lg transition hover:bg-gray-200">
        <span>finish and create neon</span>
        <FaAngleDoubleRight />
      </button>
      <CustomLink
        target="_blank"
        href="/contact"
        text="Got a logo? send us your details"
        className="font-semibold text-center py-5"
      />
    </motion.div>
  );
};

export default Navigation;

const Item = ({ title, text, number, target }) => {
  const [, setState] = useNeonBuilderContext();
  return (
    <button
      className="flex justify-between items-center px-3 border-b py-2 transition hover:bg-gray-200"
      onClick={() => {
        setState((state) => ({
          ...state,
          controls: { ...state.controls, showNavigation: false },
        }));
        document.getElementById(target).scrollIntoView({ behavior: "smooth" });
      }}
    >
      <div className="flex items-center gap-2">
        <div className="text-xl font-light">{number}</div>
        <div className=" text-left">
          <p className="font-semibold capitalize">{title}</p>
          <p className="text-sm">{text}</p>
        </div>
      </div>
      <FaChevronRight/>
    </button>
  );
};
