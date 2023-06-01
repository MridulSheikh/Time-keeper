"use client";
import brand_mock_data from '@/mockdata/BRAND_MOCK_DATA'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const categories = ["All","Men's", "Women's", "Featured", "Kid's", "Best Sell"];

export const Sidebar = () => {
  const router = useRouter();
  const [cetagory, setCetagory] = useState<string | null>('')
  const [brand, setBrand] = useState<string | null>('')
  return (
    <div className="lg:col-span-3">
    <div className="bg-cs-pink-200 p-7">
      <h1 className="text-2xl">CETAGORIES</h1>
      <div className=" flex flex-col gap-y-2 items-start mt-7">
        {categories.map((cs) => (
          <button
            key={cs}
            onClick={() => setCetagory(cs)}
            className={cs === cetagory ? 'text-cs-pink-800 font-semibold' : ''}
          >
            {cs}
          </button>
        ))}
      </div>
    </div>
    <h1 className=" text-3xl font-oswoald font-light mt-10">BRANDS</h1>
    <div className=" grid grid-cols-2 gap-3 mt-10">
      {brand_mock_data.map((dr) => (
        <button
          onClick={() => setBrand(dr.name)}
          key={dr.name}
          className={`relative w-full  h-28 overflow-hidden ${dr.name === brand && 'broder border-2 border-cs-pink-800'}`}
        >
          <Image alt="image" src={dr.img} fill className="object-cover" />
        </button>
      ))}
    </div>
    <button className=" bg-cs-pink-800 text-white py-3 mt-10 px-7" onClick={() => router.push(`/shop?category=${cetagory}&brand=${brand}`)}>Fillter</button>
  </div>
  )
}
