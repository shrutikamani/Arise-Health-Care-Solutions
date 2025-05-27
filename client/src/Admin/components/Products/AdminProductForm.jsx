import React, { useEffect, useState } from "react";

const ProductForm = ({ setIsSidebarOpen, onNewProduct, editingProduct }) =>
{
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    feature: "",
  });
  const [uploadType, setUploadType] = useState("file");
  const [images, setImages] = useState(null);
  const [imgUrls, setImageUrls] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() =>
  {
    if (editingProduct) {
      setFormData({
        title: editingProduct.title || "",
        description: editingProduct.description || "",
        category: editingProduct.category || "",
        price: editingProduct.price || "",
        feature: Array.isArray(editingProduct.feature)
          ? editingProduct.feature.join(", ")
          : editingProduct.feature || "",
      });

      if (editingProduct.images?.[0]) {
        setImagePreview(
          editingProduct.images[0].startsWith("http")
            ? editingProduct.images[0]
            : `http://localhost:3030${editingProduct.images[0]}`
        );
      }
    }
  }, [editingProduct]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) =>
  {
    const file = e.target.files[0];
    if (file) {
      setImages(file);
      setImagePreview(URL.createObjectURL(file));
      setImageUrls("");
    }
  };

  const handleImageUrlChange = (e) =>
  {
    const url = e.target.value;
    setImageUrls(url);
    setImagePreview(url);
    setImages(null);
  };

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    setLoading(true);

    const featureArray = formData.feature
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);

    if (featureArray.length === 0) {
      alert("Feature must be a non-empty array.");
      setLoading(false);
      return;
    }

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("category", formData.category);
    payload.append("price", formData.price);
    payload.append("feature", JSON.stringify(featureArray));

    if (uploadType === "file" && images?.length > 0) {
      images.forEach((file) => payload.append("images", file));
    } else if (uploadType === "url" && imgUrls) {
      payload.append("imgUrls", imgUrls);
    }


    try {
      const endpoint = editingProduct
        ? `http://localhost:3030/product/${editingProduct._id}`
        : `http://localhost:3030/product/create`;

      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        body: payload,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || result.errors?.join(", "));
      }

      onNewProduct(result.data);
      alert(editingProduct ? "Product updated!" : "Product added!");
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-2xl mx-4 rounded-xl shadow-lg overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-orange-500 font-bold">
            {editingProduct ? "Edit Product" : "Add Product"}
          </h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-orange-500 hover:text-red-500 text-4xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 text-xl space-y-4 overflow-y-auto max-h-[75vh]">
          {/* Title */}
          <div>
            <label className="block text-orange-500 font-bold">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-800 rounded px-3 py-2 mt-1 text-black text-lg"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-orange-500 font-bold">Description</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-800 rounded px-3 py-2 mt-1 text-orange-500 text-lg"
            />
          </div>

          {/* Category and Price Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-orange-500 font-bold">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-800 rounded px-3 py-2 mt-1 text-orange-500 text-lg"
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home">Home</option>
                <option value="Books">Books</option>
                <option value="Toys">Toys</option>
              </select>
            </div>

            <div>
              <label className="block text-orange-500 font-bold">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-800 rounded px-3 py-2 mt-1 text-orange-500 text-lg"
                required
              />
            </div>
          </div>

          {/* Feature */}
          <div>
            <label className="block text-orange-500 font-bold">
              Features
            </label>
            <input
              type="text"
              name="feature"
              value={formData.feature}
              onChange={handleChange}
              className="w-full border border-gray-800 rounded px-3 py-2 mt-1 text-orange-500 text-lg"
            />
          </div>

          {/* Upload Type */}
          <div>
            <label className="block text-orange-500 font-bold">Upload Type</label>
            <select
              value={uploadType}
              onChange={(e) =>
              {
                setUploadType(e.target.value);
                setImagePreview(null);
                setImages(null);
                setImageUrls("");
              }}
              className="w-full border border-gray-800 rounded px-3 py-2 mt-1 text-orange-500 text-lg"
            >
              <option value="file">Upload Image</option>
              <option value="url">Image URL</option>
            </select>
          </div>

          {/* File or URL Input */}
          {uploadType === "file" ? (
            <div>
              <label className="block text-orange-500 font-bold">Select Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) =>
                {
                  const files = Array.from(e.target.files);
                  setImages(files);
                  setImagePreview(URL.createObjectURL(files[0]));
                  setImageUrls("");
                }}
                className="mt-1"
              />
            </div>
          ) : (
            <div>
              <label className="block text-orange-500 font-medium">Image URL</label>
              <input
                type="url"
                value={imgUrls}
                onChange={handleImageUrlChange}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
          )}

          {/* Preview */}
          {imagePreview && (
            <div className="pt-2">
              <p className="text-xs text-orange-500 mb-1">Image Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="h-24 w-24 rounded-md object-cover border"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md"
            >
              {loading ? "Saving..." : editingProduct ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
