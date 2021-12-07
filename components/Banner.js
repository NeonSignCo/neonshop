import { motion } from 'framer-motion';
import { FaDollarSign, FaTimes } from 'react-icons/fa'
import { useGlobalContext } from '../context/GlobalContext';

const Banner = () => {
    const [, setState] = useGlobalContext();


    const closeBanner = () => {
        localStorage.setItem('showBanner', false);
        setState(state => ({ ...state, showBanner: false }));
    }

    return (
      <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="bg-gray-900 p-2 flex">
        <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-y-1 text-white font-semibold text-xs md:text-base">
          <div className="flex items-center justify-center">
            <FaDollarSign className="text-green-500" />
            <span className="uppercase">free shipping! </span>
          </div>
          <div className="flex items-center text-center">
            <span className="mx-2 hidden sm:inline-block">|</span>$100 OFF Neon Signal
            Code:TREAT-YOSELF
          </div>
        </div>
        <button className="text-white sm:px-2 text-gray-400" onClick={closeBanner}>
          {" "}
          <FaTimes />
        </button>
      </motion.div>
    );
}

export default Banner
