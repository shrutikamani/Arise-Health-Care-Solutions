import React, { useEffect, useState } from 'react';
import axios from "axios";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../style.css";
import BubbleBackground from '../components/features/BubbleBackground';

const OurBlogPage = () =>
{
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedBlogId, setExpandedBlogId] = useState(null);

  useEffect(() =>
  {
    const fetchBlogs = async () =>
    {
      try {
        const response = await axios.get("http://localhost:3030/blog/all");
        setBlogs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong while fetching blogs");
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);
  return (
    <>
      {/* Breadcrumb Header */}
     
        <div className=" w-full bg-breadcrumb">
          <div className="max-w-6xl mx-auto text-center py-8 sm:py-10 lg:py-12 px-4">
            <p className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 animate__animated animate__fadeInDown">
              Blog
            </p>
            <ul className="flex justify-center gap-2 sm:gap-4 text-lg sm:text-xl lg:text-2xl text-white animate__animated animate__fadeInDown">
              <li>
                <Link to="/" className="hover:text-orange-600">Home</Link>
              </li>
              <li className="text-info">Blog</li>
            </ul>
          </div>
        </div>
  

      {/* Blog Cards Section */}
      <div className="w-full "style={{ backgroundColor: "rgba(240, 242, 245, 0.9)" }}>
      <BubbleBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-12 animate__animated animate__fadeInUp" >
          {loading ? (
            <p className="text-center text-lg text-gray-600">Loading blogs...</p>
          ) : error ? (
            <p className="text-center text-lg text-red-600">{error}</p>
          ) : blogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-lg shadow-md flex flex-col justify-between transition hover:shadow-lg"
                >
                  <div className="p-5">
                    <h5 className="text-xl font-bold text-gray-900 mb-3 capitalize">
                      {blog.Title}
                    </h5>
                    {/* <div
                    className="text-gray-600 text-base line-clamp-3 mb-4 blog-content"
                    dangerouslySetInnerHTML={{ __html: blog.Content }}
                  ></div> */}
                    <div className="text-gray-600 text-base mb-4 blog-content">
                      <div
                        className={`${expandedBlogId === blog._id ? '' : 'line-clamp-3'} transition-all duration-300`}
                        dangerouslySetInnerHTML={{ __html: blog.Content }}
                      ></div>
                      <span
                        onClick={() =>
                          setExpandedBlogId(expandedBlogId === blog._id ? null : blog._id)
                        }
                        className="cursor-pointer text-blue-500 hover:underline text-md mb-1 inline-block"
                      >
                        {expandedBlogId === blog._id ? 'Show less' : 'Read More...'}
                      </span>
                    </div>

                  </div>
                  <div className="px-5 py-3 flex justify-between items-center text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt />
                      {blog.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                        : "Unknown date"}
                    </span>
                    <Link
                      to={`/blog/${blog._id}`}
                      className="text-cyan-600 hover:underline font-medium uppercase"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center col-span-full text-lg text-gray-600">
              No blogs available.
            </p>
          )}
        </div>
      </div>
      {/* Inline CSS for Spacing Between Images and Content */}
      <style jsx>{`
        .blog-content img {
          margin-top: ; /* Tailwind's mt-2 equivalent */
          margin-bottom: 2rem; /* Add bottom margin for balance */
        }
      `}</style>
    </>
  );
};

export default OurBlogPage;