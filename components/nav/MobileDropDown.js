import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import CustomLink from "../CustomLink";

const MobileDropDown = ({ title, items }) => {
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
         <div className={`grid gap-10 transition-all overflow-hidden origin-top ${expand ? "h-[1000px] mt-5": "h-0"}`}>
           {items.map((item, i) => (
             <div key={i} className="">
               <h3 className="font-semibold mb-2">{item.title}</h3>
               <div className="grid gap-1 capitalize">
                 {item.links.map((item, i) => (
                   <CustomLink key={i} text={item.text} />
                 ))}
               </div>
             </div>
           ))}
         </div>
       </div>
     );
}

export default MobileDropDown
