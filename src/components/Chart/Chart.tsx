import axios from "axios";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
const Chartmap: React.FC = () => {

    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        const getSearchHomePage = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/oder/best-selling`
                );
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    console.log("API error: Unexpected status code");
                }
            } catch (error: any) {
                console.log("Call dữ liệu thất bại", error);
            }
        };

        getSearchHomePage();
    }, []);
    console.log("data", data);


    const transformedData = data.map((item) => ({
        value: item.totalsold,
        name: item.product,
    }));
    console.log("transformedData", transformedData);

    const option = {
        backgroundColor: "#2c343c",
        title: {
            text: "Các sản phẩm bán nhiều nhất",
            left: "center",
            top: 20,
            textStyle: {
                color: "#ccc",
            },
        },
        tooltip: {
            trigger: "item",
        },
        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0.6, 1],
            },
        },
        series: [
            {
                name: "Tên sản phẩm -> Số lượng",
                type: "pie",
                radius: "55%",
                center: ["50%", "50%"],
                data: transformedData.length > 0 ? transformedData : [],
                // data: [
                //     { value: 335, name: 'Direct' },
                //     { value: 310, name: 'Email' },
                //     { value: 274, name: 'Union Ads' },
                //     { value: 235, name: 'Video Ads' },
                //     { value: 400, name: 'Search Engine' }
                // ].sort(function (a, b) {
                //     return a.value - b.value;
                // }),
                roseType: "radius",
                label: {
                    color: "rgba(255, 255, 255, 0.3)",
                },
                labelLine: {
                    lineStyle: {
                        color: "rgba(255, 255, 255, 0.3)",
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20,
                },
                itemStyle: {
                    color: "#c23531",
                    shadowBlur: 200,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                },
                animationType: "scale",
                animationEasing: "elasticOut",
                animationDelay: function () {
                    return Math.random() * 200;
                },
            },
        ],
    };

    return (
        <>

            <div className="mt-20 w-[900px] h-[900px]"> <ReactECharts option={option} style={{ height: "100%", width: "100%" }} /></div>
        </>

    );
};

export default Chartmap;

