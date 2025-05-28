// import React, { useState, useEffect } from "react";
// import { FaPlusCircle, FaTrash, FaEdit } from "react-icons/fa";
// import AdminSidebar from "../../common/AdminSaidBar";
// import FeaturesForm from "./FeaturesForm";

// const AdminFeatures = () =>
// {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [features, setFeatures] = useState([]);
//   const [overlayVisible, setOverlayVisible] = useState(false);
//   const [editingFeature, setEditingFeature] = useState(null);

//   useEffect(() =>
//   {
//     const fetchFeatures = async () =>
//     {
//       try {
//         const response = await fetch("http://localhost:3030/feature/all");
//         const result = await response.json();
//         if (result.success) {
//           setFeatures(result.data);
//         } else {
//           throw new Error("Error fetching features");
//         }
//       } catch (error) {
//         alert(error.message);
//       }
//     };
//     fetchFeatures();
//   }, []);

//   const handleNewFeature = (newFeature) =>
//   {
//     setFeatures((prev) =>
//     {
//       const existingIndex = prev.findIndex((f) => f._id === newFeature._id);
//       if (existingIndex !== -1) {
//         const updated = [...prev];
//         updated[existingIndex] = newFeature;
//         return updated;
//       }
//       return [...prev, newFeature];
//     });
//     setIsSidebarOpen(false);
//     setOverlayVisible(false);
//     setEditingFeature(null);
//   };

//   const handleEdit = (feature) =>
//   {
//     setEditingFeature(feature);
//     setIsSidebarOpen(true);
//     setOverlayVisible(true);
//   };

//   const handleDelete = async (id) =>
//   {
//     try {
//       const res = await fetch(`http://localhost:3030/feature/${id}`, {
//         method: "DELETE",
//       });
//       const result = await res.json();
//       if (!res.ok) throw new Error(result.error);
//       setFeatures((prev) => prev.filter((f) => f._id !== id));
//     } catch (err) {
//       alert(err.message);
//     }
//   };
//   useEffect(() =>
//   {
//     const handleEsc = (e) =>
//     {
//       if (e.key === "Escape") setIsSidebarOpen(false);
//     };
//     window.addEventListener("keydown", handleEsc);
//     return () => window.removeEventListener("keydown", handleEsc);
//   }, []);

//   return (
//     <div className="flex">
//       <div className="fixed h-screen text-white">
//         <AdminSidebar />
//       </div>

//       <div className="container mt-20 w-full p-4 ml-64">
//         <div className="flex justify-end mb-4">
//           <button
//             className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition"
//             onClick={() =>
//             {
//               setEditingFeature(null);
//               setIsSidebarOpen(true);
//               setOverlayVisible(true);
//             }}
//           >
//             <FaPlusCircle /> Add Feature
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {features.length > 0 ? (
//             features.map((feature) => (
//               <div
//                 key={feature._id}
//                 className="rounded-lg bg-gray-100 shadow-md hover:shadow-lg transition"
//               >
//                 <img
//                   src={
//                     feature.images && feature.images.length > 0
//                       ? feature.images[0].startsWith("http")
//                         ? feature.images[0]
//                         : `http://localhost:3030${feature.images[0]}`
//                       : "/default-placeholder.png"
//                   }
//                   alt="Feature"
//                   className="w-full h-[20rem] object-cover rounded-t-lg"
//                 />
//                 <div className="p-4">
//                   <p className="text-xl capitalize font-bold text-blue-600 break-words">
//                     {feature.title}
//                   </p>
//                   <p>{feature.description}</p>
//                   <div className="flex justify-between mt-4 text-sm">
//                     <button
//                       className="flex items-center text-blue-600 gap-1 hover:underline"
//                       onClick={() => handleEdit(feature)}
//                     >
//                       <FaEdit /> Edit
//                     </button>
//                     <button
//                       className="flex items-center text-red-600 gap-1 hover:underline"
//                       onClick={() => handleDelete(feature._id)}
//                     >
//                       <FaTrash /> Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center col-span-full text-gray-500">
//               No features added.
//             </p>
//           )}
//         </div>
//       </div>

//       {overlayVisible && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={() =>
//           {
//             setOverlayVisible(false);
//             setIsSidebarOpen(false);
//           }}
//         ></div>
//       )}

//       {isSidebarOpen && (
//         <>
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-screen overflow-y-auto p-6 relative">
//               <button
//                 onClick={() => setIsSidebarOpen(false)}
//                 className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
//               >
//                 &times;
//               </button>
//               <FeaturesForm
//                 setIsSidebarOpen={setIsSidebarOpen}
//                 onNewFeature={handleNewFeature}
//                 editingFeature={editingFeature}
//               />
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };
// export default AdminFeatures;


import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaTrash, FaEdit } from "react-icons/fa";
import AdminSidebar from "../../common/AdminSaidBar";
import FeaturesForm from "./FeaturesForm";

const AdminFeatures = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [features, setFeatures] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch("http://localhost:3030/feature/all");
        const result = await response.json();
        if (result.success) {
          setFeatures(result.data);
        } else {
          throw new Error("Error fetching features");
        }
      } catch (error) {
        alert(error.message);
      }
    };
    fetchFeatures();
  }, []);

  const handleNewFeature = (newFeature) => {
    setFeatures((prev) => {
      const existingIndex = prev.findIndex((f) => f._id === newFeature._id);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = newFeature;
        return updated;
      }
      return [...prev, newFeature];
    });
    setIsSidebarOpen(false);
    setOverlayVisible(false);
    setEditingFeature(null);
  };

  const handleEdit = (feature) => {
    setEditingFeature(feature);
    setIsSidebarOpen(true);
    setOverlayVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3030/feature/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      setFeatures((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsSidebarOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="flex">
      <div className="fixed h-screen text-saffron">
        <AdminSidebar />
      </div>

      <div className="container-fluid mt-44 w-full p-4  bg-white">
        <div className="flex justify-end mb-4">
          <button
            className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white font-medium rounded-md shadow hover:bg-orange-700 transition"
            onClick={() => {
              setEditingFeature(null);
              setIsSidebarOpen(true);
              setOverlayVisible(true);
            }}
          >
            <FaPlusCircle className="text-saffron" /> Add Feature
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.length > 0 ? (
            features.map((feature) => (
              <div
                key={feature._id}
                className="rounded-lg bg-white shadow-md hover:shadow-lg transition border border-saffron"
              >
                {/* <img
                  src={
                    feature.images && feature.images.length > 0
                      ? feature.images[0].startsWith("http")
                        ? feature.images[0]
                        : `http://localhost:3030${feature.images[0]}`
                      : "/default-placeholder.png"
                  }
                  alt="Feature"
                  className="w-full h-[20rem] object-cover rounded-t-lg"
                /> */}
                <div className="p-4">
                  <p className="text-3xl capitalize font-bold text-orange-500 break-words">
                    {feature.title}
                  </p>
                  <p className="text-[#3f3e3d] font-medium">{feature.description}</p>
                  <div className="flex justify-between mt-4 text-xl">
                    <button
                     className="flex items-center gap-2 bg-white-500 text-2xl text-orange-500 px-4 py-2 rounded-md hover:bg-white-500 transition"
                      onClick={() => handleEdit(feature)}
                    >
                      <FaEdit className="" /> Edit
                    </button>
                    <button
                     className="flex items-center gap-2 bg-white-500 text-2xl text-orange-500 px-4 py-2 rounded-md hover:bg-white-500 transition" 
                      onClick={() => handleDelete(feature._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full  text-[#3f3e3d] font-bold">
              No features added.
            </p>
          )}
        </div>
      </div>

      {overlayVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {
            setOverlayVisible(false);
            setIsSidebarOpen(false);
          }}
        ></div>
      )}

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-screen overflow-y-auto p-6 relative border border-saffron">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-3 right-3 text-saffron hover:text-orange-700 text-xl font-bold"
            >
              ×
            </button>
            <FeaturesForm
              setIsSidebarOpen={setIsSidebarOpen}
              onNewFeature={handleNewFeature}
              editingFeature={editingFeature}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeatures;