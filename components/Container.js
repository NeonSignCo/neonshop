
import Footer from "./Footer";
import Nav from "./nav/Nav";
import { useRouter } from "next/router";
import { useGlobalContext } from "../context/GlobalContext";
import ModalContainer from "./models/ModalContainer";
import { AnimatePresence } from "framer-motion";

const Container = ({ children }) => {
    const route = useRouter().route;
    const [state] = useGlobalContext();

  
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <Nav />
        <div>
          <div className="max-w-screen-2xl mx-auto pt-[66px]">{children}</div>
        </div> 
        <AnimatePresence>
          {state.modal?.show && <ModalContainer/> }
        </AnimatePresence>        
        {route !== "/custom-neon-sign" && <Footer />}
      </div>
    );
}

export default Container
