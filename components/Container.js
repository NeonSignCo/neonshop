
import Footer from "./Footer";
import Nav from "./nav/Nav";
import { useRouter } from "next/router";
import { useGlobalContext } from "../context/GlobalContext";
import ModalContainer from "./modals/ModalContainer";
import { AnimatePresence } from "framer-motion";
import CartPreview from "./CartPreview";
import Backdrop from "./Backdrop";
import Alert from "./Alert";
import { useEffect } from "react";

const Container = ({ children }) => {
  const [, setGlobalState] = useGlobalContext();
  const Router = useRouter();  
  const route = Router.route;
    const [state] = useGlobalContext();
  
  // show alert message through query string
  useEffect(() => {
    if (!Router.query.text) return; 
    setGlobalState(state => ({ ...state, alert: { show: true, text: Router.query.text, type: Router.query.type, timeout: Router.query.timeout || 5000 } }));

    return () => { };
  }, [Router.query.text])
  
    return (
      <>
        <div
          className={`flex flex-col justify-between  ${
            state.modal.show
              ? "w-screen h-screen fixed"
              : state.showCart
              ? "w-screen h-screen fixed"
              : state.showMobileMenu
              ? "w-screen h-screen fixed"
              : "min-h-screen"
          }`}
        >
          {route !== "/checkout" && route !== "/admin" && <Nav />}
          <div>
            <div className="max-w-screen-2xl mx-auto">
              {state.error ? (
                <div className="py-40 text-red-500 text-4xl text-center">
                  {state.error.message}
                </div>
              ) : (
                children
              )}
            </div>
          </div>
          {route !== "/custom-neon-sign" &&
            route !== "/checkout" &&
            route !== "/admin" && <Footer />}
        </div>
        {<AnimatePresence>{state.alert.show && <Alert />}</AnimatePresence>}

        <AnimatePresence>
          {state.modal?.show && <ModalContainer />}
        </AnimatePresence>
        <AnimatePresence>
          {state.cartData.show && <CartPreview />}
        </AnimatePresence>
        <AnimatePresence>
          {state.modal.show ? (
            <Backdrop />
          ) : (
            state.cartData.show && <Backdrop />
          )}
        </AnimatePresence>
      </>
    );
}

export default Container
