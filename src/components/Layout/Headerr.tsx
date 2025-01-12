import { LuLogOut } from "react-icons/lu";
import { Link } from 'react-router-dom'

const Headerr = () => {
  return (
    <>
      <div className='flex fixed w-full z-50 h-14 justify-between text-center items-center bg-slate-400 pr-10'>
        <div className='w-64 flex items-center pl-10 text-3xl font-bold text-white h-full  bg-[#F36A5A]'>
          ADMIN
        </div>
        <div className='h-4 bg-black'>
        </div>

      </div>
    </>
  )
}

export default Headerr