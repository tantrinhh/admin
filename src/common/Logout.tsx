// Logout.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Xóa token hoặc các dữ liệu khác đánh dấu việc đăng nhập
    localStorage.removeItem("isLoggedIn");
    localStorage.clear();
    // Chuyển hướng về trang đăng nhập
    navigate("/login");
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
