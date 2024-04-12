import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../components/Login/Login";
import ProductList from "../components/ProductList";
import AddEditProduct from "../components/AddEditProduct";
import PrivateRouter from "./PrivateRouter";
import Logout from "../components/Logout";
import Register from "../pages/register/Register";
const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin/products"
            element={
              <PrivateRouter>
                <ProductList />
              </PrivateRouter>
            }
          />
          <Route
            path="/addProduct"
            element={
              <PrivateRouter>
                <AddEditProduct />
              </PrivateRouter>
            }
          />
          <Route
            path="/editProduct/:id"
            element={
              <PrivateRouter>
                <AddEditProduct />
              </PrivateRouter>
            }
          />
          <Route path="/admin/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
