 /* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const AppContext = createContext(null);

// Axios setup
axios.defaults.withCredentials = true;

const envUrl = import.meta.env.VITE_BACKEND_URL;

axios.defaults.baseURL = envUrl ? envUrl.replace(/['"]/g, "").trim().replace(/\/+$/, "") : "";

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const currency = import.meta.env.VITE_CURRENCY?.trim() || "$";

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);

  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  // ---------------- SELLER CHECK ----------------
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(!!data?.success);
    } catch {
      setIsSeller(false);
    }
  };


  // user 



  const fetchUser = async () => {
  try {
    const { data } = await axios.get("/api/user/is-auth");

    if (data?.success) {
      setUser(data.user || null);
      setCartItems(data.user?.cartItems || {});
    } else {
      setUser(null);
      setCartItems({});
    }
  } catch {
    setUser(null);
    setCartItems({});
  }
};

  // ---------------- PRODUCTS (OPTION 2 FIX) ----------------
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");

      if (data?.success) {
        setProducts(data.products || []);
      } else {
        toast.error(data?.message || "Failed to load products");
        setProducts([]);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Server error while loading products"
      );

      // fallback
      setProducts([]);
    }
  };

  // ---------------- CART ----------------
  const addToCart = (itemId) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    setCartItems(cartData);
    toast.success("Added to cart");
  };

  const updateCartItem = (itemId, quantity) => {
    const cartData = structuredClone(cartItems);

    if (quantity <= 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }

    setCartItems(cartData);
    toast.success("Cart updated");
  };

  const removeFromCart = (itemId) => {
    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] -= 1;

      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }
    }

    setCartItems(cartData);
    toast.success("Removed from cart");
  };

  // ---------------- CART COUNT ----------------
  const getCartCount = () =>
    Object.values(cartItems).reduce((count, qty) => count + qty, 0);

  // ---------------- CART AMOUNT ----------------
  const getCartAmount = () => {
    if (!products.length) return 0;

    let total = 0;

    for (const [itemId, qty] of Object.entries(cartItems)) {
      const product = products.find((p) => p._id === itemId);

      if (product && qty > 0) {
        total += (product.offerPrice || 0) * qty;
      }
    }

    return Math.round(total * 100) / 100;
  };

  // ---------------- INIT ----------------
  useEffect(() => {
    const loadData = async () => {
      await fetchSeller();
      await fetchProducts();
      await fetchUser();
    };

    loadData();
  }, []);
  //updatedatabascaditem

 useEffect(() => {
  const updateCart = async () => {
    try {
      const { data } = await axios.post("/api/cart/update", { cartItems });

      if (!data.success) {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (user) {
    updateCart();
  }
}, [cartItems, user]);
   

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,

    products,
    currency,

    addToCart,
    updateCartItem,
    removeFromCart,

    cartItems,
    searchQuery,
    setSearchQuery,

    getCartAmount,
    getCartCount,

    axios,
    fetchProducts, setCartItems
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);