import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../componants/ProductCard";
import { useAppContext } from "../context/useAppContext";
     

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();
  const [selectedImages, setSelectedImages] = useState({});

  const product = products.find((item) => item._id === id);

  const relatedProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    return products
      .filter((item) => item.category === product.category && item._id !== product._id)
      .slice(0, 5);
  }, [product, products]);

  const thumbnail = product ? selectedImages[product._id] ?? product.image[0] : null;

  if (!product) {
    return <p className="mt-10 text-center">Loading...</p>;
  }

  return (
    <div className="mt-12 px-4">
      <p>
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> /{" "}
        <Link to={`/category/${encodeURIComponent(product.category)}`}>{product.category}</Link> /{" "}
        <span className="text-primary">{product.name}</span>
      </p>

      <div className="mt-6 flex flex-col gap-16 md:flex-row">
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {product.image.map((image, index) => (
              <div
                key={`${product._id}-${index}`}
                onClick={() =>
                  setSelectedImages((prev) => ({
                    ...prev,
                    [product._id]: image,
                  }))
                }
                className="max-w-24 cursor-pointer rounded border border-gray-300"
              >
                <img src={image} alt={`${product.name} preview ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="max-w-96 overflow-hidden rounded border">
            <img src={thumbnail} alt={product.name} className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <img
                key={index}
                src={index < 4 ? assets.star_icon : assets.star_dull_icon}
                alt="rating star"
                className="w-4"
              />
            ))}
            <p className="ml-2">(4)</p>
          </div>

          <div className="mt-6">
            <p className="text-gray-400 line-through">
              MRP: {currency}
              {product.price}
            </p>
            <p className="text-2xl font-semibold">
              {currency}
              {product.offerPrice}
            </p>
            <p className="text-sm text-gray-500">(inclusive of all taxes)</p>
          </div>

          <p className="mt-6 font-medium">About Product</p>
          <ul className="ml-5 list-disc text-gray-600">
            {product.description.map((description) => (
              <li key={description}>{description}</li>
            ))}
          </ul>

          <div className="mt-10 flex gap-4">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full rounded bg-gray-100 py-3 hover:bg-gray-200"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full rounded bg-indigo-500 py-3 text-white hover:bg-indigo-600"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center">
        <p className="text-3xl font-medium">Related Products</p>
        <div className="mx-auto mt-2 h-0.5 w-20 bg-primary"></div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {relatedProducts
            .filter((item) => item.inStock)
            .map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
        </div>

        <button
          onClick={() => {
            navigate("/products");
            window.scrollTo(0, 0);
          }}
          className="mt-10 rounded border px-10 py-2 text-primary hover:bg-primary/10"
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
