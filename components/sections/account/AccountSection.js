import dynamic from "next/dynamic";
import {
  FaBoxOpen,
  FaChevronRight,
  FaHome,
  FaLock,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import {
  MY_ORDERS,
  ACCOUNT_DETAILS,
  CHANGE_PASSWORD,
  ADDRESS,
  useACcountContext,
} from "../../../pages/account";

const MyOrdersSection = dynamic(() => import("./sections/MyOrdersSection"));
const AccountDetailsSection = dynamic(() =>
  import("./sections/AccountDetailsSection")
);
const ChangePasswordSection = dynamic(() =>
  import("./sections/ChangePasswordSection")
);
const AddressSection = dynamic(() => import("./sections/AddressSection"));

const AccountSection = () => {
  const [state] = useACcountContext();
  return (
    <div className=" py-12 flex flex-col min-h-screen bg-[#f1f2f6]">
      <div className="px-5 lg:px-20">
        <h1 className="text-3xl capitalize">My account</h1>
        <MobileOptions />
      </div>
      <div className="flex-1 flex gap-10 mt-10 bg-white px-5 lg:px-20 py-10">
        <DesktopSideBar />
        {state.activeSection === MY_ORDERS ? (
          <MyOrdersSection />
        ) : state.activeSection === ACCOUNT_DETAILS ? (
          <AccountDetailsSection />
        ) : state.activeSection === CHANGE_PASSWORD ? (
          <ChangePasswordSection />
        ) : (
          state.activeSection === ADDRESS && <AddressSection />
        )}
      </div>
    </div>
  );
};

export default AccountSection;

const DesktopSideBar = () => {
  const [state, setState] = useACcountContext();
  const Item = ({ text, children, section }) => {
    return (
      <button
        className={`flex items-center justify-between gap-16 ml-2 transition p-3 capitalize whitespace-nowrap group ${
          state.activeSection === section ? "bg-gray-200" : "hover:bg-gray-200"
        }`}
        onClick={() =>
          setState((state) => ({ ...state, activeSection: section }))
        }
      >
        <div className="flex items-center gap-2">
          {children}
          <span>{text}</span>
        </div>
        <FaChevronRight
          className={`text-gray-300 transition ${
            state.activeSection === section
              ? "text-gray-500"
              : " group-hover:text-gray-500"
          }`}
        />
      </button>
    );
  };

  return (
    <div className="hidden md:flex flex-col text-gray-700 bg-white">
      <p className="text-xl font-semibold whitespace-nowrap mb-5">
        Welcome, John Doe
      </p>
      <Item text="orders" section={MY_ORDERS}>
        <FaBoxOpen className="text-2xl" />
      </Item>
      <Item text="account details" section={ACCOUNT_DETAILS}>
        <FaUser className="text-2xl" />
      </Item>
      <Item text="change password" section={CHANGE_PASSWORD}>
        <FaLock className="text-2xl" />
      </Item>
      <Item text="addresses" section={ADDRESS}>
        <FaHome className="text-2xl" />
      </Item>
      <button className="flex items-center justify-between gap-16 ml-2 transition hover:bg-gray-200 p-3 capitalize whitespace-nowrap group"
        
      >
        <div className="flex items-center gap-2">
          <FaSignOutAlt className="text-2xl" />
          <span>log out</span>
        </div>
        <FaChevronRight className="text-gray-300 transition group-hover:text-gray-500" />
      </button>
    </div>
  );
};

const MobileOptions = () => {
  const [state, setState] = useACcountContext();
  const Item = ({ text, children, section }) => {
    return (
      <button
        className={`transition capitalize whitespace-nowrap ${
          state.activeSection === section ? "font-semibold" : ""
        }`}
        onClick={() =>
          setState((state) => ({ ...state, activeSection: section }))
        }
      >
        <div className="flex items-center gap-2">
          <span>{text}</span>
        </div>
      </button>
    );
  };
  return (
    <div className="md:hidden mt-5 flex gap-5 flex-wrap items-center">
      <Item text="orders" section={MY_ORDERS}></Item>
      <Item text="persnal data" section={ACCOUNT_DETAILS}></Item>
      <Item text="change password" section={CHANGE_PASSWORD}></Item>
      <Item text="addresses" section={ADDRESS}></Item>
    </div>
  );
};
