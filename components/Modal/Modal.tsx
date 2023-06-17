import React, { ReactNode } from 'react'

interface propstype{
    children : ReactNode
}

export const Modal = ({children} : propstype ) => {
  return (
    <div className='fixed z-50 top-0 w-screen h-screen flex justify-center items-center bg-black/50 left-0'>
         <div>
            {children}
         </div>
    </div>
  )
}
