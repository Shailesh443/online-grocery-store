 import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/useAppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { axios } = useAppContext();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data } = await axios.post('/api/seller/logout');

      if (data.success) {
        toast.success(data.message);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-300 bg-white px-4 py-3 md:px-8">
        <Link to="/">
          <img src={assets.logo} alt="logo" className="w-32 cursor-pointer md:w-40" />
        </Link>

        <div className="flex items-center gap-5 font-medium text-gray-500">
          <p className="hidden sm:block">Hi! Admin</p>
          <button
            onClick={logout}
            className="cursor-pointer rounded-full border border-gray-300 px-5 py-1.5 text-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex">
        <aside className="flex h-[95vh] w-16 flex-col border-r border-gray-300 pt-4 text-base md:w-64">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center gap-3 border-r-[6px] px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "border-primary bg-primary/10 font-semibold text-primary"
                    : "border-transparent text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              <img src={item.icon} alt="" className="h-6 w-6 object-contain" />
              <p className="hidden md:block">{item.name}</p>
            </NavLink>
          ))}
        </aside>

        <main className="flex-1 bg-gray-50/30 p-4 md:p-8">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;