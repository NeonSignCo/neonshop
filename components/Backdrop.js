import { motion } from "framer-motion"
import { useGlobalContext } from '../context/GlobalContext';

const Backdrop = () => {
    const [, setState] = useGlobalContext();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: .7, transition: { duration: .3 } }}
            exit={{ opacity: 0, transition: { duration: .3 } }}
            className="fixed inset-0 bg-black"
            onClick={() => setState(state => ({ ...state, showCart: false }))}
      ></motion.div>
    );
}

export default Backdrop
