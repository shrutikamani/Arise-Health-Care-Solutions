import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/Product-slice/cartSlice";
import RelatedProduct from "./RelatedProduct";
import QuestionForm from "./QuestionForm";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3030/product/${id}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.data);
        } else {
          throw new Error("Product not found");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      alert("Product added to cart");
      navigate("/cart");
    }
  };

  const handleBuyNow = () => {
    if (product) {
      dispatch(addToCart(product));
      navigate("/checkout");
    }
  };

  const handleOpenQuestionModal = () => setIsQuestionModalOpen(true);
  const handleCloseQuestionModal = () => setIsQuestionModalOpen(false);

  if (!product) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="bg-white mt-16 md:mt-20 border-t border-gray-200">
      {/* Main product section */}
      <div className="container border-b border-black">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
          {/* Product Image Section */}
          <div className="flex items-center justify-center">
            <img
              src={
                product.images?.[0]
                  ? product.images[0].startsWith("http")
                    ? product.images[0]
                    : `http://localhost:3030${product.images[0]}`
                  : "/placeholder.png"
              }
              alt={product.title}
              className="w-full h-auto max-h-[400px] md:max-h-[600px] object-contain rounded"
            />
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>

            <p className="text-base md:text-xl text-gray-700 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Footnote (optional, can be removed if not needed) */}
            {product.feature && (
              <div className="mb-6 text-sm md:text-md text-gray-600">
                <ol className="list-decimal ml-4">
                  {Array.isArray(product.feature) ? (
                    product.feature.map((f, i) => <li key={i}>{f}</li>)
                  ) : (
                    <li>{product.feature}</li>
                  )}
                </ol>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 md:gap-4">
              <button
                onClick={handleAddToCart}
                className="bg-orange-600 text-white text-base md:text-xl font-bold px-6 md:px-8 py-2 rounded hover:bg-orange-700 transition"
              >
              Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-orange-600 text-white text-base md:text-xl font-bold px-6 md:px-8 py-2 rounded hover:bg-orange-700 transition"
              >
                Buy Now
              </button>
              <button
                onClick={handleOpenQuestionModal}
                className="bg-orange-600 text-white text-base md:text-xl font-bold px-6 md:px-8 py-2 rounded hover:bg-orange-700 transition"
              >
                Ask a Question
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Question Modal */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg max-w-[90%] md:max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Ask a Question</h2>
              <button
                onClick={handleCloseQuestionModal}
                className="text-gray-600 hover:text-gray-800 text-lg md:text-xl font-bold"
              >
                ×
              </button>
            </div>
            <hr className="my-4 md:my-6" />
            <QuestionForm productId={id} />
            <div className="mt-4 md:mt-6 text-right">
              <button
                onClick={handleCloseQuestionModal}
                className="bg-gray-300 text-gray-800 px-3 md:px-4 py-1 md:py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-10">
        <RelatedProduct category={product.category} currentProductId={product._id} />
      </div>
    </div>
  );
};

export default ProductDetails;