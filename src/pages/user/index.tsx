import React from 'react'
import UserInfoPage from '../../components/User/User'
import LayoutPage from '../../components/Layout/LayoutPage'
import Taskbar from '../../components/Layout/Taskbar'

const User = () => {
    return (
        <><LayoutPage  >
            <div className='flex'>
                <div>
                    <Taskbar />
                </div>
                <div className=''> <UserInfoPage />
                </div>
            </div>
        </LayoutPage></>
    )
}

export default User