import React, { useState, useEffect } from "react";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Layout from "./components/Layout";
import http from "./util/http";
import NotFound from "./components/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Context from "./util/Context";
import { Navigate } from "react-router-dom";
import AdminLayout from "./components/Admin/AdminLayout";
import ProductDescription from "./components/ProductDescription";

const App = () => {
  const [sessionLoading, setSessionLoading] = useState(null);
  const [session, setSession] = useState(null);
  const [productDetails,setProductDetails] = useState({})
 

  // console.log(session)
  return (
   <Context.Provider value={{ session, sessionLoading, setSession, setSessionLoading,productDetails,setProductDetails }}>
      <BrowserRouter>
        <Routes>

          {/* Public home route */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products/:slug" element={<ProductDescription />} />
          </Route>

          {/* ✅ Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminLayout/>}/>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;
