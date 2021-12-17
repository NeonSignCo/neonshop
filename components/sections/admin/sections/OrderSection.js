import { motion } from "framer-motion";
import { useState } from "react"
import { FaPencilAlt, FaPencilRuler, FaSearch } from "react-icons/fa"
import { ORDERS, useAdminContext } from "../../../../pages/admin";
import CustomLink from "../../../CustomLink";

// variables 
const ORDERED = 'ORDERED'; 
const DELIVERED = 'DELIVERED'; 
const CANCELLED = 'CANCELLED';

const OrderSection = () => {
    const [adminState] = useAdminContext();

    const [state, setState] = useState({
      activeSection: ORDERED,
      orders: adminState.orders,
      selectedOrderIds: [],
    });
       
    return (
      <div className="py-5 md:p-10 w-full">
        <SearchBar />
        <div className="border mt-5">
          <div className=" grid grid-cols-3 bg-white text-gray-500 ">
            <button
              className={`text-center p-2 uppercase font-semibold transition ${
                state.activeSection === ORDERED ? "text-black " : ""
              }`}
              onClick={() =>
                setState((state) => ({ ...state, activeSection: ORDERED }))
              }
            >
              ordered (
              {state.orders.filter((i) => i.status === ORDERED)?.length || 0})
            </button>
            <button
              className={`text-center p-2 uppercase font-semibold transition ${
                state.activeSection === DELIVERED ? "text-black " : ""
              }`}
              onClick={() =>
                setState((state) => ({ ...state, activeSection: DELIVERED }))
              }
            >
              delivered (
              {state.orders.filter((i) => i.status === DELIVERED)?.length || 0})
            </button>
            <button
              className={`text-center p-2 uppercase font-semibold transition ${
                state.activeSection === CANCELLED ? "text-black " : ""
              }`}
              onClick={() =>
                setState((state) => ({ ...state, activeSection: CANCELLED }))
              }
            >
              cancelled (
              {state.orders.filter((i) => i.status === CANCELLED)?.length || 0})
            </button>
          </div>
          <div className="grid grid-cols-3 gap-10">
            {state.activeSection === ORDERED && (
              <motion.div
                layoutId="actiev-indicator"
                className="h-[2px] bg-purple-500"
              ></motion.div>
            )}
            {state.activeSection === DELIVERED && (
              <motion.div
                layoutId="actiev-indicator"
                className="h-[2px] bg-purple-500 col-start-2"
              ></motion.div>
            )}
            {state.activeSection === CANCELLED && (
              <motion.div
                layoutId="actiev-indicator"
                className="h-[2px] bg-purple-500 col-start-3"
              ></motion.div>
            )}
          </div>
        </div>
        <div className="hidden md:block">
          <table className="w-full bg-white">
            <thead className="h-12 border-b border-gray-200">
              <tr className="border border-gray-200">
                <th className="text-left pl-2">
                  <input
                    type="checkbox"
                    checked={state.orders
                      .filter((order) => order.status === state.activeSection)
                      ?.every((order) =>
                        state.selectedOrderIds.includes(order._id)
                      )}
                    onChange={(e) =>
                      setState((state) => ({
                        ...state,
                        selectedOrderIds: !e.target.checked
                          ? []
                          : state.orders
                              .filter(
                                (order) => order.status === state.activeSection
                              )
                              ?.map((order) => order._id),
                      }))
                    }
                  />
                </th>
                <th className="text-left">Date</th>
                <th className="text-left">Reference</th>
                <th className="text-left">Customer</th>
                <th className="text-left">Address</th>
                <th className="text-left">Nb items</th>
                <th className="text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {state.orders
                ?.filter((order) => order.status === state.activeSection)
                ?.map((order) => (
                  <TableItem
                    key={order._id}
                    order={order}
                    state={state}
                    setState={setState}
                  />
                ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden grid gap-3 text-black mt-5">
          {state.orders
            ?.filter((order) => order.status === state.activeSection)
            ?.map((order) => (
              <Item
                key={order._id}
                order={order}
                state={state}
                setState={setState}
              />
            ))}
        </div>
      </div>
    );
}

export default OrderSection




const TableItem = ({order, state, setState}) => {

  const checked = state.selectedOrderIds.includes(order._id);
  const toggleCheck = () =>
    setState((state) => ({
      ...state,
      selectedOrderIds: checked
        ? state.selectedOrderIds?.filter((id) => id !== order._id)
        : [...state.selectedOrderIds, order._id],
    }));
  
    return (
      <tr className="border border-gray-300">
        <td className="pl-2 p-2">
          <input type="checkbox" checked={checked} onChange={toggleCheck} />
        </td>
        <td className="uppercase">
          {new Date(order.date).toLocaleDateString()}{" "}
          {new Date(order.date).getHours() > 12
            ? new Date(order.date).getHours() - 12
            : new Date(order.date).getHours()}
          :
          {new Date(order.date).getMinutes() < 10
            ? `0${new Date(order.date).getMinutes()}`
            : new Date(order.date).getMinutes()}{" "}
          {new Date(order.date).getHours() > 12 ? "pm" : "am"}
        </td>
        <td>{order._id}</td>
        <td>
          <CustomLink href="/admin" className="flex items-center gap-2">
            <img
              src={order.user.photo}
              alt={order.user.name}
              className="h-7 w-7 rounded-full object-cover"
            />
            <p className="text-purple-700">{order.user.name}</p>
          </CustomLink>
        </td>
        <td>{order.address}</td>
        <td>{order.items.length}</td>
        <td className="font-semibold">$400</td>
        <td>
          <button className=" rounded-full h-7 w-7 flex items-center justify-center transition active:bg-gray-200 text-purple-600">
            <FaPencilAlt />
          </button>
        </td>
      </tr>
    );
}


const Item = ({order, state, setState}) => {
  

  return (
    <div className="p-2 bg-white border">
      <div className="mt-2 mb-5 flex items-center justify-between ">
        <p className="">
          <span className="capitalize text-2xl">order</span>: {order._id}
        </p>
        <button className="text-2xl text-purple-500">
          <FaPencilAlt />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-lg">Customer:</p>
        <CustomLink
          href="/admin"
          className="flex items-center gap-1 text-purple-500"
        >
          <img
            src={order.user.photo}
            alt={order.user.name}
            className="h-7 w-7 rounded-full"
          />
          <p>{order.user.name}</p>
        </CustomLink>
      </div>
      <p>
        <span className="text-lg">Date:</span>{" "}
        {new Date(order.date).toLocaleDateString()}{" "}
        {new Date(order.date).getHours() > 12
          ? new Date(order.date).getHours() - 12
          : new Date(order.date).getHours()}
        :
        {new Date(order.date).getMinutes() < 10
          ? `0${new Date(order.date).getMinutes()}`
          : new Date(order.date).getMinutes()}{" "}
        {new Date(order.date).getHours() > 12 ? "pm" : "am"}
      </p>
      <p>
        <span className="text-lg">Total:</span> $400
      </p>
      <p>
        <span className="text-lg">Status:</span>{" "}
        <span className="lowercase">{order.status}</span>
      </p>
    </div>
  );
}


const SearchBar = ({ setState }) => {
  const CUSTOMER_ID = 'CUSTOMER_ID'; 
  const ORDER_ID = 'ORDER_ID'; 
  const CUSTOMER_NAME = 'CUSTOMER_NAME';
  const [filter, setFilter] = useState({
    searchBy: ORDER_ID, 
    passedSince: '', 
    passedBefore: ''
  })
  
  return (
    <div className="grid gap-3">
      <div className="flex rounded border max-w-max overflow-hidden">
        <input
          type="text"
          placeholder="Search Order"
          className="p-2"
        />

        <button className="py-2 px-3 bg-gray-200">
          <FaSearch />
        </button>
      </div>
      <div className="flex gap-3 items-center flex-wrap">
        <div className="flex flex-col gap-1">
          <p className="capitalize">search by</p>
          <select className="bg-gray-100 p-2 bg-white border">
            <option value={ORDER_ID}>Order Id</option>
            <option value={CUSTOMER_ID}>Customer Id</option>
            <option value={CUSTOMER_NAME}>Customer Name</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <p className="capitalize">passed before</p>
          <input type="datetime-local" className="p-2 border" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="capitalize">passed since</p>
          <input type="datetime-local" className="p-2 border" />
        </div>
      </div>
    </div>
  );
};