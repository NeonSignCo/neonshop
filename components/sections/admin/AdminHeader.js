import { BsArrowClockwise, BsList } from "react-icons/bs"
import { useAdminContext } from "../../../pages/admin";
import CustomLink from "../../CustomLink"
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPowerOff } from 'react-icons/fa';

const AdminHeader = () => {

  const [state, setState] = useAdminContext();
  
  const [expand, setExpand] = useState();
    return (
      <div className="pl-2 pr-4 py-2 flex justify-between items-center bg-white border-b ">
        <button
          className={`transition h-10 w-10 rounded-full flex items-center justify-center active:bg-gray-200 ${
            state.sidebar.expand ? "rotate-180" : ""
          }`}
          onClick={() =>
            setState((state) => ({
              ...state,
              sidebar: { ...state.sidebar, expand: !state.sidebar.expand },
            }))
          }
        >
          <BsList className="text-2xl text-gray-800" />
        </button>
        <CustomLink text="NeonShop" className="text-3xl hidden  sm:block" />
        <div className="flex items-center gap-3">
          <button className="transition active:bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center">
            <BsArrowClockwise className="text-2xl" />
          </button>
          <div className="relative">
            <button
              className="flex items-center gap-1 rounded-full transition hover:bg-gray-100 active:bg-gray-200 py-1 px-2 rounded"
              onClick={() => setExpand((bool) => !bool)}
            >
              <img
                src="/img/client-images/client-5.jpg"
                alt="admin"
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className="capitalize">john doe</p>
            </button>
            <AnimatePresence>
              {expand && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, transition: {duration: .1} }}
                  exit={{ scale: 0 }} 
                  className=""
                >
                  <div className="absolute bg-white shadow border p-2 rounded">
                    <button className="flex gap-2 items-center px-5 py-3 bg-gray-100 hover:bg-gray-200 whitespace-nowrap">
                      <FaPowerOff /> 
                      <span>log out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
}

export default AdminHeader
