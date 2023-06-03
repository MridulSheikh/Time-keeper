import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { DatePicker } from '../DatePicker'

export const SideBar = () => {
  return (
    <div className="lg:col-span-3">
        <div className=' bg-cs-black py-[43px] px-5'>
            <h1 className=' font-oswoald text-white font-normal text-3xl'>Search</h1>
            <div className='flex items-center mt-5 h-10'>
                <input type="text" placeholder='Search' className='bg-transparent outline-none px-4 h-full border border-cs-gray text-white w-full' />
                <button className='bg-white text-cs-black px-4 h-full'><AiOutlineSearch /></button>
            </div>
        </div>
        <DatePicker />
    </div>
  )
}
