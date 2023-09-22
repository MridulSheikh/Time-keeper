'use client'
import Link from 'next/link'
import React from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { BiPackage } from 'react-icons/bi'
import { IoMdClipboard } from 'react-icons/io'
import { MdOutlineLocalShipping } from 'react-icons/md'
import { useRouter, useSearchParams } from 'next/navigation'

const order_link = [
  {
    status: "pending",
    icon: <IoMdClipboard />,
  },
  {
    status: "packed",
    icon: <BiPackage />,
  },
  {
    status: "shipped",
    icon: <MdOutlineLocalShipping />,
  },
  {
    status: "delivered",
    icon: <AiOutlineHome />,
  },
]

export const ManageOrderHeader = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const status = searchParams.get('status')
  return (
    <div className='p-5 pb-0 bg-white border-b sticky top-0'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Order</h1>
        <div className='flex items-center gap-x-9'>
          {
            order_link.map(link=>(
            <button key={link.status} onClick={() => router.push(`/dashboard/order?status=${link.status}`)}>
               <div className={`flex p-1 rounded-md items-center gap-x-2 ${status === link.status && 'bg-cs-gray text-white'}`}>
                  <h1>{link.icon}</h1>
                  <h1>{link.status}</h1>
               </div>
            </button>))
          }
        </div>
      </div>
      <div className='mt-10 grid grid-cols-6 pb-2'>
          <h1>Date</h1>
          <h1>Item</h1>
          <h1>Price</h1>
          <h1>Paid</h1>
          <h1>Confirm</h1>
          <h1>Status</h1>
      </div>
    </div>
  )
}
