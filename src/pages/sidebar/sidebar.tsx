import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Taskbar from '../../components/Layout/Taskbar'
import LayoutPage from '../../components/Layout/LayoutPage'

const Sidebarr = () => {
    return (
        <><LayoutPage  >
            <div className='flex'>
                <div>
                    <Taskbar />
                </div>
                <div className=''> <Sidebar />
                </div>
            </div>
        </LayoutPage></>
    )
}

export default Sidebarr