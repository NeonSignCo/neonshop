import { useEffect, useRef } from "react"
import { BsSearch, BsX } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

const SearchBar = ({expand, toggleSearchBar}) => {
    
    const ref = useRef();

    // focus input on expanding searchBar
    useEffect(() => {
        expand && ref.current.focus();
        return () => { };
    }, [expand])
  
  
  useEffect(() => {
    const listener = (e) => e.key === 'Escape' && toggleSearchBar();

    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [])
    return (
      <div className="relative">
        <button className="mt-2.5 text-lg" onClick={toggleSearchBar}>
          <BsSearch />
        </button>
        <AnimatePresence>
          {expand && (
            <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: .2}}}>
              <input
                ref={ref}
                type="text"
                placeholder="Search here..."
                className="pl-2 pr-5 py-1 absolute right-0 top-0 outline-none text-black w-72 bg-white border-b border-gray-500 text-lg"
              />
              
              <button
                className="absolute right-0 text-black top-[7px] transition hover:scale-125"
                onClick={toggleSearchBar}
              >
                <BsX />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
}

export default SearchBar
