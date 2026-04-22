 import { assets } from "../assets/assets";
import { useAppContext } from "../context/useAppContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems } = useAppContext();
  const navigate = useNavigate();

  if (!product) return null;

  return (
    <div
      onClick={() => {
        navigate(`/product/${product._id}`);
        window.scrollTo(0, 0);
      }}
      className="w-full max-w-56 min-w-56 rounded-md border border-gray-500/20 bg-white px-3 py-2 md:px-4"
    >
      <div className="group flex cursor-pointer items-center justify-center px-2">
        <img
          className="max-w-26 transition group-hover:scale-105 md:max-w-36"
          src={product.image?.[0]}
          alt={product.name}
        />
      </div>

      <div className="text-sm text-gray-500/60">
        <p>{product.category}</p>
        <p className="w-full truncate text-lg font-medium text-gray-700">
          {product.name}
        </p>

        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <img
              key={index}
              className="w-3 md:w-3.5"
              src={index < 4 ? assets.star_icon : assets.star_dull_icon}
              alt="rating star"
            />
          ))}
          <p>(4)</p>
        </div>

        <div className="mt-3 flex items-end justify-between">
          <p className="text-base font-medium text-primary md:text-xl">
            {currency}{product.offerPrice}{" "}
            <span className="text-xs text-gray-500/60 line-through md:text-sm">
              {currency}{product.price}
            </span>
          </p>

          <div onClick={(e) => e.stopPropagation()} className="text-primary">
            {!cartItems[product._id] ? (
              <button
                className="flex h-[34px] w-[64px] items-center justify-center gap-1 rounded border border-primary/40 bg-primary/10 md:w-[80px]"
                onClick={() => addToCart(product._id)}
              >
                <img src={assets.cart_icon} alt="cart" />
                Add
              </button>
            ) : (
              <div className="flex h-[34px] w-16 items-center justify-center gap-2 rounded bg-primary/15 md:w-20">
                <button onClick={() => removeFromCart(product._id)}>-</button>
                <span>{cartItems[product._id]}</span>
                <button onClick={() => addToCart(product._id)}>+</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;