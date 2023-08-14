import React from 'react'
import { ProductCard } from '../ProductCard'
import { product_data_types } from '@/typedeclaration/types'

export const Body = async ({products} : {products : product_data_types[] }) => {
  return (
    <div className="col-span-9 ">
         <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products?.map((dt:any) => (
              <ProductCard
                key={dt._id}
                id={dt._id}
                title={dt.name}
                img={dt.img}
                price={dt.price}
                off={dt.off}
                ratting={dt.ratting}
              />
            ))}
          </div>
        </div>
  )
}
