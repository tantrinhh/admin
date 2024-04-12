import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axiox";
import { toast } from "react-toastify"; // Import toast for notifications

const Registerr = () => {
  const [useremail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await api.post("users/register", {
        useremail,
        password,
        fullname,
        phone,
      });
      // Lưu token vào local storage
      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("refreshToken", response.data.refresh_token);
      localStorage.setItem("isLoggedIn", "true");

      // Hiển thị thông báo và chuyển hướng đến trang sản phẩm
      toast("Đăng ký thành công");
      navigate("/admin/products");
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      toast("Đăng ký thất bại !!!");
    }
  };

  return (
    <div className="mt-20 border-2 border-solid  rounded-lg text-white bg-[#000033] mx-auto w-96 border-[#081229] p-6">
      {" "}
      <div className="w-80 mx-auto">
        <h2 className="text-2xl text-center items-center font-bold mb-4">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
          <div className="mx-auto items-center ">
            {" "}
            <label htmlFor="useremail">Email:</label>
            <div className="flex items-center mb-3">
              {" "}
              <input
                type="email"
                id="useremail"
                value={useremail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
                className="border-2 border-red-600 rounded-md px-3 py-2 text-black w-72 h-8"
              />
            </div>
            <label htmlFor="password">Password:</label>
            <div className="flex items-center mb-3">
              {" "}
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-2 border-red-600 rounded-md px-3 py-2 text-black w-72 h-8"
              />
            </div>
            <label htmlFor="fullname">Full Name:</label>
            <div className="flex items-center mb-3">
              <input
                type="text"
                id="fullname"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="border-2 border-red-600 rounded-md px-3 py-2 text-black w-72 h-8"
              />
            </div>
            <label htmlFor="phone">Phone:</label>
            <div className="flex items-center mb-3">
              {" "}
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="border-2 border-red-600 rounded-md px-3 py-2 text-black w-72 h-8"
              />
            </div>
            <div className="text-center flex gap-4 justify-around">
              <button
                type="submit"
                value="Register"
                className="bg-blue-600 text-white  px-4 py-2 rounded-md hover:bg-blue-800"
              >
                Register
              </button>
              <Link to="/">
                {" "}
                <button className="bg-red-500 text-white  px-4 py-2 rounded-md hover:bg-red-700">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registerr;
