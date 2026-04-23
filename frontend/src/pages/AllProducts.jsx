 import { useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/useAppContext";
import { assets } from "../assets/assets";

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();

  const filteredProducts = useMemo(() => {
    const q = (searchQuery || "").trim().toLowerCase();

    if (!q) return products;

    return products.filter((product) =>
      product.name?.toLowerCase().includes(q)
    );
  }, [products, searchQuery]);

  return (
    <div className="mt-16 flex flex-col">

      {/* HEADER */}
      <div className="flex w-max flex-col items-end">
        <p className="text-2xl font-medium uppercase">All products</p>
        <div className="h-0.5 w-16 rounded-full bg-primary"></div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">

        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center mt-10">
            <img src={assets.search_icon} alt="no products" className="w-16 opacity-50" />
            <p className="text-gray-500 mt-3">No products found</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default AllProducts;