import { TopBanner } from '@/components'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
        <TopBanner page={"Sign up"} route={"home / signup"} />
        <div className='max-w-screen-sm mx-auto px-4 my-14'>
            <form>
                <div>
                    <p>E-mail<sup className='text-red-700'>*</sup></p>
                    <input placeholder='address@gmail.com' className='px-4 py-1 outline-cs-gray/50 outline-none mt-2 rounded-md w-full focus:outline-cs-pink-800' />
                </div>
                <div className='mt-5'>
                    <p>Password<sup className='text-red-700'>*</sup></p>
                    <input placeholder='********' className='px-4 py-1 outline-cs-gray/50 outline-none mt-2 rounded-md w-full focus:outline-cs-pink-800' />
                </div>
                <div className='mt-5'>
                    <p>C-password<sup className='text-red-700'>*</sup></p>
                    <input placeholder='********' className='px-4 py-1 outline-cs-gray/50 outline-none mt-2 rounded-md w-full focus:outline-cs-pink-800' />
                </div>
                <div className='flex items-center gap-x-2 mt-3'>
                <input type='checkbox'/>
                <p>Show Password?</p>
                </div>
                <div className='mt-5'>Have a account? <Link href={"/signup"} className='underline'>login</Link></div>
                <input type='submit' className='w-full py-2 rounded-md bg-cs-black text-white cursor-pointer mt-3' />
            </form>
            <p className='text-center my-5'>-- or --</p>
            <button className='w-full py-2 rounded-md bg-blue-600 text-white cursor-pointer'>Continue With Google</button>
        </div>
    </div>
  )
}

export default page