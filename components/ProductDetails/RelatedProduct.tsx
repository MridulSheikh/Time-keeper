import prodcutData from '@/mockdata/PRODUCT_MOCK_DATA'
import { product_data_types } from '@/typedeclaration/types'
import React from 'react'
import { ProductCard } from '../ProductCard'
// import { Pagination } from '../DashboardPagination'

export const RelatedProduct = () => {
  return (
    <div className='mt-20'>
        <h1 className='text-center font-oswoald text-4xl font-normal'>Related Products</h1>
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-20'>
            {
                prodcutData.slice(0, 4).map((dt : any) =><ProductCard key={dt.id} id={dt.id} title={dt.title} img={dt.img} price={dt.price} off={dt.off} ratting={dt.ratting}
                 />)
            }
        </div>
       {/* <Pagination /> */}
    </div>
  )
}
