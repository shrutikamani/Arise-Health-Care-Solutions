import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "../style.css"; // Import CSS file

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`back-to-top ${isVisible ? "visible" : "hidden"}`}
    >
      <FaArrowUp />
    </button>
  );
};

export default BackToTop;
