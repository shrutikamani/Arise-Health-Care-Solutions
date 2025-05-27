import React, { useEffect, useState } from "react";
import "../style.css";


const Spinner = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1000); // Hide after 1 second
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    show && (
      <div
        id="spinner"
        className={`bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center ${show ? "show" : ""}`}
      >
        <div
          className="spinner-grow text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          {/* <span className="sr-only">Loading...</span> */}
        </div>
      </div>
    )
  );
};

export default Spinner;
