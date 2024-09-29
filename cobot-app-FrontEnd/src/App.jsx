import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";


import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import SignUp from "views/auth/SignUp";
const App = () => {
  return (
    <Routes>
      <Route path="auth/sign-up" element={<SignUp />} />
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
  
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default App;
