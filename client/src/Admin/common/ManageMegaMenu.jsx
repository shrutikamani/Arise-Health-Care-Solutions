import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMegaMenu, updateMegaMenu, addMegaMenu } from "../../redux/slices/ariseSlice";
import { FaPlusCircle, FaTrash, FaSave, FaCheck } from "react-icons/fa";
import AdminSidebar from "./AdminSaidBar";

const ManageMegaMenu = () => {
  const dispatch = useDispatch();
  const { menuItems, megaMenuStatus, megaMenuError } = useSelector((state) => state.arise);
  const megaMenu = menuItems.find((item) => item.megaMenu)?.megaMenu || [];
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ title: "", items: [{ name: "", path: "" }] });
  const [localError, setLocalError] = useState(null);

  // Fetch mega menu on mount
  useEffect(() => {
    dispatch(getMegaMenu()).unwrap().catch((err) => {
      setLocalError(err || "Failed to load mega menu");
    });
  }, [dispatch]);

  // Sync local state with Redux store
  useEffect(() => {
    setCategories(JSON.parse(JSON.stringify(megaMenu))); // Deep copy
  }, [megaMenu]);

  // Handle adding a new category
  const handleAddCategory = () => {
    if (!newCategory.title.trim()) {
      setLocalError("Category title is required");
      return;
    }
    if (newCategory.items.some((item) => !item.name.trim() || !item.path.trim())) {
      setLocalError("All items must have a name and path");
      return;
    }

    dispatch(addMegaMenu(newCategory))
      .unwrap()
      .then(() => {
        setNewCategory({ title: "", items: [{ name: "", path: "" }] });
        setLocalError(null);
      })
      .catch((err) => {
        setLocalError(err || "Failed to add category");
      });
  };

  // Handle adding a new item to a category
  const handleAddItem = (categoryIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].items.push({ name: "", path: "" });
    setCategories(updatedCategories);
  };

  // Handle category title change
  const handleCategoryChange = (index, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index][field] = value;
    setCategories(updatedCategories);
  };

  // Handle item field change
  const handleItemChange = (categoryIndex, itemIndex, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].items[itemIndex][field] = value;
    setCategories(updatedCategories);
  };

  // Handle deleting a category
  const handleDeleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    dispatch(updateMegaMenu({ categories: updatedCategories }))
      .unwrap()
      .then(() => {
        setLocalError(null);
      })
      .catch((err) => {
        setLocalError(err || "Failed to delete category");
      });
  };

  // Handle deleting an item
  const handleDeleteItem = (categoryIndex, itemIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].items = updatedCategories[categoryIndex].items.filter(
      (_, i) => i !== itemIndex
    );
    dispatch(updateMegaMenu({ categories: updatedCategories }))
      .unwrap()
      .then(() => {
        setLocalError(null);
      })
      .catch((err) => {
        setLocalError(err || "Failed to delete item");
      });
  };

  // Handle updating a specific item
  const handleUpdateItem = (catIndex, itemIndex) => {
    const itemToUpdate = categories[catIndex].items[itemIndex];
    if (!itemToUpdate.name.trim() || !itemToUpdate.path.trim()) {
      setLocalError("Item name and path are required");
      return;
    }
    dispatch(updateMegaMenu({ categories: [itemToUpdate], catIndex, itemIndex }))
      .unwrap()
      .then(() => {
        setLocalError(null);
      })
      .catch((err) => {
        setLocalError(err || "Failed to update item");
      });
  };

  // Handle updating an entire category
  const handleUpdateCategory = (index) => {
    const categoryToUpdate = categories[index];
    if (!categoryToUpdate.title.trim()) {
      setLocalError("Category title is required");
      return;
    }
    if (categoryToUpdate.items.some((item) => !item.name.trim() || !item.path.trim())) {
      setLocalError("All items must have a name and path");
      return;
    }
    dispatch(updateMegaMenu({ categories: [categoryToUpdate], catIndex: index }))
      .unwrap()
      .then(() => {
        setLocalError(null);
      })
      .catch((err) => {
        setLocalError(err || "Failed to update category");
      });
  };

  // Handle saving all changes
  const handleSave = () => {
    if (categories.some((cat) => !cat.title.trim())) {
      setLocalError("All categories must have a title");
      return;
    }
    if (categories.some((cat) => cat.items.some((item) => !item.name.trim() || !item.path.trim()))) {
      setLocalError("All items must have a name and path");
      return;
    }
    dispatch(updateMegaMenu({ categories }))
      .unwrap()
      .then(() => {
        setLocalError(null);
      })
      .catch((err) => {
        setLocalError(err || "Failed to save changes");
      });
  };

  return (
    <div className="container-fluid mx-auto p-6 bg-white min-h-screen">
      {/* Sidebar */}
      <div className="">
        <AdminSidebar />
      </div>
      <div className="max-w-4xl mt-40 mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-orange-500">Manage Mega Menu</h1>

        {/* Error Display */}
        {(localError || megaMenuError) && (
          <p className="text-[#3f3e3d] mb-4">{localError || megaMenuError}</p>
        )}

        {/* Add New Category */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#181716]">Add New Category</h2>
          <input
            type="text"
            placeholder="Category Title"
            value={newCategory.title}
            onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
            className="border border-[#FF6600] p-3 mb-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-[#3f3e3d] "
          />
          {newCategory.items.map((item, index) => (
            <div key={index} className="flex space-x-3 mb-3 items-center">
              <input
                type="text"
                placeholder="Item Name"
                value={item.name}
                onChange={(e) => {
                  const updatedItems = [...newCategory.items];
                  updatedItems[index].name = e.target.value;
                  setNewCategory({ ...newCategory, items: updatedItems });
                }}
                className="border border-[#FF6600] p-3 w-1/2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-[#3f3e3d] "
              />
              <input
                type="text"
                placeholder="Item Path"
                value={item.path}
                onChange={(e) => {
                  const updatedItems = [...newCategory.items];
                  updatedItems[index].path = e.target.value;
                  setNewCategory({ ...newCategory, items: updatedItems });
                }}
                className="border border-[#FF6600] p-3 w-1/2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-[#3f3e3d] "
              />
              {index > 0 && (
                <button
                  onClick={() => {
                    const updatedItems = newCategory.items.filter((_, i) => i !== index);
                    setNewCategory({ ...newCategory, items: updatedItems });
                  }}
                  className="text-[#3f3e3d] hover:text-[#FF6600]"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => setNewCategory({ ...newCategory, items: [...newCategory.items, { name: "", path: "" }] })}
            className="text-[#3f3e3d] text-xl flex items-center mb-4 "
          >
            <FaPlusCircle className="mr-2 " /> Add Item
          </button>
          <button
            onClick={handleAddCategory}
            className="bg-[#FF6600]  text-[28px] text-white px-4 py-2 rounded-md hover:bg-[#ff7a21] disabled:bg-[#FF6600]"
            disabled={megaMenuStatus === "loading"}
          >
            Add Category
          </button>
        </div>

        {/* Existing Categories */}
        {categories.length === 0 && megaMenuStatus !== "loading" ? (
          <p className="text-[#3f3e3d] mb-4">No categories available. Add a new category above.</p>
        ) : (
          categories.map((category, catIndex) => (
            <div key={catIndex} className="mb-8 p-6 bg-white rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={category.title}
                    onChange={(e) => handleCategoryChange(catIndex, "title", e.target.value)}
                    className="border border-[#FF6600] p-3 w-1/2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-[#3f3e3d] placeholder-[#FF9933]"
                  />
                  <button
                    onClick={() => handleUpdateCategory(catIndex)}
                    className="bg-white text-md text-[#3f3e3d] px-4 py-2 rounded-md hover:bg-[#FFCC99] disabled:bg-[#FFCC99]"
                    disabled={megaMenuStatus === "loading"}
                  >
                    <FaSave className="inline text-md mr-2 text-[#3f3e3d]" /> Update Category
                  </button>
                </div>
                <button
                  onClick={() => handleDeleteCategory(catIndex)}
                  className="text-[#3f3e3d]  flex items-center"
                >
                  <FaTrash  /> Delete Category
                </button>
              </div>
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex space-x-3 mb-3 items-center">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(catIndex, itemIndex, "name", e.target.value)}
                    className="border border-[#FF6600] p-3 w-1/2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-[#3f3e3d] placeholder-[#FF9933]"
                  />
                  <input
                    type="text"
                    value={item.path}
                    onChange={(e) => handleItemChange(catIndex, itemIndex, "path", e.target.value)}
                    className="border border-[#FF6600] p-3 w-1/2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-[#3f3e3d] placeholder-[#FF9933]"
                  />
                  <button
                    onClick={() => handleUpdateItem(catIndex, itemIndex)}
                    className="text-[#3f3e3d] "
                    disabled={megaMenuStatus === "loading"}
                  >
                    <FaSave className="text-[#3f3e3d]" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(catIndex, itemIndex)}
                    className="text-[#3f3e3d] "
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleAddItem(catIndex)}
                className="text-[#3f3e3d] flex items-center "
              >
                <FaPlusCircle className="mr-2 text-[#3f3e3d]" /> Add Item
              </button>
            </div>
          ))
        )}

        {/* Save All Changes Button */}
        <div className="mb-4 flex items-center space-x-4">
          <button
            onClick={handleSave}
            className="bg-white text-[#3f3e3d] px-4 py-2 rounded-md hover:bg-[#FFCC99] disabled:bg-[#FFCC99]"
            disabled={megaMenuStatus === "loading"}
          >
            <FaCheck className="inline mr-2 text-[#3f3e3d]" /> Save All Changes
          </button>
          {megaMenuStatus === "loading" && <p className="text-[#3f3e3d]">Saving...</p>}
          {megaMenuStatus === "succeeded" && !megaMenuError && !localError && (
            <p className="text-[#3f3e3d]">Saved successfully!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMegaMenu;