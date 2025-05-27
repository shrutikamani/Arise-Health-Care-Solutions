// // import React from "react";
// // import { FaCalendarAlt, FaComments } from "react-icons/fa";
// // import { useSelector } from "react-redux";
// // import { Link } from "react-router-dom";
// // import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
// // import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Swiper modules
// // import "swiper/css"; // Swiper styles
// // import "swiper/css/navigation";
// // import "swiper/css/pagination";
// // import "../style.css";

// // const OurBlog = () => {
// //   // Fetch blog data from Redux
// //   const blogPosts = useSelector((state) => state.arise.blogPosts) || [
// //     {
// //       imgSrc: "img/blog-1.jpg",
// //       date: "01 Jan 2045",
// //       comments: 3,
// //       title: "Remove Back Pain While Working on a Physio",
// //       excerpt:
// //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium hic consequatur beatae architecto.",
// //     },
// //     {
// //       imgSrc: "img/blog-2.jpg",
// //       date: "01 Jan 2045",
// //       comments: 3,
// //       title: "Benefits of a Weekly Physiotherapy Session",
// //       excerpt:
// //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium hic consequatur beatae architecto.",
// //     },
// //     {
// //       imgSrc: "img/blog-3.jpg",
// //       date: "01 Jan 2045",
// //       comments: 3,
// //       title: "Regular Exercise Can Slow Ageing Process",
// //       excerpt:
// //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium hic consequatur beatae architecto.",
// //     },
// //   ];

// //   return (
// //     <div className="container blog py-5">
// //       <div className="container py-5">
// //         <div className="section-title mb-5 wow fadeInUp" data-wow-delay="0.1s">
// //           <div className="sub-style">
// //             <h4 className="sub-title px-3 mb-0">Our Blog</h4>
// //           </div>
// //           <h1 className="display-3 mb-4">
// //             Excellent Facility and High-Quality Therapy
// //           </h1>
// //           <p className="mb-0">
// //             Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
// //             deleniti amet at atque sequi quibusdam cumque itaque repudiandae
// //             temporibus, eius nam mollitia voluptas maxime veniam necessitatibus
// //             saepe in ab? Repellat!
// //           </p>
// //         </div>

// //         {/* Swiper Slider */}
// //         <Swiper
// //           modules={[Navigation, Pagination, Autoplay]}
// //           navigation
// //           pagination={{ clickable: true }}
// //           autoplay={{ delay: 3000 }}
// //           loop={true}
// //           spaceBetween={20}
// //           slidesPerView={1}
// //           breakpoints={{
// //             768: { slidesPerView: 2 }, // Show 2 slides on tablets
// //             1024: { slidesPerView: 3 }, // Show 3 slides on desktops
// //           }}
// //           className="swiper-container"
// //         >
// //           {blogPosts.map((post, index) => (
// //             <SwiperSlide key={index}>
// //               <div className="blog-item rounded">
// //                 <div className="blog-img">
// //                   <img src={post.imgSrc} className="img-fluid w-100" alt="Blog" />
// //                 </div>
// //                 <div className="blog-content p-4">
// //                   <div className="d-flex justify-content-between mb-4">
// //                     <p className="mb-0 text-muted">
// //                       <FaCalendarAlt className="text-info" /> {post.date}
// //                     </p>
// //                     <Link to="/" className="text-muted">
// //                       <FaComments className="text-info" /> {post.comments} Comments
// //                     </Link>
// //                   </div>
// //                   <Link to="/" className="h4">{post.title}</Link>
// //                   <p className="my-4">{post.excerpt}</p>
// //                   <Link to="/" className="btn btn-info rounded-pill text-white py-2 px-4 mb-1">
// //                     Read More
// //                   </Link>
// //                 </div>
// //               </div>
// //             </SwiperSlide>
// //           ))}
// //         </Swiper>
// //       </div>
// //     </div>
// //   );
// // };

// // export default OurBlog;


// // src/components/OurBlog.jsx

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { FaCalendarAlt, FaComments } from "react-icons/fa";

// const OurBlog = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await axios.get("http://localhost:3030/blog/all");
//         setBlogs(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message || "Something went wrong");
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   return (
//     <div className="py-10 px-4 md:px-10 bg-gray-50">
//       <div className="text-center mb-10">
//         <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2">
//           Our Blog
//         </h4>
//         <h1 className="text-3xl md:text-4xl font-bold mb-4">
//           Excellent Facility and High-Quality Therapy
//         </h1>
//         <p className="text-gray-600 max-w-3xl mx-auto">
//           Stay informed with expert tips, case studies, and wellness insights from our professionals.
//         </p>
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading blogs...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">Error: {error}</p>
//       ) : blogs.length === 0 ? (
//         <p className="text-center text-gray-500">No blog posts available.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
//           {blogs.map((post, index) => {
//             let imageSrc = "";
//             if (typeof post.images === "string") {
//               imageSrc = post.images.startsWith("http")
//                 ? post.images
//                 : `http://localhost:3030${post.images.startsWith("/") ? post.images : "/" + post.images}`;
//             } else if (Array.isArray(post.images) && post.images.length > 0) {
//               imageSrc = post.images[0].startsWith("http")
//                 ? post.images[0]
//                 : `http://localhost:3030/${post.images[0]}`;
//             }

//             const title = post.Title || "Untitled Blog";
//             const plainText = post.Content?.replace(/<[^>]+>/g, "") || "";
//             const excerpt = plainText.length > 120 ? plainText.slice(0, 120) + "..." : plainText;
//             const date = new Date(post.createdAt || Date.now()).toLocaleDateString();

//             return (
//               <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
//                 <img src={imageSrc} alt="Blog" className="w-full h-48 object-cover" />
//                 <div className="p-5">
//                   <div className="flex justify-between text-sm text-gray-500 mb-3">
//                     <span className="flex items-center gap-1">
//                       <FaCalendarAlt className="text-blue-500" />
//                       {date}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <FaComments className="text-blue-500" />
//                       {post.comments || 0} Comments
//                     </span>
//                   </div>

//                   <Link to={`/blog/${post._id}`} className="text-lg font-semibold hover:text-blue-600 block mb-2">
//                     {title}
//                   </Link>

//                   <p className="text-gray-600 mb-4 line-clamp-3">
//                     {excerpt}
//                   </p>

//                   <Link to={`/blog/${post._id}`} className="inline-block bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 text-sm">
//                     Read More
//                   </Link>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OurBlog;

