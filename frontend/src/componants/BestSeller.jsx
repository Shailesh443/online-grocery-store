import ProductCard from "./ProductCard";
import { useAppContext } from "../context/useAppContext";

const BestSeller = () => {
  const { products } = useAppContext();

  return (
    <div className="mt-16">
      <p className="text-2xl font-medium md:text-3xl">Best Sellers</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
        {products.length > 0 ? (
          products
            .filter((product) => product.inStock)
            .slice(0, 5)
            .map((product) => <ProductCard key={product._id} product={product} />)
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
