import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../componants/ProductCard";
import { useAppContext } from "../context/useAppContext";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();
  const normalizedCategory = decodeURIComponent(category ?? "").toLowerCase();

  const searchCategory = useMemo(
    () => categories.find((item) => item.path.toLowerCase() === normalizedCategory),
    [normalizedCategory],
  );

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => product.category.toLowerCase() === normalizedCategory),
    [normalizedCategory, products],
  );

  return (
    <div className="mt-16 px-4">
      {searchCategory && (
        <div className="mb-8 flex w-max flex-col items-end">
          <p className="text-2xl font-medium">{searchCategory.text.toUpperCase()}</p>
          <div className="h-0.5 w-full rounded-full bg-primary"></div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
