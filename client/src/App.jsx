import React, { useState, useEffect } from "react";
import
  {
    Routes,
    Route,
    useLocation,
    matchPath,
  } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import ProductNavbar from "./components/layout/ProductNavbar";
import Footer from "./components/layout/Footer";
import NotFound from "./pages/NotFound";
import Spinner from "./components/common/Spinner";
import "./App.css";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import AppointmentPage from "./pages/AppointmentPage";
import ContactPage from "./pages/ContactPage";
import FeaturesPage from "./pages/FeaturesPage";
import OurBlogPage from "./pages/OurBlogPage";
import OurTeamPage from "./pages/OurTeamPage";
import TestimonialPage from "./pages/TestimonialPage";
import BackToTop from "./components/common/BackToTop";

// Admin Panel Imports
import AdminLogin from "./Admin/common/AdminLogin";
import Dashboard from "./Admin/common/Dashboard";
import Blog from "./Admin/components/Blogs/AdminBlog";
import AdminLayout from "./Admin/Layouts/AdminLayout";
import AllAppointments from "./Admin/common/AllAppointments";

// Inquiry Components
import OpenInquiries from "./Admin/components/AllInquiry/OpenInquiries";
import PendingInquiries from "./Admin/components/AllInquiry/PendingInquiries";
import ClosedInquiries from "./Admin/components/AllInquiry/ClosedInquiries";
import TerminatedInquiries from "./Admin/components/AllInquiry/TerminatedInquiries";
import AllInquiry from "./Admin/components/AllInquiry/AllInquiries";

// Products
import AdminProduct from "./Admin/components/Products/AdminProduct";
import Extra from "./pages/Extra";
import ProductList from "./pages/Products/ProductList";
import ProductDetails from "./pages/Products/ProductDetails";
import CartPage from "./pages/Products/CartPage";
import OrderSummary from "./components/product/checkout/OrderSummary";
import ShippingForm from "./components/product/checkout/ShippingForm";
import ProtectedCheckoutRoute from "./routes/ProtectedCheckoutRoute";
import Checkout from "./components/product/checkout/Checkout";

// Features
import AdminFeatures from "./Admin/components/Features/AdminFeatures";

// Orders
import AdminOrders from "./Admin/components/Orders/AdminOrders";
import ProductQuestions from "./Admin/components/Products/AdminProductQuestions";
import OrderDetails from "./pages/Orders/OrderDetails";
import ManageMegaMenu from "./Admin/common/ManageMegaMenu";
import Register from "./components/product/checkout/Register";
import Login from "./components/product/checkout/Login";

const App = () =>
{
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Normalize pathname (remove trailing slash, lowercase)
  const pathname = location.pathname.toLowerCase().replace(/\/$/, "");

  const isAdminRoute = pathname.startsWith("/expert");
  const orderDetailsMatch = matchPath("/orders/:orderId", pathname);

  // Routes where footer should be hidden
  const hideFooterRoutes = [
    "/allproducts",
    "/cart",
    "/checkout",
    "/orderSummary",
    "/shipping",
    "/order-success",
    "/login",
    "/register",
  ];

  const shouldHideFooter =
    hideFooterRoutes.includes(pathname) ||
    pathname.startsWith("/product/") ||
    !!orderDetailsMatch;

  // Routes where ProductNavbar should be shown
  const productRoutes = [
    "/allproducts",
    "/cart",
    "/checkout",
    "/shipping",
    "/order-success",
    "/orderSummary",
    "/login",
    "/register",
  ];

  const isProductRoute =
    productRoutes.includes(pathname) ||
    pathname.startsWith("/product/") ||
    !!orderDetailsMatch;

  useEffect(() =>
  {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="">
        {!isAdminRoute && (
        <>
          <BackToTop />
          {loading && <Spinner />}
        </>
      )
      }

      {/* Conditionally render Navbar */}
      {!isAdminRoute && (
        isProductRoute ? <ProductNavbar /> : <Navbar />
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} /> 
        <Route path="/aboutUs" element={<AboutPage />} /> 
        <Route path="/appointmentPage" element={<AppointmentPage />} /> 
        <Route path="/contactUs" element={<ContactPage />} /> 
        <Route path="/featuresPage" element={<FeaturesPage />} />
        <Route path="/blogUs" element={<OurBlogPage />} />
        <Route path="/ourTeamPage" element={<OurTeamPage />} />
        <Route path="/testimonialPage" element={<TestimonialPage />} />
        <Route path="/extra" element={<Extra />} />
        <Route path="*" element={<NotFound />} />

        {/* Product Routes */}
        <Route path="/allProducts" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shipping" element={<ShippingForm />} /> 
        <Route path="/orderSummary" element={<OrderSummary />} /> 
        <Route
          path="/checkout"
          element={
            <ProtectedCheckoutRoute>
              <Checkout />
            </ProtectedCheckoutRoute>
          }
        />
        <Route path="/orders/:orderId" element={<OrderDetails />} />

        {/* Admin Routes */}
        <Route path="/expert/login" element={<AdminLogin />} />
        <Route path="/expert/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="blog" element={<Blog />} />
          <Route path="allAppointments" element={<AllAppointments />} />
          <Route path="settings/mega-menu" element={<ManageMegaMenu />} />
        </Route>

        {/* Inquiry Management */}
        <Route path="/expert/inquiry/all" element={<AllInquiry />} />
        <Route path="/expert/inquiry/all-open" element={<OpenInquiries />} />
        <Route path="/expert/inquiry/all-pending" element={<PendingInquiries />} />
        <Route path="/expert/inquiry/closed" element={<ClosedInquiries />} />
        <Route path="/expert/inquiry/terminated" element={<TerminatedInquiries />} />

        {/* Product Management */}
        <Route path="/expert/products/create" element={<AdminProduct />} />
        <Route path="/expert/features" element={<AdminFeatures />} />
        <Route path="/expert/orders" element={<AdminOrders />} />
        <Route path="/expert/products/questions" element={<ProductQuestions />} />
      </Routes>

      {/* Conditionally render Footer */}
      {!isAdminRoute && !shouldHideFooter && <Footer />}
    </div>
  );
};

export default App;
