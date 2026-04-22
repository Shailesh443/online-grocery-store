import { dummyOrders } from "../assets/assets";
import { useAppContext } from "../context/useAppContext";

const MyOrders = () => {
  const { currency } = useAppContext();

  return (
    <div className="mt-16 px-6 pb-16 md:px-16">
      <div className="mb-8 flex w-max flex-col items-start">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="h-0.5 w-16 rounded-full bg-green-500"></div>
      </div>

      {dummyOrders.map((order) => (
        <div
          key={order._id}
          className="mb-8 max-w-4xl rounded-lg border border-gray-300 p-5"
        >
          <div className="mb-4 flex flex-wrap justify-between gap-2 text-gray-500">
            <p>OrderId: {order._id}</p>
            <p>Payment: {order.paymentType}</p>
            <p>
              Total Amount: {currency} {order.amount}
            </p>
          </div>

          {order.items.map((item) => (
            <div
              key={item._id}
              className="flex flex-col justify-between gap-4 py-4 md:flex-row md:items-center"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item?.product?.image?.[0] || ""}
                  alt={item?.product?.name || "product"}
                  className="h-16 w-16 rounded border object-cover"
                />

                <div>
                  <p className="text-lg font-medium">{item?.product?.name}</p>
                  <p className="text-sm text-gray-500">
                    Category: {item?.product?.category}
                  </p>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p>Quantity: {item.quantity}</p>
                <p>Status: {order.status}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="font-medium text-green-600">
                  Amount: {currency} {order.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
