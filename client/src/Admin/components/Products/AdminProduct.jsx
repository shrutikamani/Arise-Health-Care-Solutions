import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaTrash, FaEdit } from "react-icons/fa";
import AdminSidebar from "../../common/AdminSaidBar";
import ProductForm from "./AdminProductForm";

const AdminProduct = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3030/product/allProducts");
        if (!response.ok) throw new Error("Failed to fetch products");
        const result = await response.json();
        if (result.success) {
          const updatedProducts = result.data.map(product => ({
            ...product,
            showMoreDescription: false,
            showMoreFeature: false,
          }));
          setProducts(updatedProducts);
        } else {
          throw new Error("Error in response data");
        }
      } catch (error) {
        alert(error.message);
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsSidebarOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleNewProduct = (newProduct) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === newProduct.id ? newProduct : p))
      );
      setEditingProduct(null);
    } else {
      setProducts((prev) => [
        ...prev,
        { ...newProduct, showMoreDescription: false, showMoreFeature: false },
      ]);
    }
    setIsSidebarOpen(false);
    window.location.reload();
  };

  const handleAddProductClick = () => {
    setEditingProduct(null);
    setIsSidebarOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsSidebarOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!productId) return alert("Invalid Product ID");
    if (!window.confirm("Are you Sure you Want to Delete This Product?")) return;
    try {
      const response = await fetch(`http://localhost:3030/product/${productId}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to delete product");
      setProducts((prev) => prev.filter((product) => product._id !== productId));
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  const handleToggleDescription = (productId) => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === productId ? { ...p, showMoreDescription: !p.showMoreDescription } : p
      )
    );
  };

  const handleToggleFeature = (productId) => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === productId ? { ...p, showMoreFeature: !p.showMoreFeature } : p
      )
    );
  };

  const getTruncatedText = (text, showMore) => {
    if (!text || typeof text !== "string") return text;
    return text.length > 50 ? (showMore ? text : text.slice(0, 50) + "...") : text;
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed h-screen text-orange-500">
        <AdminSidebar />
      </div>

      {/* Content */}
      {/* <div className="container-fluid mt-20 w-full p-4"> */}
      <div className="pt-44 px-6 pb-6"> 
        <div className="flex justify-end mb-4">
        <button
            className="flex text-xl font-semibold items-center gap-2 px-4 py-2 bg-orange-500  text-white rounded-md shadow hover:bg-white-500 transition"
            onClick={handleAddProductClick}
          >
            <FaPlusCircle /> Add Product
          </button>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="flex flex-col rounded-lg bg-gray-100 transition duration-500 shadow-md hover:shadow-lg"
              >
                {/* <img
                  src={
                    product.images && product.images.length > 0
                      ? product.images[0].startsWith("http")
                        ? product.images[0]
                        : `http://localhost:3030${product.images[0]}`
                      : "/default-placeholder.png"
                  }
                  alt="Product"
                  className="w-full h-[20rem] object-cover rounded-t-lg"
                /> */}
                <div className="p-4 flex flex-col justify-between flex-1 border border-blue-400 rounded-b-lg">
                  <div className="flex-1">
                    <h1 className="text-2xl capitalize font-bold">{product.title}</h1>

                    {/* <p className="text-md text-gray-600 leading-relaxed break-words">
                      {getTruncatedText(product.description, product.showMoreDescription)}
                    </p>
                    {product.description?.length > 50 && (
                      <button
                        onClick={() => handleToggleDescription(product._id)}
                        className="text-blue-500 text-sm mt-2 hover:underline"
                      >
                        {product.showMoreDescription ? "Show Less" : "Read More"}
                      </button>
                    )}

                    <p className="text-md text-gray-600 break-words">
                      {Array.isArray(product.feature)
                        ? getTruncatedText(product.feature.join(", "), product.showMoreFeature)
                        : getTruncatedText(product.feature, product.showMoreFeature)}
                    </p>
                    {Array.isArray(product.feature) &&
                      product.feature.join(", ").length > 50 && (
                        <button
                          onClick={() => handleToggleFeature(product._id)}
                          className="text-blue-500 text-sm mt-2 hover:underline"
                        >
                          {product.showMoreFeature ? "Show Less" : "Read More"}
                        </button>
                      )}

                    <p className="text-sm text-gray-500 mt-2">
                      Category: <span className="font-semibold">{product.category}</span>
                    </p>*/}
                  </div> 

                  <div className="flex justify-between items-center mt-4">
                    <button
                      className="flex items-center gap-2 bg-white-500 text-2xl text-orange-500 px-4 py-2 rounded-md hover:bg-white-500 transition"
                      onClick={() => handleEditProduct(product)}
                    > 
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="flex items-center gap-2 bg-white-500 text-2xl text-orange-500 px-4 py-2 rounded-md hover:bg-white-500 transition"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-orange-500 col-span-full">No products added yet.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-screen overflow-y-auto p-6 relative">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-3 right-3 text-orange-500 hover:text-orange-500 text-xl font-bold"
            >
              &times;
            </button>
            <ProductForm
              setIsSidebarOpen={setIsSidebarOpen}
              onNewProduct={handleNewProduct}
              editingProduct={editingProduct}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProduct;
