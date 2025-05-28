  // // src/pages/Products/ProductZoom.jsx
  // import React from "react";
  // import ReactImageMagnify from "react-image-magnify";

  // const ProductZoom = ({ src, alt }) => {
  //   return (
  //     <div className="w-full max-w-xl mx-auto">
  //       <ReactImageMagnify
  //         {...{
  //           smallImage: {
  //             alt,
  //             isFluidWidth: true,
  //             src,
  //           },
  //           largeImage: {
  //             src,
  //             width: 1200,
  //             height: 1800,
  //           },
  //           enlargedImagePosition: "over", // Zoom over the image
  //           enlargedImageContainerStyle: {
  //             zIndex: 9,
  //             backgroundColor: "#fff", // White background for the zoomed image
  //           },
  //           enlargedImageStyle: {
  //             objectFit: "fill", // Ensure the zoomed image fits properly
  //           },
  //           enlargedImagePosition: "beside", // Position the zoomed image beside the original
  //           isHintEnabled: true, // Show a hint to users to hover for zoom
  //           hintTextMouse: "Hover to Zoom",
  //         }}
  //       />
  //     </div>
  //   );
  // };

  // export default ProductZoom;

// src/pages/Products/ProductZoom.jsx

import React from "react";
import ReactImageMagnify from "react-image-magnify";

const ProductZoom = ({ src, alt }) => {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 bg-white">
      <ReactImageMagnify
        {...{
          smallImage: {
            alt,
            isFluidWidth: true,
            src,
          },
          largeImage: {
            src,
            width: 1500, // Larger for better zoom clarity
            height: 2000,
          },
          enlargedImagePosition: "beside", // Zoom beside the main image
          enlargedImageContainerStyle: {
            zIndex: 99,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          },
          enlargedImageStyle: {
            objectFit: "contain", // Keep proportions
          },
          isHintEnabled: true,
          hintTextMouse: "Hover to Zoom",
          shouldUsePositiveSpaceLens: true, // Ensures only hovered part is zoomed
        }}
      />
    </div>
  );
};

export default ProductZoom;
