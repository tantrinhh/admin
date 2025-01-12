import React from 'react'
import ProductNew from '../../components/ProductNew/ProductNew'
import Taskbar from '../../components/Layout/Taskbar'
import LayoutPage from '../../components/Layout/LayoutPage'

const Index = () => {
    return (
        <>
            <LayoutPage  >
                <div className='flex'>
                    <div>
                        <Taskbar />
                    </div>
                    <div className=''> <ProductNew />
                    </div>
                </div>

            </LayoutPage></>
    )
}

export default Index