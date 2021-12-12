import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import CustomLink from "../CustomLink";

const MobileDropDown = ({ title, items, closeMenu }) => {
    const [expand, setExpand] = useState(false);
     return (
       <div className="">
         <button
           className="w-full flex justify-between text-lg uppercase"
           onClick={() => setExpand((bool) => !bool)}
         >
           <span>{title}</span>{" "}
           <FaCaretDown
             className={`transition ${expand ? "rotate-180" : "rotate-0"}`}
           />
         </button>
         <AnimatePresence>
           {expand && (
             <motion.div
               initial={{ opacity: 0, height: 0 }}
               animate={{
                 opacity: 1,
                 height: "auto",
                 transition: { duration: 0.3 },
               }}
               exit={{ opacity: 0, height: 0, transition: { duration: 0.3 } }}
             >
               <div className="grid gap-4 overflow-hidden pt-4">
                 {items.map((item, i) => (
                   <div key={i} className="">
                     <h3 className="font-semibold">{item.title}</h3>
                     <div className="grid gap-2 capitalize">
                       {item.links.map((item, i) => (
                         <CustomLink
                           href={item.link}
                           key={i}
                           text={item.text}
                           onClick={closeMenu}
                         />
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
             </motion.div>
           )}
         </AnimatePresence>
       </div>
     );
}

export default MobileDropDown
