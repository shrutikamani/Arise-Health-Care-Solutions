import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const MegaMenu = ({ megaOpen, setMegaOpen, megaMenu }) => {
  const megaMenuRef = useRef();

  // Close menu on outside click
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
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-full   bg-gray-600 rounded-md shadow-lg z-50 transition-all duration-300 ${
        megaOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
      }`}
    >
      <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
        {/* First Row: Image + 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[250px_1fr] gap-6 mb-6">
          <div className="md:sticky md:top-8">
            <img
              src="/img/mega-menu-image.jpg"
              alt="Mega Menu"
              className="w-full h-52 object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {firstRow.map((section, index) => (
              <div key={index} className="text-left">
                <h4 className="text-orange-600 font-bold text-[22px]  underline">{section.title}</h4>
                <ul className="space-y-2 p-0">
                  {section.items.map((item, i) => (
                    <li  key={i}>
                      <Link
                        to={item.path}
                        onClick={() => setMegaOpen(false)}
                        className="block text-white  hover:text-orange-600 hover:underline text-xl transition"
                      >
                        {item.name}
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
          <div key={rowIndex} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
            {row.map((section, index) => (
              <div key={index} className="text-left">
                <h4 className="text-white font-bold text-xl mb-3">{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <Link
                        to={item.path}
                        onClick={() => setMegaOpen(false)}
                        className="block text-gray-300 hover:text-white text-lg transition"
                      >
                        {item.name}
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
