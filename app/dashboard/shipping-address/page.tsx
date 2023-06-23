import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
    const address = false
  return (
    <div>
    {address ? (
      <div>order</div>
    ) : (
      <div className=" w-full flex justify-center items-center">
        <div className="py-5 text-center">
           <h1 className=' text-3xl font-bold text-cs-pink-800'>You are didn&apos;t add any address</h1>
           <button className=' bg-cs-black py-1 px-5 rounded-md text-white mt-5 active:opacity-70'>Please add some address</button>
        </div>
      </div>
    )}
  </div>
  )
}

export default page