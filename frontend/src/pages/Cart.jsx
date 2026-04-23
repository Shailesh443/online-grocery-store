 import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { assets, dummyAddress } from "../assets/assets";
import { useAppContext } from "../context/useAppContext";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    user,
    setCartItems
  } = useAppContext();

  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [paymentOption, setPaymentOption] = useState("COD");

  const cartArray = useMemo(() => {
    return Object.entries(cartItems).reduce((items, [productId, quantity]) => {
      const product = products.find((item) => item._id === productId);
      if (product && quantity > 0) {
        items.push({ ...product, quantity });
      }
      return items;
    }, []);
  }, [cartItems, products]);

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address");
      }

     
//place order with cod
    if (paymentOption === "COD") {
        const { data } = await axios.post('/api/order/cod', { 
          userId: user._id,
          items: cartArray.map(item => ({ product: item._id, quantity: item.quantity })),
          address: selectedAddress._id
        });

        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate('/my-orders');
        } else {
          toast.error(data.message);
        }
      }  
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const totalAmount = getCartAmount();
  const tax = (totalAmount * 2) / 100;

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getUserAddress();
    }
  }, [user]);

  if (cartArray.length === 0) {
    return (
      <h2 className="mt-20 text-center text-xl font-medium">
        Your cart is empty.
      </h2>
    );
  }

  return (
    <div className="mt-16 flex flex-col md:flex-row">
      <div className="max-w-4xl flex-1">
        <h1 className="mb-6 text-3xl font-medium">
          Shopping Cart <span className="text-sm text-blue-600">{getCartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] pb-3 font-medium text-gray-500 border-b">
          <p>Product</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product) => (
          <div key={product._id} className="grid grid-cols-[2fr_1fr_1fr] items-center py-5 border-b">
            <div className="flex items-center gap-4">
              <img
                onClick={() => {
                  navigate(`/product/${product._id}`);
                  window.scrollTo(0, 0);
                }}
                src={product.image?.[0]}
                alt={product.name}
                className="h-20 w-20 cursor-pointer border object-cover rounded"
              />
              <div>
                <p className="font-semibold text-lg">{product.name}</p>
                <div className="flex items-center gap-2 mt-1">
                   <span className="text-sm text-gray-500">Qty:</span>
                   <select
                    className="border p-1 rounded bg-white text-sm"
                    value={product.quantity}
                    onChange={(e) => updateCartItem(product._id, Number(e.target.value))}
                   >
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                   </select>
                </div>
              </div>
            </div>
            <p className="text-center font-medium">{currency}{product.offerPrice * product.quantity}</p>
            <button onClick={() => removeFromCart(product._id)} className="mx-auto hover:scale-110 transition">
              <img src={assets.remove_icon} className="h-5 w-5" alt="remove" />
            </button>
          </div>
        ))}

        <button onClick={() => navigate("/products")} className="mt-6 text-blue-600 font-medium">
          ← Continue Shopping
        </button>
      </div>

      <div className="ml-0 mt-10 w-full max-w-[350px] bg-gray-50 p-6 md:ml-10 md:mt-0 rounded-lg shadow-sm border h-fit">
        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

        <div className="relative mb-6">
          <p className="text-sm font-semibold text-gray-700">Delivery Address</p>
          <p className="text-gray-500 text-sm mt-1 leading-relaxed">
            {selectedAddress
              ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}`
              : "No address selected"}
          </p>
          <button onClick={() => setShowAddress((prev) => !prev)} className="text-blue-600 text-xs mt-1 underline">
            Change Address
          </button>

          {showAddress && (
            <div className="absolute z-10 mt-2 w-full border bg-white max-h-48 overflow-y-auto shadow-xl rounded-md">
              {(addresses.length > 0 ? addresses : dummyAddress).map((item) => (
                <p
                  key={item._id}
                  onClick={() => {
                    setSelectedAddress(item);
                    setShowAddress(false);
                  }}
                  className="cursor-pointer p-3 hover:bg-blue-50 text-xs border-b last:border-0 transition"
                >
                  {item.street}, {item.city}, {item.state}
                </p>
              ))}
              <p
                onClick={() => navigate("/add-address")}
                className="cursor-pointer bg-gray-50 p-3 text-center text-blue-600 text-xs font-bold"
              >
                + Add New Address
              </p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700">Payment Method</p>
          <select
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
            className="mt-2 w-full border p-2 bg-white rounded-md text-sm outline-none focus:border-blue-500"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <div className="space-y-3 text-sm">
          <p className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{currency}{totalAmount}</span>
          </p>
          <p className="flex justify-between text-gray-600">
            <span>Tax (2%)</span>
            <span>{currency}{tax.toFixed(2)}</span>
          </p>
          <hr className="my-2" />
          <p className="flex justify-between font-bold text-lg text-gray-900">
            <span>Total</span>
            <span>{currency}{(totalAmount + tax).toFixed(2)}</span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="mt-8 w-full bg-blue-600 py-3 text-white font-bold rounded-md hover:bg-blue-700 active:scale-95 transition-all shadow-md"
        >
          {paymentOption === "COD" ? "PLACE ORDER (COD)" : "PROCEED TO PAYMENT"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
