import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/useAppContext";
import toast from "react-hot-toast";
import axios from "axios";

const InputField = ({ type, placeholder, name, handleChange, address }) => {
  return (
    <input
      className="w-full rounded border border-gray-300 px-3 py-2 text-gray-600 outline-none transition focus:border-green-500"
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      name={name}
      value={address[name]}
      required
    />
  );
};

const AddAddress = () => {
  const { user, navigate } = useAppContext(); // ❌ removed axios from here

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/address/add", { address });

      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart"); // ❌ fixed extra space bug
    }
  }, [user, navigate]);

  return (
    <div className="mt-16 px-6 pb-16 md:px-16">
      <p className="text-2xl text-gray-500 md:text-3xl">
        Add Shipping <span className="font-semibold text-green-500">Address</span>
      </p>

      <div className="mt-10 flex flex-col-reverse justify-between gap-10 md:flex-row">
        <div className="max-w-md flex-1">
          <form onSubmit={onSubmitHandler} className="mt-6 space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField name="firstName" type="text" placeholder="First Name" handleChange={handleChange} address={address} />
              <InputField name="lastName" type="text" placeholder="Last Name" handleChange={handleChange} address={address} />
            </div>

            <InputField name="email" type="email" placeholder="Email Address" handleChange={handleChange} address={address} />
            <InputField name="street" type="text" placeholder="Street Address" handleChange={handleChange} address={address} />

            <div className="grid grid-cols-2 gap-4">
              <InputField name="city" type="text" placeholder="City" handleChange={handleChange} address={address} />
              <InputField name="state" type="text" placeholder="State" handleChange={handleChange} address={address} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField name="zipcode" type="text" placeholder="Zip Code" handleChange={handleChange} address={address} />
              <InputField name="country" type="text" placeholder="Country" handleChange={handleChange} address={address} />
            </div>

            <InputField name="phone" type="text" placeholder="Phone Number" handleChange={handleChange} address={address} />

            <button
              type="submit"
              className="mt-4 w-full rounded bg-green-500 px-10 py-2.5 text-white transition hover:bg-green-600"
            >
              Save Address
            </button>
          </form>
        </div>

        <img
          className="mb-10 w-[300px] md:mr-16 md:mt-0"
          src={assets.add_address_image}
          alt="Add Address"
        />
      </div>
    </div>
  );
};

export default AddAddress;