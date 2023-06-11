"use client"
import { ProductBanner, RelatedProduct, Revews, RevewsForm, TopBanner } from '@/components'
import React from 'react'

const page = ({params} : any) => {
  return (
    <div>
        <TopBanner page={"FAAST  TRACK ANALOG GOLDEN DEAL MEN'S WATCH"} route = {"home / shop / FAAST  TRACK ANALOG GOLDEN DEAL MEN'S WATCH "} />
        <div className='max-w-screen-2xl mx-auto px-4'>
            <ProductBanner />
            <RelatedProduct />
            <div className='grid grid-cols-2 mt-20 gap-x-10'>
            <Revews />
            <RevewsForm />
            </div>
        </div>
    </div>
  )
}

export default page