//  import React, { useState, useEffect } from "react";
// import ProductCard from "../../components/product/ProductCard";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedId, setExpandedId] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("http://localhost:3030/product/allProducts");
//         if (!res.ok) throw new Error("Failed to fetch products");
//         const result = await res.json();
//         if (result.success) {
//           setProducts(result.data);
//         } else {
//           throw new Error("Error in response data");
//         }
//       } catch (error) {
//         alert(error.message);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleToggleExpand = (id) => {
//     setExpandedId((prev) => (prev === id ? null : id));
//   };

//   return (
//     <div className="bg-slate-50 min-h-screen">
//       <div className="container mx-auto px-4 py-12">
//         <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">
//           Explore Our Instruments
//         </h2>

//         {loading ? (
//           <p className="text-center text-gray-400">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <ProductCard
//                   key={product._id}
//                   product={product}
//                   expanded={expandedId === product._id}
//                   onToggleExpand={handleToggleExpand}
//                 />
//               ))
//             ) : (
//               <p className="text-center text-gray-500 col-span-full">
//                 No instruments available.
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductList;


// import React, { useState, useEffect } from "react";
// import ProductCard from "../../components/product/ProductCard";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedId, setExpandedId] = useState(null); // Tracks the expanded card

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:3030/product/allProducts");
//         if (!response.ok) throw new Error("Failed to fetch products");
//         const result = await response.json();
//         if (result.success) {
//           setProducts(result.data);
//         } else {
//           throw new Error("Error in response data");
//         }
//       } catch (error) {
//         setError(error.message);
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleToggleExpand = (id) => {
//     setExpandedId((prev) => (prev === id ? null : id)); // Toggle or set new ID
//   };

//   return (
//     <div className="bg-slate-50 h-auto mt-20">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-600 mb-8 sm:mb-12">
//           Explore Our Instruments
//         </h2>

//         {loading ? (
//           <p className="text-center text-gray-400 text-lg">Loading...</p>
//         ) : error ? (
//           <div className="alert alert-danger text-center text-red-500 text-lg">{error}</div>
//         ) : (
//           <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <ProductCard
//                   key={product._id}
//                   product={product}
//                   expanded={expandedId === product._id}
//                   onToggleExpand={handleToggleExpand}
//                 />
//               ))
//             ) : (
//               <p className="text-center text-gray-500 col-span-full text-lg">
//                 No instruments available.
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductList;

import React, { useState, useEffect } from "react";
import ProductCard from "../../components/product/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3030/product/allProducts");
        if (!response.ok) throw new Error("Failed to fetch products");
        const result = await response.json();
        if (result.success) {
          setProducts(result.data);
        } else {
          throw new Error("Error in response data");
        }
      } catch (error) {
        setError(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleToggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="mt-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          CLINICAL SPECIALTY EQUIPMENT RENTAL AND CAPITAL
        </h1>
        <h2 className="text-xl sm:text-2xl mb-6">Rent Individually or as a Collection</h2>
        <p className="max-w-4xl mx-auto text-sm sm:text-base text-gray-200 leading-relaxed">
          By getting your patients up and moving sooner, you can help reduce pressure ulcer development,
          accelerate post-operative recovery and support better respiratory outcomes. Not only that, but
          studies show that early mobility decreases length-of-stay by 2.7 days. From low beds to fall
          mats to toilet lifts and more, Agiliti offers all the essential specialty equipment caregivers
          need to accelerate patient recovery – ultimately delivering a better patient experience and
          saving your hospital money.
        </p>
      </div>

      {/* Product Grid */}
      <div className=" py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-8">
          Explore Our Instruments
        </h2>
        {loading ? (
          <p className="text-center text-gray-400 text-lg">Loading...</p>
        ) : error ? (
          <div className="text-center text-red-500 text-lg">{error}</div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  expanded={expandedId === product._id}
                  onToggleExpand={handleToggleExpand}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full text-lg">
                No instruments available.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
