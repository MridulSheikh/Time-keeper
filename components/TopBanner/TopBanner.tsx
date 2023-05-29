import Image from 'next/image'
import React from 'react'

export const TopBanner = ({page, route}: any) => {
  return (
    <div className="relative h-[278px]">
        <Image src="/images/h4-copyright (1).png" fill className='object-cover' alt="top banner image" />
        <div className='relative z-30 text-white flex flex-col justify-center items-center h-full'>
          <h1 className=' text-5xl font-oswoald'>{page}</h1>
          <h3 className=' text-xl text-white/70 mt-3'>{route}</h3>
        </div>
    </div>
  )
}
