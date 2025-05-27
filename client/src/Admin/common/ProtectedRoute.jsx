// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/authService";

const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
