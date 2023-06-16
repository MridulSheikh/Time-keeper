'use client'
import { GoogleLogin, TopBanner } from '@/components'
import useAuth from '@/hooks/useAuth'
import Link from 'next/link'
import React from 'react'

const Login = () => {
    const {authLoading} = useAuth();
    console.log(authLoading)
  return (
    <div>
        <TopBanner page={"Login"} route={"home / login"} />
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
                <div className='flex items-center gap-x-2 mt-3'>
                <input type='checkbox'/>
                <p>Show Password?</p>
                </div>
                {
                    authLoading && <p>loading...</p>
                }
                <div className='mt-5'>New here? <Link href={"/signup"} className='underline'>create account</Link></div>
                <input type='submit' className='w-full py-2 rounded-md bg-cs-black text-white cursor-pointer mt-3' />
            </form>
            <p className='text-center my-5'>-- or --</p>
            <GoogleLogin />
        </div>
    </div>
  )
}

export default Login