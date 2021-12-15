import { useRef, useState } from "react";
import { FaShoppingBag, FaUserCircle } from "react-icons/fa";
import { useGlobalContext } from "../../context/GlobalContext";
import CustomLink from "../CustomLink";
import SearchBar from "../SearchBar";
import DropDown from "./DropDown";
import MobileMenu from "./MobileMenu";
import Banner from '../Banner';
import { AnimatePresence } from "framer-motion";

const Nav = () => {
  const [globalState, setGlobalState] = useGlobalContext();
  const searchRef = useRef();
  const dropDownRef = useRef();
    const [state, setState] = useState({
      showMobileMenu: false
    })
  
    return (
      <div className="bg-black text-white sticky top-0 w-full shadow z-20">
        <AnimatePresence>
          {globalState.showBanner && <Banner />}
        </AnimatePresence>
        <div className="py-4 px-5 lg:px-20 flex flex-wrap justify-center gap-3 xs:justify-between items-center">
          <CustomLink
            text="NeonShop"
            className="font-semibold text-2xl lg:text-3xl"
          />
          <div className="hidden lg:flex items-center gap-7 capitalize text-lg">
            <CustomLink href="/custom-neon-sign" text="design your neon" />
            <div ref={dropDownRef}>
              <DropDown
                containerRef={dropDownRef}
                title="shop neons"
                items={[
                  {
                    title: "explore",
                    links: [
                      { link: "/custom-neon-sign", text: "build your own" },
                      { text: "inspiration" },
                      { link: "/shop", text: "shop all" },
                    ],
                  },
                  {
                    title: "decoration",
                    links: [
                      { text: "aesthetic" },
                      { text: "inspirational" },
                      { text: "neon art" },
                      { text: "neon letters" },
                      { text: "neon lights" },
                      { text: "quotes" },
                      { text: "marvel comics" },
                      { text: "retro" },
                    ],
                  },
                  {
                    title: "occasion",
                    links: [
                      { text: "christmas" },
                      { text: "halloween" },
                      { text: "faith" },
                      { text: "party" },
                      { text: "wedding" },
                    ],
                  },
                  {
                    title: "location",
                    links: [
                      { text: "bar signs" },
                      { text: "gaming" },
                      { text: "home" },
                      { text: "kids home" },
                      { text: "man cave" },
                    ],
                  },
                ]}
              />
            </div>
            <CustomLink href="/about" text="about" />
            <CustomLink href="/contact" text="contact" />
          </div>
          <div className="flex items-center gap-4 capitalize text-xl md:text-2xl">
            <CustomLink>
              <FaUserCircle />
            </CustomLink>
            <button 
              className="relative"
              onClick={() =>
                setGlobalState((state) => ({
                  ...state,
                  showCart: true,
                }))
              }
            >
              <FaShoppingBag /> 
              <span className="absolute left-0 top-[13px] h-4 w-4 rounded-full bg-gray-800 flex items-center justify-center text-sm">{globalState.cart.items.length > 9 ? '9+': globalState.cart.items.length}</span>
            </button>
            <div ref={searchRef}>
              <SearchBar containerRef={searchRef} />
            </div>
            <button
              className="grid lg:hidden gap-1"
              onClick={() =>
                setState((state) => ({
                  ...state,
                  showMobileMenu: !state.showMobileMenu,
                }))
              }
            >
              <div
                className={`bg-white h-[2px] w-5 transition ${
                  state.showMobileMenu
                    ? "translate-y-[5.5px] rotate-45"
                    : "rotate-0"
                }`}
              ></div>
              <div
                className={`bg-white h-[2px] w-5 transition ${
                  state.showMobileMenu ? "hidden" : "block"
                }`}
              ></div>
              <div
                className={`bg-white h-[2px] w-5 transition ${
                  state.showMobileMenu ? "rotate-[-45deg]" : "rotate-0"
                }`}
              ></div>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {state.showMobileMenu && (
            <MobileMenu
              closeMenu={() =>
                setState((state) => ({ ...state, showMobileMenu: false }))
              }
            />
          )}
        </AnimatePresence>
      </div>
    );
}

export default Nav



