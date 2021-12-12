
import Footer from "./Footer";
import Nav from "./nav/Nav";
import { useRouter } from "next/router";
import { useGlobalContext } from "../context/GlobalContext";
import ModalContainer from "./modals/ModalContainer";
import { AnimatePresence } from "framer-motion";

const Container = ({ children }) => {
    const route = useRouter().route;
    const [state] = useGlobalContext();

  
    return (
      <>  
        <div
          className={`flex flex-col justify-between  ${
            state.modal.show ? "h-screen fixed " : "min-h-screen"
          }`}
        >
          <Nav />
          <div>
            <div className="max-w-screen-2xl mx-auto pt-[66px]">{children}</div>
          </div>
          {route !== "/custom-neon-sign" && <Footer />}
        </div>
        <AnimatePresence>
          {state.modal?.show && <ModalContainer />}
        </AnimatePresence>
      </>
    );
}

export default Container
