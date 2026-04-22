 import { useState } from "react";
import { useAppContext } from "../context/useAppContext";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin, setUser, navigate } = useAppContext();

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        `/api/user/${state}`,
        {
          name,
          email,
          password,
        }
      );

      if (data.success) {
        setUser(data.user);
        setShowUserLogin(false);
        navigate("/");
        toast.success("Success");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error.message ||
        "Server error"
      );
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/50"
    >
      <form
        onClick={(event) => event.stopPropagation()}
        onSubmit={onSubmitHandler}
        className="relative flex w-80 flex-col items-start gap-4 rounded-lg border border-gray-200 bg-white p-8 py-10 text-gray-500 shadow-xl sm:w-[352px]"
      >
        <button
          type="button"
          onClick={() => setShowUserLogin(false)}
          className="absolute right-3 top-3 text-lg"
        >
          ×
        </button>

        <p className="m-auto text-2xl font-medium">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Type here"
              className="mt-1 w-full rounded border border-gray-200 p-2 outline-primary"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Type here"
            className="mt-1 w-full rounded border border-gray-200 p-2 outline-primary"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Type here"
            className="mt-1 w-full rounded border border-gray-200 p-2 outline-primary"
            type="password"
            required
          />
        </div>

        {state === "register" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="cursor-pointer text-primary"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="cursor-pointer text-primary"
            >
              Click here
            </span>
          </p>
        )}

        <button className="w-full cursor-pointer rounded-md bg-primary py-2 text-white transition-all hover:bg-primary-dull">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;