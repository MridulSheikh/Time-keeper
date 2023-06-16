'ues client'
import useAuth from '@/hooks/useAuth';
import React from 'react'

export const GoogleLogin = () => {
    const {LoginWithGoogle} = useAuth();
  return (
    <button onClick={LoginWithGoogle} className='w-full py-2 rounded-md bg-blue-600 text-white cursor-pointer active:opacity-40'>Continue With Google</button>
  )
}
