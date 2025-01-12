import React from 'react'
import LayoutPage from '../../components/Layout/LayoutPage'
import Taskbar from '../../components/Layout/Taskbar'
import ProductType from '../../components/ProductType/ProductType'

const Index = () => {
    return (
        <><LayoutPage  >
            <div className='flex'>
                <div>
                    <Taskbar />
                </div>
                <div className=''> <ProductType />
                </div>
            </div>
        </LayoutPage></>
    )
}

export default Index