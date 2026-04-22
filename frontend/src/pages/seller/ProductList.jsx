 import { useAppContext } from "../../context/useAppContext";
import toast from "react-hot-toast";

const ProductList = () => {
  const { products, currency, axios, fetchProducts } = useAppContext();

  // 🔥 Toggle Stock Function
  const toggleStockStatus = async (id, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", {
        id,
        inStock,
      });

      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex-col justify-between">
      <div className="w-full p-4 md:p-10">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>

        <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-md border border-gray-500/20 bg-white">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-900">
              <tr>
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">In Stock</th>
              </tr>
            </thead>

            <tbody className="text-gray-500">
              {products.map((product) => (
                <tr key={product._id} className="border-t">

                  {/* Product */}
                  <td className="flex items-center gap-3 px-4 py-3">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-14 border rounded"
                    />
                    <span>{product.name}</span>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3">{product.category}</td>

                  {/* Price */}
                  <td className="px-4 py-3">
                    {currency}
                    {product.offerPrice}
                  </td>

                  {/* Toggle Switch */}
                  <td className="px-4 py-3">
                    <label className="relative inline-flex cursor-pointer items-center">
                      
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={product.inStock}
                        onChange={() =>
                          toggleStockStatus(product._id, !product.inStock)
                        }
                      />

                      {/* Background */}
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition"></div>

                      {/* Circle */}
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>

                    </label>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;