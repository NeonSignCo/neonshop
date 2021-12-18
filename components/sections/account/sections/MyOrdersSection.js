import { useACcountContext } from "../../../../pages/account"

const MyOrdersSection = () => {

    const [state, setState] = useACcountContext();

    return (
        <div className="bg-white w-full">
            <h2 className="text-xl font-semibold capitalize">orders</h2>
            <div className="grid gap-10 mt-5">
                {state.orders?.length > 0 ? state.orders.map(order => <OrderItem key={order._id} order={order}/> ) : <div className="No orders yet!"></div> }
            </div>
        </div>
    )
}

export default MyOrdersSection


const OrderItem = ({ order }) => {
    

    return (
      <div className="flex flx-wrap gap-2 p-2 border border-gray-300">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex gap-1">
            {order.items?.map((item, i) => (
              <img
                key={i}
                src="/img/product-images/product-2.jpg"
                alt="product name"
                className="h-20 w-20 object-cover"
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 md:gap-10">
            <div className="grid">
              <p className="font-semibold capitalize">order number</p>
              <p>{order._id}</p>
            </div>
            <div className="grid">
              <p className="font-semibold capitalize">shipped date</p>
              <p>
                {order.shippedDate
                  ? new Date(order.shippedDate).toDateString()
                  : "not shipped yet"}
              </p>
            </div>
            <div className="grid">
              <p className="font-semibold capitalize">items</p>
              <p>{order.items.length}</p>
            </div>
            <div className="grid">
              <p className="font-semibold capitalize">total</p>
              <p>$500</p>
            </div>
            <div className="grid">
              <p className="font-semibold capitalize">status</p>
              <p
                className={`capitalize ${
                  order.status === "ORDERED"
                    ? "text-gray-500"
                    : order.status === "DELIVERED"
                    ? "text-green-500"
                    : order.status === "CANCELLED" && "text-red-500"
                } `}
              >
                {order.status === "ORDERED"
                  ? "processing"
                  : order.status === "DELIVERED"
                  ? "delivered"
                  : order.status === "CANCELLED" && "cancelled"}
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <button className=" border border-gray-300 p-2 uppercase font-semibold transition bg-gray-200 hover:bg-gray-300 whitespace-nowrap">
            view order
          </button>
        </div>
      </div>
    );
}