import { FaRegUserCircle } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom'
const Taskbar = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại
  return (
    <>
      <div className=' mt-14 mb-20'>
        <div className=' w-64 mr-20 bg-[#3E3E3E]  text-lg pt-14 flex flex-col gap-10 '>
          <div
            className={`pb-10 pl-5 cursor-pointer border-b border-solib ${location.pathname === '/sidebar' ? 'text-[#b48744]' : 'text-[#B8B8B8]'}`}
          >
            <Link to="/sidebar">Trang chủ</Link>
          </div>
          <div
            className={`pb-10 pl-5 cursor-pointer border-b border-solib ${location.pathname === '/productlist' ? 'text-[#b48744]' : 'text-[#B8B8B8]'}`}
          >
            <Link to="/productlist">Danh sách sản phẩm</Link>
          </div>
          <div
            className={`pb-10 pl-5 cursor-pointer border-b border-solib ${location.pathname === '/chart' ? 'text-[#b48744]' : 'text-[#B8B8B8]'}`}
          >
            <Link to="/chart">Biểu đồ thống kê sản phẩm bán chạy</Link>
          </div>
          <div
            className={`pb-10 pl-5 cursor-pointer border-b border-solib ${location.pathname === '/productnew' ? 'text-[#b48744]' : 'text-[#B8B8B8]'}`}
          >
            <Link to="/productnew">Sản phẩm mới</Link>
          </div>
          <div
            className={`pb-10 pl-5 cursor-pointer border-b border-solib ${location.pathname === '/productsale' ? 'text-[#b48744]' : 'text-[#B8B8B8]'}`}
          >
            <Link to="/productsale">Sản phẩm giảm giá</Link>
          </div >
          <Link to="/user" className="mx-auto"><div className="text-white mb-10  mx-auto"><FaRegUserCircle style={{ width: "80px", height: "80px", }} />
          </div></Link>


        </div>

      </div>

    </>
  )
}

export default Taskbar