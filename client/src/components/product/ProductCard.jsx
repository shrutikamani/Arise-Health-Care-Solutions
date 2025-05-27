import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/slices/Product-slice/cartSlice";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product, expanded, onToggleExpand }) =>
{
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () =>
  {
    dispatch(addToCart(product));
    alert("Product added to cart!");
    navigate("/cart");
  };

  const handleViewDetails = () =>
  {
    navigate(`/product/${product._id}`);
  };

  const imageUrl =
    product.images && product.images[0]
      ? product.images[0].startsWith("http")
        ? product.images[0]
        : `http://localhost:3030${product.images[0]}`
      : "/default-placeholder.png";

  const truncate = (text) =>
  {
    if (!text) return "";
    return text.length > 60 && !expanded ? text.slice(0, 60) + "..." : text;
  };

  const featureText = Array.isArray(product.feature)
    ? product.feature.join(", ")
    : product.feature || "";

  return (
    <div className=" transition-all duration-300 overflow-hidden flex flex-col w-full mx-auto">
      {/* Image Section */}
      <Link to={`/product/${product._id}`}>
        <div className="flex flex-col items-center text-center space-y-2 group hover:scale-105 transition-transform duration-300">
          <div className="relative w-full h-40 sm:h-36 md:h-40 flex items-center justify-center">
            <img
              src={imageUrl}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <h2 className="text-xl sm:text-lg font-semibold text-blue-900 group-hover:text-blue-700">
            {product.title}
          </h2>
        </div>
      </Link>

      {/* Content Section */}
      {/* <div className="p-4 flex flex-col flex-1 justify-between">
   
        <h3 className="text-xl sm:text-lg font-semibold text-gray-800 capitalize  ">
          {product.title}
        </h3>

    
        <div className="flex justify-between items-center mt-2">
          <h4 className="text-lg sm:text-xl font-bold text-gray-900">₹{product.price}</h4>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < Math.floor(product.rating || 0) ? "text-yellow-400" : "text-gray-300"}
                size={16}
              />
            ))}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2">
          {truncate(product.description)}
        </p>
        */}

      {/* Features */}
      {/* <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-1">
          {truncate(featureText)}
        </p>
        {featureText.length > 60 && (
          <button
            onClick={() => onToggleExpand(product._id)}
            className="text-blue-500 text-xs mt-1 hover:underline"
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        )} */}

      {/* Buttons */}
      {/* <div className="flex gap-2 mt-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-600 text-white text-xs sm:text-sm font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Add to Cart
          </button>
          <button
            onClick={handleViewDetails}
            className="flex-1 bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold py-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
          >
            View Details
          </button>
        </div>
      </div> */}
  </div>
  );
};

export default ProductCard;