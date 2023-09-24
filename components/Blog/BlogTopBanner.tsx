import Image from 'next/image'
import React from 'react'

export const BlogTopBanner = ({img} : {img : string}) => {
  return (
    <div className='relative h-40 md:h-96'>
        <Image alt={"cover image"} src={img} fill className='object-cover' />
    </div>
  )
}
