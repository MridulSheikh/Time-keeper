import prodcutData from '@/mockdata/PRODUCT_MOCK_DATA'
import React from 'react'
import { ProductCard } from '../ProductCard'
import { product_data_types } from '@/typedeclaration/types'
import { useSearchParams } from 'next/navigation'

export const Body = () => {
const searchParams = useSearchParams();
  return (
    <div className="col-span-9 ">
          <div className="flex gap-x-5">
            {searchParams.has("category") && (
              <h1 className="mb-6">
                Cetagory : {searchParams.get("category")} (0)
              </h1>
            )}
            {searchParams.has("brand") && (
              <h1 className="mb-6">Brand : {searchParams.get("brand")} (0)</h1>
            )}
          </div>
         <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {prodcutData.map((dt: product_data_types) => (
              <ProductCard
                key={dt.id}
                id={dt.id}
                title={dt.title}
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
