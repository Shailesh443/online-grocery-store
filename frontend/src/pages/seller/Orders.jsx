import { assets, dummyOrders } from "../../assets/assets";
import { useAppContext } from "../../context/useAppContext";

const Orders = () => {
  const { currency } = useAppContext();

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="space-y-4 p-4 md:p-10">
        <h2 className="text-lg font-medium">Orders List</h2>

        {dummyOrders.map((order) => (
          <div
            key={order._id}
            className="flex max-w-4xl flex-col justify-between gap-5 rounded-md border border-gray-300 p-5 md:flex-row md:items-center"
          >
            <div className="flex max-w-80 gap-5">
              <img className="h-12 w-12 object-cover" src={assets.box_icon} alt="box icon" />
              <div>
                {order.items.map((item) => (
                  <div key={item._id} className="flex flex-col">
                    <p className="font-medium">
                      {item.product.name} <span className="text-primary">x {item.quantity}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm text-black/60 md:text-base">
              <p className="text-black/80">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>
                {order.address.street}, {order.address.city}
              </p>
              <p>
                {order.address.state}, {order.address.zipcode}, {order.address.country}
              </p>
              <p>{order.address.phone}</p>
            </div>

            <p className="my-auto text-lg font-medium">
              {currency}
              {order.amount}
            </p>

            <div className="flex flex-col text-sm">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
              <p>Status: {order.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
