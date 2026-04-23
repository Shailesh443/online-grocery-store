import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/useAppContext";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios, setSellerToken } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("/api/seller/login", { email, password });

      if (data.success) {
        setSellerToken(data.token);
        localStorage.setItem("sellerToken", data.token);
        setIsSeller(true);
        navigate("/seller");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);

  if (isSeller) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="flex min-w-80 flex-col items-start gap-5 rounded-lg border border-gray-200 bg-white p-8 py-12 shadow-xl sm:min-w-96"
      >
        <p className="m-auto text-2xl font-medium text-gray-800">
          <span className="text-primary">Seller</span> Login
        </p>

        <div className="w-full">
          <p className="mb-1 text-sm font-medium text-gray-600">Email</p>
          <input
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-md border border-gray-300 p-2.5 outline-none transition-all focus:border-primary"
            required
          />
        </div>

        <div className="w-full">
          <p className="mb-1 text-sm font-medium text-gray-600">Password</p>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-md border border-gray-300 p-2.5 outline-none transition-all focus:border-primary"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-md bg-primary py-2.5 font-medium text-white shadow-md transition-all hover:bg-primary-dull active:scale-95"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SellerLogin;
