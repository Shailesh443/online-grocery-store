 import { useState } from "react";
import { assets, categories } from "../../assets/assets";
import { useAppContext } from "../../context/useAppContext.jsx";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [files, setFiles] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const { axios } = useAppContext();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      const productData = {
        name,
        description: description ? description.split("\n") : [],
        category,
        price: Number(price),
        offerPrice: Number(offerPrice),
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));

      files.forEach((file) => {
        if (file) {
          formData.append("images", file);
        }
      });

      const { data } = await axios.post("/api/product/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data?.success) {
        toast.success(data.message || "Product Added ✅");

        // reset form
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([null, null, null, null]);
      } else {
        toast.error(data?.message || "Failed ❌");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Server Error ❌");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="p-5 space-y-4">

      {/* Images */}
      <div className="flex gap-3">
        {files.map((file, index) => (
          <label key={index} className="cursor-pointer">
            <input
              type="file"
              hidden
              onChange={(e) => {
                const updated = [...files];
                updated[index] = e.target.files[0];
                setFiles(updated);
              }}
            />

            <img
              src={file ? URL.createObjectURL(file) : assets.upload_area}
              className="w-20 h-20 object-cover border"
              alt="upload"
            />
          </label>
        ))}
      </div>

      {/* Name */}
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full"
        required
      />

      {/* Description */}
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full"
      />

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full"
        required
      >
        <option value="">Select Category</option>
        {categories?.map((item, index) => (
          <option key={index} value={item.path}>
            {item.path}
          </option>
        ))}
      </select>

      {/* Price */}
      <div className="flex gap-3">
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="number"
          placeholder="Offer Price"
          value={offerPrice}
          onChange={(e) => setOfferPrice(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-2 rounded"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;