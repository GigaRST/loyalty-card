import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "../AdminDashboard.tsx";
import Home from "../Home.tsx";
import Login from "../Login.tsx";
import Register from "../Register.tsx";
import { useUserStore } from "../store/useUserStore.ts";

const AppRoutes: React.FC = () => {
  const { user } = useUserStore();

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            user.role === "admin" ? (
              <Navigate to="/admin" />
            ) : (
              <Home />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={
          user && user.role === "admin" ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
