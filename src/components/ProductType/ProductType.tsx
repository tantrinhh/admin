import React, { useState, useEffect } from "react";
import "../../styles/ProductList.css";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import {
    getProduct,
    productSelectors,
} from "../../redux/slice/product";
import { useAppDispatch } from "../../redux/hook/redux";
import { Product } from "../../redux/slice/product/type";

const ProductSale: React.FC = () => {
    const productsSelector = useSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState("");

    const [productPerPage, setProductPerPage] = useState<number | string>(20); // Số sản phẩm trên mỗi trang
    console.log(setProductPerPage);

    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const totalPages = Math.ceil(
        productsSelector.length / (+productPerPage || 1)
    );
    // Cập nhật indexOfLastProduct và indexOfFirstProduct
    const productPerPageNumber = +productPerPage || 1; // Chuyển đổi productPerPage thành số và mặc định là 1 nếu không hợp lệ
    const indexOfLastProduct = currentPage * productPerPageNumber;
    const indexOfFirstProduct = indexOfLastProduct - productPerPageNumber;
    const currentdata = productsSelector.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );
    const getAllProduct = () => {
        dispatch(getProduct());
    };
    useEffect(() => {
        getAllProduct();
    }, []);
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    return (
        <>
            <div className="flex">
                <div className="flex-1 px-10">
                    <h1 className="text-center font-bold text-[30px]"> List Products </h1>
                    <div className="space-y-10 mt-10">
                        <div className="flex justify-between my-auto">
                            <input
                                type="text"
                                placeholder="Search "
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-3 py-1 my-auto border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-10 mx-20"
                            />

                        </div>
                        <table className="table table-bordered table-striped">
                            <thead>
                                <th> Image </th>
                                <th>
                                    Product name
                                </th>
                                <th className="max-w-[300px] overflow-hidden"> Description </th>
                                <th> Price </th>
                                <th> Discount </th>
                                <th>Collection</th>
                                <th>Sizes</th>
                                <th>Colors</th>

                            </thead>
                            <tbody>
                                {currentdata
                                    .filter(
                                        (product: Product) =>
                                            product.discount > 0 && // Chỉ hiển thị sản phẩm có discount lớn hơn 0
                                            (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                product.description
                                                    .toLowerCase()
                                                    .includes(searchQuery.toLowerCase()))
                                    )
                                    .map((product) => (
                                        <tr key={product.id}>
                                            <td className="">
                                                <img
                                                    src={product.image}
                                                    alt=""
                                                    className="w-[50px] h-[35px] mx-auto "
                                                />
                                            </td>
                                            <td> {product.name} </td>
                                            <td className="max-w-[300px] overflow-hidden">{product.description}</td>
                                            <td>Rs. {product.price.toLocaleString()}</td>
                                            <td>{product.discount}%</td>
                                            <td>{product.collection}</td>
                                            <td>
                                                {product.sizes?.map((size, index) => (
                                                    <span key={index}>
                                                        {size}
                                                        {index < (product.sizes?.length || 0) - 1 && " "}
                                                    </span>
                                                ))}
                                            </td>
                                            <td>
                                                {product.colors?.map((color, index) => (
                                                    <span key={index}>
                                                        {color}
                                                        {index < (product.colors?.length || 0) - 1 && " "}
                                                    </span>
                                                ))}

                                            </td>


                                        </tr>
                                    ))}
                            </tbody>

                        </table>
                        <div className="pagination text-center space-y-5">
                            <p>
                                Page {currentPage} of {totalPages}
                            </p>
                            <div className="space-x-5 flex  justify-center">
                                <button

                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className={`pagination-button`}
                                >
                                    Previous
                                </button>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`px-4 py-2 mx-2 rounded-lg ${currentPage === index + 1
                                            ? "bg-[#B88E2F] text-white"
                                            : "bg-gray-200"
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={handleNextPage}
                                    className={`px-4 py-2 mx-2 rounded-lg ${currentPage === totalPages
                                        ? "bg-gray-200 cursor-not-allowed"
                                        : "bg-[#B88E2F] text-white"
                                        }`}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductSale;
