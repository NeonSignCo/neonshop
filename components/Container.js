
import Footer from "./Footer";
import Nav from "./nav/Nav";
import { useRouter } from "next/router";
import { useGlobalContext } from "../context/GlobalContext";
import ModalContainer from "./modals/ModalContainer";
import { AnimatePresence } from "framer-motion";
import CartPreview from "./CartPreview";
import Backdrop from "./Backdrop";

const Container = ({ children }) => {
    const route = useRouter().route;
    const [state] = useGlobalContext();

  
    return (
      <>
        <div
          className={`flex flex-col justify-between  ${
            state.modal.show
              ? "w-screen h-screen fixed"
              : state.showCart
              ? "w-screen h-screen fixed"
              : "min-h-screen"
          }`}
        >
          {route !== "/checkout" && route !== '/admin' && <Nav />}
          <div>
            <div className="max-w-screen-2xl mx-auto">{children}</div>
          </div>
          {route !== "/custom-neon-sign" && route !== '/checkout' &&  route !== '/admin' && <Footer />}
        </div>
        <AnimatePresence>
          {state.modal?.show && <ModalContainer />}
        </AnimatePresence>
        <AnimatePresence>{state.showCart && <CartPreview />}</AnimatePresence>
        <AnimatePresence>
          {state.modal.show ? <Backdrop /> : state.showCart && <Backdrop />}
        </AnimatePresence>
      </>
    );
}

export default Container
