import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  updateExistingProduct,
  getProductById,
} from "../redux/slice/product";
import { RootState } from "../redux/RootReducer";
import { Product } from "../redux/slice/product/type";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import FileUpload from "./FileUpload";

const AddEditProduct: React.FC = () => {
  // const [formData,setFormData] = useState<Product>({
  //   id:0,
  //   image:"",
  //   name:"",
  //   description:"",
  //   price:0,
  //   discount:0,
  //   count:0,
  //   sizes:[],
  //   colors:[],
  //   dateAdded:"",
  // } )
  const [image, setImage] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [date, setDate] = useState("");
  const [count, setCount] = useState<number>(0);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const selectedProduct = useSelector(
    (state: RootState) => state.product.selectProduct
  );
  useEffect(() => {
    // Fetch product details if in update mode
    if (id) {
      // Fetch the product based on the provided ID
      dispatch(getProductById(Number(id)) as any);
    }
  }, [dispatch, id]);
  // Set form fields based on the selected product (if in update mode)
  useEffect(() => {
    if (selectedProduct && id) {
      // setFormData({
      //  ...formData,image:selectedProduct.image, name:selectedProduct.name, description: selectedProduct.description, price: selectedProduct.price, discount: selectedProduct.discount, count: selectedProduct.count, sizes: selectedProduct.sizes as string[], colors: selectedProduct.colors as string[], dateAdded: dayjs(selectedProduct.dateAdded).format('YYYY-MM-DD')
      // })
      setImage(selectedProduct.image);
      setProductName(selectedProduct.name);
      setDescription(selectedProduct.description);
      setPrice(selectedProduct.price);
      setDiscount(selectedProduct.discount);
      setDate(dayjs(selectedProduct.dateAdded).format("YYYY-MM-DD"));
      setCount(selectedProduct.count);
      setSizes(selectedProduct.sizes as string[]);
      setColors(selectedProduct.colors as string[]);
    }
  }, [selectedProduct, id]);
  console.log(selectedProduct, "selectedProduct");
  const saveOrUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    // Kiểm tra xem có trường nào để trống không
    const errors: Record<string, string> = {};
    if (!image.trim()) {
      errors.image = "Image không được để trống";
      toast.error(errors.image);
    }
    if (!productName.trim()) {
      errors.productName = "Product Name không được để trống";
      toast.error(errors.productName);
    }
    if (!description.trim()) {
      errors.description = "Description không được để trống";
      toast.error(errors.description);
    }
    if (price <= 0) {
      errors.price = "Price phải là 1 số > 0";
      toast.error(errors.price);
    }
    if (discount < 0) {
      errors.discount = "Discount phải là 1 số >= 0";
      toast.error(errors.discount);
    }
    if (count <= 0) {
      errors.count = "Count phải là 1 số > 0";
      toast.error(errors.count);
    }
    if (sizes.length === 0) {
      toast.error("Bạn phải chọn ít nhất 1 size");
      return;
    }
    if (colors.length === 0) {
      toast.error("Bạn phải chọn ít nhất 1 màu");
      return;
    }
    if (!date.trim()) {
      errors.date = "Date không được để trống";
      toast.error(errors.date);
    }

    // Nếu có lỗi, cập nhật trạng thái lỗi và không thực hiện submit
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    const product: Partial<Product> = {
      image: selectedFile ? URL.createObjectURL(selectedFile) : image,
      name: productName,
      description: description,
      price: price,
      discount: discount,
      dateAdded: date,
      count: count,
      sizes: sizes,
      colors: colors,
    };
    if (id) {
      // Update existing product
      await dispatch(
        updateExistingProduct({ id: Number(id), data: product }) as any
      );
      // Fetch the updated product details after the update
      await dispatch(getProductById(Number(id)) as any);
      toast.success("Cập nhật thành công");
      navigate("/admin/products");
    } else {
      // Add new product
      const addedProduct = await dispatch(addNewProduct(product) as any);
      // resetForm()
      // Fetch the details of the newly added product
      await dispatch(getProductById(addedProduct.id) as any);
      toast.success("Thêm thành công");
      navigate("/admin/products");
    }
  };
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (file: File) => {
    setSelectedFile(file);
    // Optionally set the image state for preview
    setImage(URL.createObjectURL(file)); // đoạn đây á anh anh đang đặt một url trỏ đến nó
  };

  return (
    <div className="max-w-xs grid mx-auto w-full">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h1 className="text-center font-bold">
            {id ? "Update Product" : "Add Product"}
          </h1>
          <div>
            <form>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 mt-5">
                  Image:
                </label>
                <FileUpload onFileUpload={handleFileUpload} />
                {selectedFile && <p>Selected File: {selectedFile.name}</p>}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 mt-5">
                  Product Name:
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  name="name"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formErrors.name ? "border-red-500" : ""
                  }`}
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 mt-5">
                  Description:
                </label>
                <textarea
                  placeholder="Enter description"
                  name="description"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formErrors.description ? "border-red-500" : ""
                  }`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 mt-5">
                  Price:
                </label>
                <input
                  type="number"
                  placeholder="Enter price"
                  name="price"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formErrors.price ? "border-red-500" : ""
                  }`}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                ></input>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 mt-5">
                  Discount:
                </label>
                <input
                  type="number"
                  placeholder="Enter discount"
                  name="discount"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formErrors.discount ? "border-red-500" : ""
                  }`}
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                ></input>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 mt-5">
                  Count:
                </label>
                <input
                  type="number"
                  placeholder="Enter count"
                  name="count"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formErrors.count ? "border-red-500" : ""
                  }`}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                ></input>
              </div>

              <div className="flex mt-5 space-x-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Sizes:
                </label>
                <div className="flex space-x-5">
                  {["XXL", "XL", "L", "M", "S"].map((size) => (
                    <div className="flex" key={size}>
                      <input
                        id={`size-checkbox-${size}`}
                        type="checkbox"
                        defaultValue=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={sizes.includes(size)}
                        onChange={() => {
                          setSizes((prevSizes) =>
                            prevSizes.includes(size)
                              ? prevSizes.filter(
                                  (prevSize) => prevSize !== size
                                )
                              : [...prevSizes, size]
                          );
                        }}
                      />
                      <label
                        htmlFor={`size-checkbox-${size}`}
                        className="ms-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex mt-5 space-x-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Colors:
                </label>
                <div className="flex space-x-5">
                  {["Green", "Black", "Red", "Yellow", "Purple"].map(
                    (color) => (
                      <div className="flex items-center" key={color}>
                        <input
                          id={`color-checkbox-${color}`}
                          type="checkbox"
                          defaultValue=""
                          className="hidden"
                          checked={colors.includes(color)}
                          onChange={() => {
                            setColors((prevColors) =>
                              prevColors.includes(color)
                                ? prevColors.filter(
                                    (prevColor) => prevColor !== color
                                  )
                                : [...prevColors, color]
                            );
                          }}
                        />
                        <label
                          htmlFor={`color-checkbox-${color}`}
                          className={`cursor-pointer w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full focus:outline-none ${
                            colors.includes(color)
                              ? "bg-" +
                                color.toLowerCase() +
                                "-500 border-transparent"
                              : "bg-gray-100 border-gray-300"
                          }`}
                        >
                          {colors.includes(color) && (
                            <div
                              className="w-4 h-4 rounded-full bg-white"
                              style={{ backgroundColor: color.toLowerCase() }}
                            />
                          )}
                        </label>
                        <span className="ms-1 text-sm font-medium text-gray-900 dark:text-gray-300">
                          {color}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 mt-5">
                  Date Added:
                </label>
                <input
                  type="date"
                  name="dateAdded"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formErrors.date ? "border-red-500" : ""
                  }`}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="flex">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-5 mx-5"
                  type="button"
                  onClick={(e) => saveOrUpdateProduct(e)}
                >
                  Submit
                </button>
                <Link
                  to="/admin/products"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-5"
                  type="button"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditProduct;
