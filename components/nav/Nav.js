import { useEffect, useRef, useState } from "react";
import {
  FaCaretUp,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUserCircle,
  FaUserPlus,
  FaUserShield,
} from "react-icons/fa";
import { ERROR, SUCCESS, useGlobalContext } from "../../context/GlobalContext";
import CustomLink from "../CustomLink";
import SearchBar from "../SearchBar";
import DropDown from "./DropDown";
import MobileMenu from "./MobileMenu";
import Banner from "../Banner";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Axios from "../../utils/Axios";
import { Loader } from "../LoadingBtn";

const Nav = () => {
  const [globalState, setGlobalState] = useGlobalContext();
  const searchRef = useRef();
  const dropDownRef = useRef();
  const optionRef = useRef();
  const [state, setState] = useState({
    showMobileMenu: false,
  });
  
  return (
    <div className="bg-black text-white sticky  top-0 w-full shadow z-20 ">
      <AnimatePresence>{globalState.showBanner && <Banner />}</AnimatePresence>
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
            />
          </div>
          <CustomLink href="/about" text="about" />
          <CustomLink href="/contact" text="contact" />
        </div>
        <div className="flex items-center gap-4 capitalize text-xl md:text-2xl">
          <div ref={optionRef}>
            <AccountBtn containerRef={optionRef} />
          </div>
          <button
            className="relative"
            onClick={() =>
              setGlobalState((state) => ({
                ...state,
               cartData: {...state.cartData, show: true}
              }))
            }
          >
            <FaShoppingBag />
            <span className="absolute left-0 top-[13px] h-4 w-4 rounded-full bg-gray-800 flex items-center justify-center text-sm">
              {globalState.cartData.cart?.items?.length > 9
                ? "9+"
                : globalState.cartData.cart?.items?.length || 0}
            </span>
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
};

export default Nav;

const AccountBtn = ({ containerRef }) => {
  const Router = useRouter();
  const [globalState, setGlobalState] = useGlobalContext();
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    // only close dropdown if clicked outside
    const listener = (e) => {
      e.target !== containerRef.current &&
        !containerRef.current.contains(e.target) &&
        setExpand(false);
    };
    window.addEventListener("mousedown", listener);

    return () => window.removeEventListener("mousedown", listener);
  }, []);

  const logout = async () => {
    try {
      await Axios.put("/users/logout");

      // update state
      setGlobalState((state) => ({
        ...state,
        auth: { ...state.auth, loading: false, user: null },
        cartData: {...state.cartData, cart: []},
        alert: {
          ...state.alert,
          show: true,
          text: "logged out",
          type: SUCCESS,
          timeout: 3000,
        },
      }));
      setExpand(false);

      // go to login page
      Router.push("/login");
    } catch (error) {
      setGlobalState((state) => ({
        ...state,
        alert: {
          ...state.alert,
          show: true,
          type: ERROR,
          timeout: 5000,
          text:
            error.response?.data?.message || error.message || "Network Error",
        },
      }));
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setExpand((bool) => !bool)}>
        <FaUserCircle />
      </button>
      {expand && (
        <div className="absolute top-[58px] p-4 bg-black text-white capitalize text-base rounded border border-gray-800">
          <FaCaretUp className="absolute -top-4 left-1 text-2xl text-black " />
          {globalState.auth?.loading ? (
            <Loader />
          ) : globalState.auth?.user ? (
            <div className="grid">
              {globalState.auth?.user?.role === "ADMIN" && (
                <CustomLink
                  href="/admin"
                  className="p-2 transition hover:bg-gray-800 flex gap-2 items-center justify-center"
                  onClick={() => setExpand(false)}
                >
                  <FaUserShield />
                  <span>admin</span>
                </CustomLink>
              )}
              <CustomLink
                href="/account"
                className="p-2 transition hover:bg-gray-800 flex gap-2 items-center justify-center"
                onClick={() => setExpand(false)}
              >
                <FaUser />
                <span>account</span>
              </CustomLink>
              <button
                className="flex items-center gap-2 p-2 transition hover:bg-gray-800"
                onClick={logout}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="grid">
              <CustomLink
                href="/login"
                className="flex items-center gap-2 p-2 transition hover:bg-gray-800"
                onClick={() => setExpand(false)}
              >
                <FaSignInAlt />
                <span>Login</span>
              </CustomLink>
              <CustomLink
                href="/signup"
                className="flex items-center gap-2 p-2 transition hover:bg-gray-800 whitespace-nowrap"
                onClick={() => setExpand(false)}
              >
                <FaUserPlus />
                <span>Sign up</span>
              </CustomLink>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
