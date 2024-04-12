// components/Login.tsx
import "./Login.css";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axiox";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
//import login from "../../images/logo/login.jpg";
const Login = (chirdren: any) => {
  const [formData, setFormData] = useState({ useremail: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    // alert("12321")
    // e.preventDefault();
    try {
      const response = await api.post("users/login", formData);
      // Lưu token vào cookies hoặc local storage nếu cần
      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("refreshToken", response.data.refresh_token);
      // localStorage.setItem("isLoggedIn", "true");
      toast("Đăng nhập thành công");
      navigate("/admin/products");
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      toast("Đăng nhập thất bại !!!");
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex justify-items-center h-screen  w-full  items-center my-auto text-center">
        <div className="w-full h-screen inset-0 bg-gradient-to-t from-purple-500 to-pink-600 animate-wave flex justify-items-center ">
          {" "}
          {/* <img className="h-screen absolute top-0" src={login} alt="Logo" /> */}
          <div className="  my-auto mx-auto text-center items-center ">
            {" "}
            <div className=" border-2 rounded bg-white w-[450px] mx-auto ">
              <h1 className="font-bold text-2xl my-4">Sign in</h1>
              <div className="flex justify-center gap-4 mb-5">
                <a href="#" className="border border-solid rounded-full p-2">
                  <FaFacebook className="w-8 h-8 text-blue-600" />
                </a>
                <a href="#" className="border border-solid rounded-full p-2">
                  <FcGoogle className="w-8 h-8" />
                </a>
                <a href="#" className="border border-solid rounded-full p-2">
                  <FaInstagram className="w-8 h-8 text-[#833AB4]" />
                </a>
              </div>
              <span className="text-sm block mb-4">or use your account</span>
              <div className="text-left ml-8 mb-2">Email :</div>
              <div>
                {" "}
                <input
                  type="email"
                  name="useremail"
                  value={formData.useremail}
                  placeholder="Enter your email"
                  onChange={handleChange}
                  className="bg-gray-200 rounded-lg px-4 py-2 w-96 mb-4"
                />
              </div>
              <div className="text-left ml-8 mb-2">Password :</div>
              <div className="relative">
                <input
                  name="password"
                  value={formData.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="6+ Characters, 1 Capital letter"
                  onChange={handleChange}
                  className="bg-gray-200 rounded-lg px-4 py-2 w-96 mb-4"
                />
                <span
                  className="absolute  top-5 right-11 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div>
                {" "}
                <a href="#" className="text-sm mb-40">
                  Forgot your password?
                </a>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="rounded-full mt-5 border border-red-600 bg-red-600 text-white font-bold px-6 py-2 mb-4"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
        <div className=" relative flex justify-items-center h-screen  bg-[#ff416c] w-full ">
          <div className=" my-auto mx-auto text-center  ">
            <div className="overlay-panel overlay-right">
              <h1 className="font-bold text-2xl mb-4">Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className=" rounded-2xl px-2 py-1 mt-4 text-white border border-solid">
                <Link to="/register" className=" font-semibold text-xl">
                  Sign Up
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
