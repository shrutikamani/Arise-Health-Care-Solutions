import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { IoIosAdd, IoIosAddCircle } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useBlog } from "../../context/BlogProvider";
import AdminSidebar from "../../common/AdminSaidBar";
import CKEditorUploadAdapter from "./CKEditorUploadAdapter"; // Adjust the import path as necessary
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const Blog = () =>
{
  const { posts, addBlog, deleteBlog, updateBlog } = useBlog();
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = () =>
  {
    if (!Title.trim() || !Content.trim()) return;
    if (editId) {
      updateBlog(editId, { Title, Content });
      setEditId(null);
    } else {
      addBlog({ Title, Content });
    }
    setTitle("");
    setContent("");
    setEditId(null);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      {/* Sidebar */}
      <div className="">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="container mt-44 w-full md:w-3/4 lg:w-4/5 p-4 ">
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 px-6 py-2 bg-orange-500 hover:bg-orange-700 text-white font-bold text-lg rounded-md"
        > 
          {showForm ? (
            "Close Blog Form"
          ) : (
            <span className="flex items-center text-xl gap-2">
              <IoIosAdd className="tex-2xl" /> Add Blog
            </span>
          )}

        </button>

        {/* Blog Form */}
        {showForm && (
          <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 border border-saffron">
            <h2 className="text-center text-2xl font-semibold text-saffron mb-4">
              {editId ? "Edit Blog" : "Write a Blog"}
            </h2>
            <div className="mb-4">
              <label className="block text-xl font-medium text-saffron mb-1">Title</label>
              <input
                type="text"
                placeholder="Enter blog title"
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-saffron rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-saffron bg-white placeholder-saffron"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xl font-medium text-saffron mb-1">Content</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={Content}
                  onReady={(editor) =>
                  {
                    editor.plugins.get("FileRepository").createUploadAdapter = (loader) =>
                    {
                      return new CKEditorUploadAdapter(loader);
                    };
                  }}
                  onChange={(event, editor) =>
                  {
                    const data = editor.getData();
                    setContent(data);
                  }}
                  config={{
                    toolbar: {
                      items: [
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "link",
                        'imageUpload',
                        "bulletedList",
                        "numberedList",
                        "|",
                        "undo",
                        "redo",
                        "Essentials",
                        "Paragraph",
                        "Bold",
                        "Italic",
                        "Link",
                        "List",
                        "Heading",
                        "Font",
                        "Alignment",
                        "Table",
                        "TableToolbar",
                        "BlockQuote",
                        "MediaEmbed",
                        "SpecialCharacters",
                        "FontColor",
                        "FontBackgroundColor",
                        "FindAndReplace",
                        "HorizontalLine",
                        "RemoveFormat"      
                      ],
                    },
                  }}
                />
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {/* Add or Update Blog Button */}
              <button
                onClick={handleSubmit}
                className={`flex items-center gap-x-2 px-6 py-2 text-white font-medium rounded-md transition ${editId
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-orange-500 hover:bg-orange-700"
                  }`}
              >
                {editId ? "Update Blog" : "Add Blog"}
                <IoIosAdd className="text-2xl text-saffron" />
              </button>

              {/* Back Button */}
              <Link to="/expert/dashboard">
                <button className="flex items-center gap-x-2 px-6 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-gray-800 transition">
                  <IoMdArrowRoundBack className="text-xl text-saffron" />
                  Back
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Blog List */}
        <div className="mt-10">
          <h3 className="text-center text-3xl font-bold text-orange-500  mb-6">
            📝 All Blogs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((blog) => (
              <div
                key={blog._id}
                className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between border border-saffron hover:shadow-xl transition duration-300"
              >
                <div>
                  <h4 className="text-2xl font-semibold text-saffron mb-2">{blog.Title}</h4>
                  {/* You can uncomment to show preview */}
                  {/* <div className="mt-2 text-saffron line-clamp-3" dangerouslySetInnerHTML={{ __html: blog.Content }}></div> */}
                </div>

                <div className="mt-6 flex justify-between items-center gap-2">
                  <button
                     className="flex items-center gap-2 bg-white-500 text-xl text-orange-500 px-2 py-2 rounded-md hover:bg-white-500 transition"
                    onClick={() =>
                    {
                      setSelectedBlog(blog);
                      setShowModal(true);
                    }}
                  >
                    <FaEye className="text-saffron" />
                    Read
                  </button>

                  <button
                  className="flex items-center gap-2 bg-white-500 text-xl text-orange-500 px-2 py-2 rounded-md hover:bg-white-500 transition"
                    onClick={() =>
                    {
                      setEditId(blog._id);
                      setTitle(blog.Title);
                      setContent(blog.Content);
                      setShowForm(true);
                    }}
                  >
                    <FaEdit className="text-saffron" />
                    Update
                  </button>

                  <button
                    className="flex items-center gap-2 bg-white-500 text-xl text-orange-500 px-2 py-2 rounded-md hover:bg-white-500 transition"
                    onClick={() => deleteBlog(blog._id)}
                  >
                    <FaTrash className="text-saffron" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal read blog */}
        {showModal && selectedBlog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full border border-saffron">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-bold text-saffron">{selectedBlog.Title}</h4>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-saffron text-lg font-bold"
                >
                  ✖
                </button>
              </div>
              <div
                className="text-saffron"
                dangerouslySetInnerHTML={{ __html: selectedBlog.Content }}
              ></div>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 px-4 py-2 bg-gray-700 text-saffron rounded-md hover:bg-gray-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;