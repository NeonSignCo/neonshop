import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import CustomLink from "../CustomLink";

const DropDown = ({ title, items }) => {
  const [expand, setExpand] = useState(false);
    const ref = useRef();
    useEffect(() => {

        const listener = e => {e.target !== ref.current && e.target.id !== 'dropDownBtn' && setExpand(false)};
        window.addEventListener('mousedown', listener);
        
        return () => window.removeEventListener('mousedown', listener);
    }, [])
    
  return (
    <div className="relative">
      <button
        className="flex gap-1 capitalize"
        onClick={() => setExpand((bool) => !bool)}
      >
        <span ref={ref}>{title}</span>
        <FaCaretDown
          id="dropDownBtn"
          className={`mt-[7px] text-sm transition-all transform ${
            expand ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {expand && (
        <div className={`absolute w-full -bottom-3 transition-all`}>
          <motion.div
            initial={{  padding: 0, opacity: 0 }}
            animate={{ padding: '2rem', opacity: 1, transition: {duration: .2}}}
            className={`flex gap-20 absolute left-1/2 -translate-x-1/2 bg-gray-900 overflow-hidden`}
          >
            {items.map((item, i) => (
              <div key={i} className="">
                <h3 className="font-semibold mb-3 uppercase">{item.title}</h3>
                <div className="grid gap-1">
                  {item.links.map((link, i) => (
                    <CustomLink
                      key={i}
                      text={link.text}
                      className="text-base whitespace-nowrap transition hover:underline"
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
};


export default DropDown;
