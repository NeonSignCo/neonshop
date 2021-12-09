import {  FaChevronRight } from "react-icons/fa";
import { BsX } from 'react-icons/bs'
import { useNeonBuilderContext } from '../../../context/NeonBuilderContext';
import { motion } from 'framer-motion'

const Navigation = () => {
    
    const [, setState] = useNeonBuilderContext();
   
    return (
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0, transition: { duration: 0.2 } }}
        exit={{ y: "100%", transition: { duration: 0.2 } }}
        className="absolute inset-0 bg-white flex flex-col"
      >
        <button
          className="flex gap-2 items-center px-3 py-5 border-b capitalize text-xl "
          onClick={() =>
            setState((state) => ({
              ...state,
              controls: { ...state.controls, showNavigation: false },
            }))
          }
        >
          <BsX className="text-3xl" /> <span>all steps</span>
        </button>
        <Item title="Neon Text" text="this is the " number="1" target="text">
          <FaChevronRight />
        </Item>
        <Item title="Neon Font" text="font " number="2" target="font">
          <FaChevronRight />
        </Item>
        <Item title="Neon Color" text="white" number="3" target="color">
          <FaChevronRight />
        </Item>
        <Item title="Neon Size" text="Medium" number="4" target="size">
          <FaChevronRight />
        </Item>
        <Item
          title="Neon Backboard"
          text="cut to letter"
          number="5"
          target="backboard"
        >
          <FaChevronRight />
        </Item>
      </motion.div>
    );
}

export default Navigation



const Item = ({ children, title, text, number, target }) => {

    const [, setState] = useNeonBuilderContext();
    return (
      <button
        className="flex justify-between items-center px-3 border-b py-5"
            onClick={() => {
                setState((state) => ({
                  ...state,
                  controls: { ...state.controls, showNavigation: false },
                }));
                document.getElementById(target).scrollIntoView({behavior: 'smooth'})
        }}
      >
        <div className="flex items-center gap-2">
          <div className="text-3xl font-light">{number}</div>
          <div className=" text-left">
            <p className="font-semibold capitalize text-lg">{title}</p>
            <p className="text-sm">{text}</p>
          </div>
        </div>
        {children}
      </button>
    );
}