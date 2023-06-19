"use client"
import { PrivateRoute, ProductBanner, RelatedProduct, Revews, RevewsForm, TopBanner } from '@/components'
import React from 'react'

const page = ({params} : any) => {
  return (
    <PrivateRoute>
        <TopBanner page={"FAAST  TRACK ANALOG GOLDEN DEAL MEN'S WATCH"} route = {"home / shop / FAAST  TRACK ANALOG GOLDEN DEAL MEN'S WATCH "} />
        <div className='max-w-screen-2xl mx-auto px-4'>
            <ProductBanner />
            <RelatedProduct />
            <div className='grid lg:grid-cols-2 mt-32 gap-10 mb-10'>
            <Revews />
            <RevewsForm />
            </div>
        </div>
    </PrivateRoute>
  )
}

export default page