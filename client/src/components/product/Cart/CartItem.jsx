// import React from "react";

// const CartItem = ({ product, onIncrease, onDecrease, onRemove }) =>
// {
//   const image = product.images?.[0]?.startsWith("http")
//     ? product.images[0]
//     : `http://localhost:3030${product.images[0]}`;

//   const totalPrice = (product.price * product.quantity).toFixed(2);

//   return (
//     <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
//       {/* Product Image */}
//       <img
//         src={image}
//         alt={product.title}
//         className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-lg   border"
//       />

//       {/* Product Info */}
//       <div className="flex-1 space-y-2 overflow-hidden">
//         {/* Title & Price */}
//         <div className=" justify-between items-start flex-wrap">
//           <h3 className="font-semibold text-gray-800 break-words max-w-md capitalize">{product.title}</h3>

//           <p className="text-2xl font-semibold text-blue-700">₹{totalPrice}</p>
//         </div>

//         {/* Description */}
//         {/* <p className="text-md text-gray-600 leading-relaxed break-words max-w-full">
//           {product.description}
//         </p>

//         {/* Features */}
//         {/* {Array.isArray(product.feature) ? (
//           <ul className="list-disc pl-5 text-md text-gray-600 space-y-1">
//             {product.feature.map((feat, idx) => (
//               <li key={idx}>{feat}</li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-md text-gray-600 break-words">{product.feature}</p>
//         )} */}

//         {/* Quantity Control */}
//         <div className="flex items-center gap-3 mt-2">
//           <button
//             className="bg-gray-200 text-lg px-2.5  rounded-full hover:bg-gray-300"
//             onClick={onDecrease}
//           >
//             −
//           </button>
//           <span className="px-3 text-lg  font-bold">{product.quantity}</span>
//           <button
//             className="bg-gray-200 text-lg px-2.5  rounded-full hover:bg-gray-300"
//             onClick={onIncrease}
//           >
//             +
//           </button>
//         </div>

//         {/* Warranty */}
//         {product.warranty && (
//           <div className="flex items-center gap-3 p-2 mt-3 bg-gray-100 border rounded-md">
//             <img src={product.warranty.logo} alt="Warranty" className="w-10 h-10 object-contain" />
//             <span className="text-sm text-gray-700">{product.warranty.label}</span>
//           </div>
//         )}
//       </div>

//       {/* Remove Button */}
//       <button
//         className="text-red-500 hover:text-red-700 text-xl"
//         onClick={onRemove}
//       >
//         Remove
//       </button>
//     </div>

//   );
// };

// export default CartItem;

import React from "react";

const CartItem = ({ product, onIncrease, onDecrease, onRemove }) => {
  const image = product.images?.[0]?.startsWith("http")
    ? product.images[0]
    : `http://localhost:3030${product.images[0]}`;

  const totalPrice = (product.price * product.quantity).toFixed(2);

  return (
    <div className="bg-white rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center border-b border-gray-200">
      {/* Product Image */}
      <div className="flex items-center justify-center w-full sm:w-auto">
        <img
          src={image}
          alt={product.title}
          className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        {/* Title and Price */}
        <div className="flex flex-col space-y-1">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-900 hover:text-blue-700 transition-colors duration-300 truncate">
            {product.title}
          </h3>
          <p className="text-lg sm:text-xl font-semibold text-gray-900">₹{totalPrice}</p>
        </div>

        {/* Quantity Control and Remove Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              className="bg-gray-200 text-base sm:text-lg px-2 rounded-full hover:bg-gray-300 transition-colors duration-200"
              onClick={onDecrease}
            >
              −
            </button>
            <span className="px-2 text-base sm:text-lg font-bold">{product.quantity}</span>
            <button
              className="bg-gray-200 text-base sm:text-lg px-2 rounded-full hover:bg-gray-300 transition-colors duration-200"
              onClick={onIncrease}
            >
              +
            </button>
          </div>
          <button
            className="text-red-500 hover:text-red-700 text-base sm:text-lg font-semibold transition-colors duration-200"
            onClick={onRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
