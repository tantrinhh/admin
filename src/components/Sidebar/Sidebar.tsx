import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useAppDispatch, useAppSelector } from "../../redux/hook/redux";
import { getProduct, productSelectors } from "../../redux/slice/product";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(productSelectors.selectAll);
  const [collectionData, setCollectionData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    dispatch(getProduct()); // Gọi API để lấy dữ liệu sản phẩm

    // Phân loại theo collection từ dữ liệu sản phẩm
    if (products.length) {
      const collections = products.reduce((acc: any, product: any) => {
        const collectionName =
          product.collection === 1 ? "Áo Polo" :
            product.collection === 2 ? "Áo T-Shirt" :
              product.collection === 3 ? "Áo Jacket" :
                product.collection === 4 ? "Quần Tây" :
                  product.collection === 5 ? "Quần Jean" :
                    "Khác"; // Thêm tên collection khác nếu cần

        // Tăng số lượng cho collection tương ứng
        if (!acc[collectionName]) {
          acc[collectionName] = 0;
        }
        acc[collectionName]++;
        return acc;
      }, {});

      // Chuyển đổi đối tượng thành mảng để sử dụng
      const data = Object.keys(collections).map(key => ({
        name: key,
        value: collections[key],
      }));

      setCollectionData(data);
    }
  }, [dispatch, products]);

  // Dữ liệu cho biểu đồ
  const data = {
    labels: collectionData.map(item => item.name), // Nhãn cho các cột
    datasets: [
      {
        label: "Số lượng sản phẩm",
        data: collectionData.map(item => item.value), // Giá trị cho các cột
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Màu nền của các cột
        borderColor: "rgba(75, 192, 192, 1)", // Màu viền của các cột
        borderWidth: 1,
      },
    ],
  };

  // Tùy chỉnh cho biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Biểu đồ theo Collection",
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Bắt đầu từ 0
      },
    },
  };

  return (
    <div className="bg-white p-24 mt-20 ml-20 rounded-lg shadow-lg ">
      <div style={{ width: "800px", margin: "0 auto" }}>
        <Bar className="w-[800px]" data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
