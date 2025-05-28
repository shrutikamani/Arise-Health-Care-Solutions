// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { FaStar } from "react-icons/fa";
// import { addToCart } from "../../redux/slices/Product-slice/cartSlice";

// const RelatedProduct = ({ category, currentProductId }) =>
// {
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() =>
//   {
//     const fetchRelated = async () =>
//     {
//       try {
//         const res = await fetch(`http://localhost:3030/product/related/${currentProductId}`);
//         const data = await res.json();
//         if (data.success) {
//           // No need to filter by category here, as the backend already handles it
//           setRelatedProducts(data.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch related products:", error);
//       }
//     };

//     if (category && currentProductId) {
//       fetchRelated();
//     }
//   }, [category, currentProductId]);


//   const handleAddToCart = (product) =>
//   {
//     dispatch(addToCart(product));
//     alert("Product added to cart!");
//     navigate("/cart");
//   };

//   if (relatedProducts.length === 0) return null;

//   return (
//     <div className="container w-full mx-auto px-4 py-10">
//       <p className="text-4xl font-bold text-black mb-6 text-center">Related Products</p>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
//         {relatedProducts.map((product) => (
//           <div
//             key={product._id}
//             className="bg-white rounded-lg shadow-md  transition-all duration-300 overflow-hidden flex flex-col hover:shadow-2xl  max-w-sm mx-auto"
//           >
//             <Link to={`/product/${product._id}`}>
//               <div  className="flex flex-col items-center text-center space-y-2 group hover:scale-105 transition-transform duration-300">
//                 <img
//                   src={
//                     product.images && product.images[0]
//                       ? product.images[0].startsWith("http")
//                         ? product.images[0]
//                         : `http://localhost:3030${product.images[0]}`
//                       : "/placeholder.png"
//                   }
//                   alt={product.title}
//                   className="h-48 w-full object-cover transition-transform duration-300 hover:scale-110"
//                 />
//               </div>
//             </Link>
//             {/* <div className="p-4 flex flex-col flex-1">
//               <h3 className="text-lg font-semibold text-gray-800 capitalize truncate">
//                 {product.title}
//               </h3>
//               <div className="flex justify-between items-center mt-2">
//                 <h4 className="text-xl font-bold text-gray-900">₹{product.price}</h4>
              
//               </div>
//               <div className="flex gap-3 mt-4">
//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   className="flex-1 bg-blue-600 text-white text-sm font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
//                 >
//                   Add to Cart
//                 </button>
//                 <button
//                   onClick={() => navigate(`/product/${product._id}`)}
//                   className="flex-1 bg-gray-100 text-gray-700 text-sm font-semibold py-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div> */}
//           </div>
//         ))}
//       </div>
//     </div>

//   );
// };

// export default RelatedProduct;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/Product-slice/cartSlice";

const RelatedProduct = ({ category, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch(`http://localhost:3030/product/related/${currentProductId}`);
        const data = await res.json();
        if (data.success) {
          setRelatedProducts(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      }
    };

    if (category && currentProductId) {
      fetchRelated();
    }
  }, [category, currentProductId]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alert("Product added to cart!");
    navigate("/cart");
  };

  if (relatedProducts.length === 0) return null;

  return (
    <div className="container w-full mx-auto px-4 py-10">
      <p className="text-4xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
        Related Products
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <div
            key={product._id}
            className="transition-all duration-300 overflow-hidden flex flex-col w-full mx-auto"
          >
            <Link to={`/product/${product._id}`}>
              <div className="flex flex-col items-center text-center space-y-2 group hover:scale-105 transition-transform duration-300">
                <div className="relative w-full h-40 sm:h-36 md:h-40 flex items-center justify-center">
                  <img
                    src={
                      product.images && product.images[0]
                        ? product.images[0].startsWith("http")
                          ? product.images[0]
                          : `http://localhost:3030${product.images[0]}`
                        : "/placeholder.png"
                    }
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <p className="text-xl sm:text-2xl font-semibold text-gray-800 hover:text-gray-700">
                  {product.title}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
