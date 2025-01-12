import React from 'react'

import ProductList from '../../components/ProductList/ProductList'
import LayoutPage from '../../components/Layout/LayoutPage'
import Taskbar from '../../components/Layout/Taskbar'

const Main = () => {
  return (
    <>

      <LayoutPage  >
        <div className='flex'>
          <div>
            <Taskbar />
          </div>
          <div className=''> <ProductList />
          </div>
        </div>

      </LayoutPage>

    </>
  )
}

export default Main