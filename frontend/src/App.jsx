 import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./componants/Navbar";
import Footer from "./componants/Footer";
import Login from "./componants/Login";
import SellerLogin from "./componants/Seller/SellerLogin";

import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";

import SellerLayout from "./pages/seller/SellerLayout";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";
import AddProduct from "./pages/seller/AddProduct";

import { useAppContext } from "./context/useAppContext";

const App = () => {
  const location = useLocation();
  const isSellerPath = location.pathname.startsWith("/seller");

  const { showUserLogin, isSeller } = useAppContext();

  return (
    <div className="min-h-screen bg-white text-gray-700">

      {!isSellerPath && <Navbar />}
      {showUserLogin && <Login />}
      <Toaster position="top-right" />

      <div className={isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}>

        <Routes>

          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/category/:category" element={<ProductCategory />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />

          {/* Auth */}
          <Route path="/seller-login" element={<SellerLogin />} />

          {/* Seller */}
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={<AddProduct />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>

        </Routes>

      </div>

      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;