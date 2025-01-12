import React, { useState, Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/ProductList.css";
import { AiTwotoneDelete } from "react-icons/ai";
import { EditPencil } from "iconoir-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import {
  getProduct,
  productSelectors,
  getProductById,
  deleteProductById,
} from "../../redux/slice/product";
import { useAppDispatch } from "../../redux/hook/redux";
import { Product } from "../../redux/slice/product/type";
import { FaRegEye } from "react-icons/fa";
import ProductModal from "../../common/ProductModal";
const ProductList: React.FC = () => {
  const productsSelector = useSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [dataToShow, setDataToShow] = useState(null as Product | null);
  const [isOpen, setIsOpen] = useState(false);
  const [dataToDeleteId, setDataToDeleteId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    getAllProduct();
  }, []);

  const viewProduct = (productId: any) => {
    dispatch(getProductById(productId)).then((response: any) => {
      setDataToShow(response.data);
      setShowModal(true);
      navigate("/productlist");
    });
  };
  const closeModal = () => setShowModal(false);
  function closeModalDelete() {
    setIsOpen(false);
  }
  function openModalDelete(productId: any) {
    setDataToDeleteId(productId);
    setIsOpen(true);
  }
  const [productPerPage, setProductPerPage] = useState<number | string>(40); // Số sản phẩm trên mỗi trang
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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const removeProduct = async (productId: any) => {
    try {
      // Fetch product details
      await dispatch(getProductById(productId));

      // Once the product details are fetched, dispatch the delete action
      dispatch(deleteProductById(productId));

      console.error("Error while removing product:", productId);
      toast.success("Xóa thành công");
    } catch (error) {
      // Handle errors, e.g., show an error toast
      console.error("Error while removing product:", error);
      toast.error("Đã xảy ra lỗi khi xóa sản phẩm");
    }
  };
  const getAllProduct = () => {
    dispatch(getProduct());
  };
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
  const handleSort = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc"); // Chuyển sang giảm dần
    } else {
      setSortOrder("asc"); // Chuyển sang tăng dần
    }
  };

  // Sắp xếp dữ liệu dựa trên trạng thái
  const sortedData = [...currentdata].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price; // Tăng dần
    }
    if (sortOrder === "desc") {
      return b.price - a.price; // Giảm dần
    }
    return 0; // Không sắp xếp
  });
  return (
    <>
      <div className="flex">
        <div className="flex-1 ">
          <h1 className="text-center font-bold text-[30px]"> List Products </h1>
          <div className="space-y-10 mt-10">
            <div className="flex justify-between my-auto">
              {" "}
              <Link
                to="/addProduct"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-5"
              >
                {" "}
                Add Product{" "}
              </Link>
              <input
                type="text"
                placeholder="Search "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1 my-auto border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-10 mx-20"
              />

            </div>
            <div className=" w-[1150px] overflow-x-auto"><table className="min-w-[1800px]  ">
              <thead className="">
                <th className="w-32"> Ảnh </th>
                <th className="w-52">
                  Tên sản phẩm
                </th>
                <th className="w-[300px]">Mô tả ngắn</th>
                <th className="w-[300px] "> Mô tả </th>
                <th
                  className="w-32 cursor-pointer flex items-center"
                  onClick={handleSort}
                >
                  Giá
                  <span className="ml-2">
                    {sortOrder === "asc" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                    {sortOrder === "desc" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                    {!sortOrder && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4l6 8H6l6-8z" />
                      </svg>
                    )}
                  </span>
                </th>

                <th className="w-40"> Giảm giá </th>
                <th className="w-40">Số lượng</th>
                <th className="w-40">Bộ sưu tập</th>
                <th className="w-40">Thương hiệu</th>
                <th className="w-40">Kích thước</th>
                <th className="w-40">Màu sắc</th>
                <th className="w-40"> Ngày tạo</th>
                <th className="w-40">Hành động </th>
              </thead>
              <tbody>
                {sortedData
                  .filter(
                    (product: Product) =>
                      product.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      product.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
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
                      <td className="max-w-[100px] overflow-hidden">{product.shortdescription}</td>
                      <td className="max-w-[300px] overflow-hidden">{product.description}</td>
                      <td> {product.price.toLocaleString()} đ</td>
                      <td>{product.discount}%</td>
                      <td>{product.quantity}</td>
                      <td>{product.collection}</td>
                      <td>
                        {/* <span>{product.brands || "No brand selected"}</span> */}
                      </td>

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
                      <td>{product.dateAdded}</td>
                      <td className=" my-auto">
                        <div className="flex">
                          {" "}
                          <Link to={`/editProduct/${product.id}`}>
                            <EditPencil />
                          </Link>
                          <AiTwotoneDelete
                            className="cursor-pointer my-auto"
                            onClick={() => openModalDelete(product.id)}
                            style={{ marginLeft: "10px" }}
                          />
                          <FaRegEye
                            className="cursor-pointer my-auto"
                            onClick={() => viewProduct(product.id)}
                            style={{ marginLeft: "10px" }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
              {showModal && dataToShow !== null && (
                <ProductModal onClose={closeModal} data={dataToShow} />
              )}
            </table></div>
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
            <ToastContainer />
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Cảnh báo
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Bạn có muốn xóa không?
                          </p>
                        </div>

                        <div className="grid grid-cols-2 mt-4 gap-5">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => {
                              if (dataToDeleteId) {
                                removeProduct(dataToDeleteId);
                                closeModalDelete();
                              }
                            }}
                          >
                            Có
                          </button>

                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeModalDelete}
                          >
                            Không
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
