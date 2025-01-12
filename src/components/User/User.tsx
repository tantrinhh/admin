import React, { useEffect, useState } from "react";

interface User {
    useremail: string;

    fullname: string;
    phone: string;
}
const UserInfoPage: React.FC = () => {
    const [user, setUser] = useState<{ fullname: string; useremail: string; phone: string; } | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData)); // Chuyển chuỗi JSON từ localStorage thành object
        }
    }, []);

    if (!user) {
        return <p className="text-center text-red-500">Không tìm thấy thông tin người dùng</p>;
    }

    return (
        <div className="min-h-screen  flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">Thông Tin Người Dùng</h1>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Họ và Tên</label>
                        <p className="text-gray-700 font-semibold">{user.fullname}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Email</label>
                        <p className="text-gray-700 font-semibold">{user.useremail}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500">Số Điện Thoại</label>
                        <p className="text-gray-700 font-semibold">{user.phone}</p>
                    </div>
                </div>
                <button
                    className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                    onClick={() => {
                        localStorage.removeItem("user"); // Xóa thông tin người dùng
                        window.location.href = "/"; // Quay lại trang đăng nhập
                    }}
                >
                    Đăng Xuất
                </button>
            </div>
        </div>
    );
};

export default UserInfoPage;
