import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className=' max-w-screen-2xl h-screen flex flex-col justify-center items-center'>
        <h1 className=' text-2xl font-semibold text-red-700'>PAGE NOT FOUND!</h1>
        <Link href={"/"}>
          <button>back to home</button>
        </Link>
    </div>
  )
}

export default NotFound