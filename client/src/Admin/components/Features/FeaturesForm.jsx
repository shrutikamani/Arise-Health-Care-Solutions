// import React, { useEffect, useState } from "react";

// const FeaturesForm = ({ setIsSidebarOpen, onNewFeature, editingFeature }) =>
// {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//   });
//   const [uploadType, setUploadType] = useState("file");
//   const [images, setImage] = useState(null);
//   const [imageUrl, setImageUrl] = useState("");
//   const [imagePreview, setImagePreview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() =>
//   {
//     if (editingFeature) {
//       setFormData({
//         title: editingFeature.title || "",
//         description: editingFeature.description || "",
//       });

//       let imageSrc = "";
//       if (typeof editingFeature.images === "string") {
//         imageSrc = editingFeature.images.startsWith("http")
//           ? editingFeature.images
//           : `http://localhost:3030${editingFeature.images}`;
//       } else if (Array.isArray(editingFeature.images) && editingFeature.images.length > 0) {
//         imageSrc = editingFeature.images[0].startsWith("http")
//           ? editingFeature.images[0]
//           : `http://localhost:3030${editingFeature.images[0]}`;
//       }

//       setImagePreview(imageSrc);
//       setUploadType("file");
//       setImage(null);
//       setImageUrl("");
//     }
//   }, [editingFeature]);

//   const handleSubmit = async (e) =>
//   {
//     e.preventDefault();
//     setLoading(true);

//     if (!formData.title || !formData.description) {
//       alert("Please fill in all required fields.");
//       setLoading(false);
//       return;
//     }

//     const form = new FormData();
//     form.append("title", formData.title);
//     form.append("description", formData.description);

//     if (uploadType === "file" && images) {
//       form.append("images", images);
//     } else if (uploadType === "url" && imageUrl) {
//       form.append("imgUrls", imageUrl);
//     }

//     try {
//       const url = editingFeature
//         ? `http://localhost:3030/feature/${editingFeature._id}`
//         : "http://localhost:3030/feature/create";
//       const method = editingFeature ? "PUT" : "POST";

//       const res = await fetch(url, {
//         method,
//         body: form,
//       });

//       const result = await res.json();
//       if (!res.ok) throw new Error(result.error || result.message);

//       onNewFeature(result.data);
//       alert(editingFeature ? "Feature updated!" : "Feature added!");
//       setIsSidebarOpen(false);
//     } catch (err) {
//       alert(`Error: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white w-full max-w-2xl mx-4 rounded-xl shadow-lg overflow-hidden">
//         <div className="flex justify-between items-center px-6 py-4 border-b">
//           <h3 className="text-xl font-bold text-gray-800">
//             {editingFeature ? "Edit Feature" : "Add Feature"}
//           </h3>
//           <button
//             onClick={() => setIsSidebarOpen(false)}
//             className="text-red-600 text-2xl hover:text-red-800 transition"
//           >
//             &times;
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4 overflow-y-auto max-h-[75vh]">
//           <div>
//             <label className="block text-xl font-medium">Title</label>
//             <input
//               type="text"
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//               className="w-full border p-2 rounded-md"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-xl font-medium">Description</label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               className="w-full border p-2 rounded-md"
//               required
//             ></textarea>
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Image Type</label>
//             <select
//               value={uploadType}
//               onChange={(e) =>
//               {
//                 setUploadType(e.target.value);
//                 setImage(null);
//                 setImageUrl("");
//                 setImagePreview(null);
//               }}
//               className="w-full border rounded-md p-2"
//             >
//               <option value="file">Upload</option>
//               <option value="url">URL</option>
//             </select>
//           </div>

//           {uploadType === "file" ? (
//             <div>
//               <label className="block text-xl font-medium">Upload Image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) =>
//                 {
//                   const file = e.target.files[0];
//                   setImage(file);
//                   setImagePreview(URL.createObjectURL(file));
//                 }}
//               />
//             </div>
//           ) : (
//             <div>
//               <label className="block text-xl font-medium">Image URL</label>
//               <input
//                 type="url"
//                 value={imageUrl}
//                 onChange={(e) =>
//                 {
//                   setImageUrl(e.target.value);
//                   setImagePreview(e.target.value);
//                 }}
//                 className="w-full border p-2 rounded-md"
//               />
//             </div>
//           )}

//           {imagePreview && (
//             <div className="pt-2">
//               <p className="text-xs text-gray-500 mb-1">Preview:</p>
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 className="w-24 h-24 object-cover border rounded-md"
//               />
//             </div>
//           )}

//           <div className="pt-4 border-t">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-2 rounded-md text-white font-medium transition ${loading ? "bg-green-300" : "bg-green-600 hover:bg-green-700"
//                 }`}
//             >
//               {loading ? "Saving..." : "Save Feature"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FeaturesForm;


import React, { useEffect, useState } from "react";

const FeaturesForm = ({ setIsSidebarOpen, onNewFeature, editingFeature }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [uploadType, setUploadType] = useState("file");
  const [images, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingFeature) {
      setFormData({
        title: editingFeature.title || "",
        description: editingFeature.description || "",
      });

      let imageSrc = "";
      if (typeof editingFeature.images === "string") {
        imageSrc = editingFeature.images.startsWith("http")
          ? editingFeature.images
          : `http://localhost:3030${editingFeature.images}`;
      } else if (Array.isArray(editingFeature.images) && editingFeature.images.length > 0) {
        imageSrc = editingFeature.images[0].startsWith("http")
          ? editingFeature.images[0]
          : `http://localhost:3030${editingFeature.images[0]}`;
      }

      setImagePreview(imageSrc);
      setUploadType("file");
      setImage(null);
      setImageUrl("");
    }
  }, [editingFeature]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.title || !formData.description) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);

    if (uploadType === "file" && images) {
      form.append("images", images);
    } else if (uploadType === "url" && imageUrl) {
      form.append("imgUrls", imageUrl);
    }

    try {
      const url = editingFeature
        ? `http://localhost:3030/feature/${editingFeature._id}`
        : "http://localhost:3030/feature/create";
      const method = editingFeature ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: form,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || result.message);

      onNewFeature(result.data);
      alert(editingFeature ? "Feature updated!" : "Feature added!");
      setIsSidebarOpen(false);
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-2xl mx-4 rounded-xl shadow-lg overflow-hidden border border-orange">
        <div className="flex justify-between items-center px-6 py-4 border-b border-orange">
          <h3 className="text-xl font-bold text-orange-500">
            {editingFeature ? "Edit Feature" : "Add Feature"}
          </h3>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-saffron text-2xl hover:text-orange-500 transition"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4 overflow-y-auto max-h-[75vh]">
          <div>
            <label className="block text-xl font-medium text-orange-500">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-saffron p-2 rounded-md bg-white text-saffron placeholder-saffron focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-xl font-medium text-orange-500">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-saffron p-2 rounded-md bg-white text-saffron placeholder-saffron focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-xl font-medium text-orange-500">Image Type</label>
            <select
              value={uploadType}
              onChange={(e) => {
                setUploadType(e.target.value);
                setImage(null);
                setImageUrl("");
                setImagePreview(null);
              }}
              className="w-full border border-saffron p-2 rounded-md bg-white text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="file">Upload</option>
              <option value="url">URL</option>
            </select>
          </div>

          {uploadType === "file" ? (
            <div>
              <label className="block text-xl font-medium text-orange-500">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file);
                  setImagePreview(URL.createObjectURL(file));
                }}
                className="w-full text-orange-500"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xl font-medium text-orange-500">Image URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImagePreview(e.target.value);
                }}
                className="w-full border border-saffron p-2 rounded-md bg-white text-saffron placeholder-saffron focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}

          {imagePreview && (
            <div className="pt-2">
              <p className="text-xs text-saffron mb-1">Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover border border-saffron rounded-md"
              />
            </div>
          )}

          <div className="pt-4 border-t border-saffron">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white font-medium transition ${
                loading ? "bg-orange-300" : "bg-orange-500 hover:bg-orange-500"
              }`}
            >
              {loading ? "Saving..." : "Save Feature"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeaturesForm;