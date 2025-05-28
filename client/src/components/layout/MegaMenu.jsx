// // src/components/MegaMenu.jsx
// import React, { useRef, useEffect } from "react";
// import { Link } from "react-router-dom";

// const MegaMenu = ({ megaOpen, setMegaOpen, menuItems, closeNavbar }) => {
//   const megaMenuRef = useRef(null);

//   const megaMenu = menuItems.find((item) => item.megaMenu)?.megaMenu || [];

//   const firstRow = (megaMenu || []).slice(0, 4);


//   const subsequentRows = [];
//   for (let i = 4; i < megaMenu.length; i += 5) {
//     subsequentRows.push(megaMenu.slice(i, i + 5));
//   }

//   // Close Mega Menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
//         setMegaOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [setMegaOpen]);

//   return (
//     <div
//       ref={megaMenuRef}
//       className={`fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-[90rem] bg-gray-900 rounded-md shadow-lg z-50 transition-all duration-300 ${
//         megaOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
//       }`}
//     >
//       <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
//         {/* First Row: Image + 4 Categories */}
//         {megaMenu.length > 0 && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[250px_1fr] gap-6 mb-6">
//             {/* Image Block */}
//             <div className="md:sticky md:top-8">
//               <img
//                 src="/img/mega-menu-image.jpg"
//                 alt="Mega Menu"
//                 className="w-full h-52 object-cover rounded-lg shadow-md"
//               />
//             </div>

//             {/* First 4 Categories */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {firstRowCategories.map((section, index) => (
//                 <div key={index} className="text-left">
//                   <h4 className="text-white font-bold text-xl mb-3">{section.title}</h4>
//                   <ul className="space-y-2">
//                     {section.items.map((link, i) => (
//                       <li key={i}>
//                         <Link
//                           to={link.path}
//                           onClick={closeNavbar}
//                           className="block text-gray-300 hover:text-white text-lg transition"
//                         >
//                           {link.name}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Remaining Categories */}
//         {subsequentRows.map((row, rowIndex) => (
//           <div key={rowIndex} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
//             {row.map((section, index) => (
//               <div key={index} className="text-left">
//                 <h4 className="text-white font-bold text-xl mb-3">{section.title}</h4>
//                 <ul className="space-y-2">
//                   {section.items.map((link, i) => (
//                     <li key={i}>
//                       <Link
//                         to={link.path}
//                         onClick={closeNavbar}
//                         className="block text-gray-300 hover:text-white text-lg transition"
//                       >
//                         {link.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MegaMenu;





// import React, { useRef, useEffect } from "react";
// import { Link } from "react-router-dom";

// const MegaMenu = ({ megaOpen, setMegaOpen, megaMenu }) =>
// {
//   const megaMenuRef = useRef();

//   // Close menu on outside click
//   useEffect(() =>
//   {
//     const handleClickOutside = (e) =>
//     {
//       if (megaMenuRef.current && !megaMenuRef.current.contains(e.target)) {
//         setMegaOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [megaOpen]);

//   const firstRow = (megaMenu || []).slice(0, 4);
//   const subsequentRows = [];
//   for (let i = 4; i < (megaMenu || []).length; i += 5) {
//     subsequentRows.push(megaMenu.slice(i, i + 5));
//   }

//   return (
//     <div
//       ref={megaMenuRef}
//       className={`fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-full bg-[#ecf0f3] rounded-md shadow-lg z-50 transition-all duration-300 ${megaOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
//         }`}
//     >
//       <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
//         {/* First Row: Image + 4 Columns */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[300px_1fr] gap-6 mb-6">
//           <div className="md:sticky md:top-8">
//             <img
//               src="https://www.carezindagi.com/uploaded-files/thumb-cache/member_129/thumb---medical-equipments5033.jpg"
//               alt="Mega Menu"
//               className="w-full h-52 object-cover rounded-lg shadow-md hover:scale-105 transition-all duration-300"
//             />
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {firstRow.map((section, index) => (
//               <div key={index} className="px-4 border-l border-orange-600 rounded-tl-xl rounded-bl-xl">
//                 <h4 className="text-orange-600 font-bold text-lg mb-3 underline">{section.title}</h4>

//                 <ul className="space-y-2 p-0">
//                   {section.items.map((item, i) => (
//                     <li key={i}>
//                       <Link
//                         to={item.path}
//                         onClick={() => setMegaOpen(false)}
//                         className="block text-black hover:text-orange-600 hover:underline text-xl transition"
//                       >
//                         {item.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Additional Rows */}
//         {subsequentRows.map((row, rowIndex) => (
//           <div key={rowIndex} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
//             {row.map((section, index) => (
//               <div key={index} className="px-4 border-l border-orange-600  rounded-tl-xl rounded-bl-xl">
//                 <h4 className="text-orange-600 capitalize font-bold text-lg mb-3 underline">{section.title}</h4>

//                 <ul className="space-y-2">
//                   {section.items.map((item, i) => (
//                     <li key={i}>
//                       <Link
//                         to={item.path}
//                         onClick={() => setMegaOpen(false)}
//                         className="block text-black hover:text-orange-600 hover:underline text-xl transition"
//                         >
//                           {item.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MegaMenu;

import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const MegaMenu = ({ megaOpen, setMegaOpen, megaMenu }) => {
  const megaMenuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [megaOpen]);

  const firstRow = (megaMenu || []).slice(0, 4);
  const subsequentRows = [];
  for (let i = 4; i < (megaMenu || []).length; i += 5) {
    subsequentRows.push(megaMenu.slice(i, i + 5));
  }

  return (
    <div
      ref={megaMenuRef}
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-full bg-white rounded-xl shadow-2xl z-50 transition-all duration-500 ease-in-out ${
        megaOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
      }`}
    >
      <div className="p-6 md:p-10 max-h-[80vh] overflow-y-auto">
        {/* First Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[300px_1fr] gap-8 mb-10">
          {/* Image */}
          <div className="md:sticky md:top-8">
            <img
              src="https://www.carezindagi.com/uploaded-files/thumb-cache/member_129/thumb---medical-equipments5033.jpg"
              alt="Mega Menu"
              className="w-full h-52 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* First 4 sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {firstRow.map((section, index) => (
              <div
                key={index}
                className="bg-gray-100 hover:bg-orange-50 p-4 rounded-lg shadow-md transition-all duration-300"
              >
                <h4 className="text-orange-600 font-bold text-[22px] mb-4 border-b border-orange-300 pb-1">
                  {section.title}
                </h4>
                <ul className="space-y-2 m-0 p-0">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <Link
                        to={item.path}
                        onClick={() => setMegaOpen(false)}
                        className="group flex justify-between text-left items-left text-gray-800 hover:text-orange-600 text-[20px] transition-all "
                      >
                        {item.name}
                        <FiArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Rows */}
        {subsequentRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8"
          >
            {row.map((section, index) => (
              <div
                key={index}
                className="bg-gray-100 hover:bg-orange-50 p-4 capitalize rounded-lg shadow-md transition-all duration-300"
              >
                <h4 className="text-orange-600 font-bold text-[22px] capitalize mb-4 border-b border-orange-300 pb-1">
                  {section.title}
                </h4>
                <ul className="space-y-2 m-0 p-0">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <Link
                        to={item.path}
                        onClick={() => setMegaOpen(false)}
                        className="group flex justify-between text-left text-gray-800 hover:text-orange-600 text-[20px] transition-all"
                      >
                        {item.name}
                        <FiArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
