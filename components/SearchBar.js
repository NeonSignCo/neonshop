import { useEffect, useRef, useState } from "react"
import { BsSearch, BsX } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

const SearchBar = ({ containerRef }) => {
  const ref = useRef();
  const [expand, setExpand] = useState(false);


  // focus input on expanding searchBar
  useEffect(() => {
    expand && ref.current.focus();
    return () => {};
  }, [expand]);

  useEffect(() => {
    // only close searchbar if clicked outside
    const listener = (e) => {
      e.target !== containerRef.current &&
        !containerRef.current.contains(e.target) &&
        setExpand(false);
    };
    window.addEventListener("mousedown", listener);

    return () => window.removeEventListener("mousedown", listener);
  }, []);

  useEffect(() => {
    const listener = (e) => e.key === "Escape" && setExpand(false);

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);
  return (
    <div className="relative">
      <button className="mt-2.5 text-lg" onClick={() => setExpand(bool => !bool)}>
        <BsSearch />
      </button>
      <AnimatePresence>
        {expand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
          >
            <input
              ref={ref}
              type="text"
              placeholder="Search here..."
              className="pl-2 pr-5 py-1 absolute right-0 top-0 outline-none text-black w-72 bg-white border-b border-gray-500 text-lg"
            />

            <button
              className="absolute right-0 text-black top-[7px] transition hover:scale-125"
              onClick={() => setExpand(bool => !bool)}
            >
              <BsX />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar
