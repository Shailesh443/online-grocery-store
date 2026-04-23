 import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/useAppContext';
import toast from 'react-hot-toast';

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, setUser, setShowUserLogin, setSearchQuery, searchQuery, getCartCount, axios, setToken } = useAppContext();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data } = await axios.get('/api/user/logout');
      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      if (error.response?.status !== 401) {
        toast.error(error.message);
      }
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      navigate('/products');
    }
  }, [navigate, searchQuery]);

  const openOrders = () => {
    setOpen(false);
    navigate('/my-orders');
  };

  return (
    <nav className="relative flex items-center justify-between border-b border-gray-300 bg-white px-6 py-4 md:px-16 lg:px-24 xl:px-32">
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img className="h-9" src={assets.logo} alt="logo" />
      </NavLink>

      <div className="hidden items-center gap-8 sm:flex">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Products</NavLink>
        <button type="button" onClick={openOrders}>My Orders</button>

        <div className="hidden items-center gap-2 rounded-full border border-gray-300 px-3 text-sm lg:flex">
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full bg-transparent py-1.5 outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="h-4 w-4" />
        </div>

        <button type="button" onClick={() => navigate('/cart')} className="relative cursor-pointer">
          <img src={assets.cart_icon} alt="cart" className="w-5 opacity-80" />
          <span className="absolute -right-3 -top-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-indigo-500 text-xs text-white">
            {getCartCount()}
          </span>
        </button>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer rounded-full bg-indigo-500 px-8 py-2 text-white hover:bg-indigo-600"
          >
            Login
          </button>
        ) : (
          <div className="group relative">
            <img src={assets.profile_icon} className="w-10 cursor-pointer" alt="profile" />
            <ul className="absolute right-0 top-full z-40 mt-2 hidden w-40 flex-col rounded-md bg-white py-2 text-sm shadow-md group-hover:flex">
              <li onClick={openOrders} className="cursor-pointer p-2 hover:bg-gray-100">My Orders</li>
              <li onClick={logout} className="cursor-pointer p-2 hover:bg-gray-100 text-red-500">Logout</li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 sm:hidden">
        <button type="button" onClick={() => navigate('/cart')} className="relative cursor-pointer">
          <img src={assets.cart_icon} alt="cart" className="w-5 opacity-80" />
          <span className="absolute -right-3 -top-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-indigo-500 text-xs text-white">
            {getCartCount()}
          </span>
        </button>
        <button type="button" onClick={() => setOpen((current) => !current)}>
          <img src={assets.menu_icon} alt="menu" className="w-6" />
        </button>
      </div>

      {open && (
        <div className="absolute left-0 top-[60px] flex w-full flex-col gap-3 bg-white px-5 py-4 text-sm shadow-md sm:hidden z-50">
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>
          <NavLink to="/my-orders" onClick={() => setOpen(false)}>My Orders</NavLink>
          {!user ? (
            <button
              onClick={() => { setOpen(false); setShowUserLogin(true); }}
              className="rounded-full bg-indigo-500 px-6 py-2 text-white"
            >
              Login
            </button>
          ) : (
            <button onClick={logout} className="rounded-full bg-red-500 px-6 py-2 text-white">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
