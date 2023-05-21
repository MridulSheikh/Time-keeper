import Ratting from '@/lib/Ratting'
import { product_data_types } from '@/typedeclaration/types'
import { count } from 'console'
import Image from 'next/image'
import React from 'react'

export const ProductCard = ({id, img, title, description, price, ratting, catagory, brand, off} : product_data_types ) => {
  return (
    <div className='bg-cs-pink-200 pt-[50px] relative group'>
       <div className='bg-cs-pink-800 absolute top-3 right-3 text-white p-3 text-sm font-bold rounded-full'>
         -{off}%
       </div>
        <div className='relative w-full h-56'>
            <Image src={img} fill className='object-contain' alt={`${title} image`} />
        </div>
        <div className='mt-[55px] relative'>
            <h1 className=' font-oswoald font-light text-cs-black text-xl w-3/4 text-center mx-auto'>{title}</h1>
            <div className=' flex justify-center mt-[12px] text-[#D4B700]'>
                  <Ratting rating={{rate : ratting}} />
            </div>
            <div className='flex gap-x-4 text-lg justify-center text-cs-gray mt-[24px] pb-6'>
                <del className=' font-semibold'>${price.toFixed(2)}</del>
                <h2 className=' text-cs-text'>${((price/100)*off).toFixed(2)}</h2>
            </div>
            <div className='absolute ease-in duration-300 bottom-0 bg-cs-pink-200 h-0 group-hover:h-full overflow-hidden w-full flex justify-center items-center transition-all'>
                <button className='border font-oswoald font-light px-7 py-3 border-cs-black hover:bg-cs-black hover:text-white ease-in duration-200 '>Details</button>
            </div>
        </div>
    </div>
  )
}
