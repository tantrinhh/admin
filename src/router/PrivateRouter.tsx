import React from "react";
import { Navigate, RouteProps } from "react-router-dom";

const PrivateRouter: React.FC<RouteProps> = (props) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    return <>{props.children}</>;
  } else {
    // Chưa đăng nhập, chuyển hướng về trang đăng nhập
    return <Navigate to="/login" />;
  }
};

export default PrivateRouter;
