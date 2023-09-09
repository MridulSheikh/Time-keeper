'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { RiErrorWarningLine } from 'react-icons/ri'

const NotFound = () => {
  const router = useRouter()
  return (
    <div className="text-center  rounded-md p-4">
    <RiErrorWarningLine className=" text-7xl font-bold text-red-500 mx-auto" />
    <h1 className=" text-2xl font-bold text-red-500">
      Page not found!
    </h1>
    <button
      className="text-white bg-red-500 px-4 py-2 rounded-md mt-4 mx-auto active:opacity-80"
      onClick={() => router.replace("/")}
    >
      back to home
    </button>
  </div>
  )
}

export default NotFound