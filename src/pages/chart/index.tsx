import React from 'react'
import Chartmap from '../../components/Chart/Chart'
import Taskbar from '../../components/Layout/Taskbar'
import LayoutPage from '../../components/Layout/LayoutPage'

const Chart = () => {
    return (
        <><LayoutPage  >
            <div className='flex'>
                <div>
                    <Taskbar />
                </div>
                <div className=''> <Chartmap />
                </div>
            </div>
        </LayoutPage></>
    )
}

export default Chart