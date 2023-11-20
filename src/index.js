
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import 'react-data-grid/lib/styles.css';
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import 'react-data-grid/lib/styles.css';
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { AuthProvider } from "context/AuthContext";
import ProtectedRoute from "context/ProtectedRoutes";
import ExLayout from "layouts/ExLayout";
import CabinetLayout from "layouts/CabinetLayout ";

import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-indigo/theme.css";
              
import "./index.css"
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <PrimeReactProvider>
  <BrowserRouter>
  <AuthProvider>
    <Routes>
       <Route path="/admin/*" element={
        <ProtectedRoute userType="admin">
         <AdminLayout />
        </ProtectedRoute>       
      } />
      {/* <Route path="/executive/*" element={
        <ProtectedRoute >
          <ExLayout />
        </ProtectedRoute>       
      } /> */}
      {/* <Route path="/cabinet/*" element={
        <ProtectedRoute userType="cs">
          <CabinetLayout />
        </ProtectedRoute>       
      } /> */}
     
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  </AuthProvider>
</BrowserRouter>
</PrimeReactProvider>
);
