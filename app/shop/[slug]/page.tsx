"use client"
import { ProductBanner, RelatedProduct, TopBanner } from '@/components'
import { useParams } from 'next/navigation'
import React from 'react'

const page = ({params} : any) => {
  return (
    <div>
        <TopBanner page={"FAAST  TRACK ANALOG GOLDEN DEAL MEN'S WATCH"} route = {"home / shop / FAAST  TRACK ANALOG GOLDEN DEAL MEN'S WATCH "} />
        <div className='max-w-screen-2xl mx-auto px-4'>
            <ProductBanner />
            <RelatedProduct />
        </div>
    </div>
  )
}

export default page