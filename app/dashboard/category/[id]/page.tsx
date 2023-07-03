'use client'
import React, { useState } from 'react'

const page = async ({params} : {params : {id : string}}) => {
  const res = await fetch(`https://free-time-server.onrender.com/api/v1/category/${params.id}`)
  const data = await res.json();
  
  return (
    <div className='p-5 grid grid-cols-2'>
        <div>
           <div>
              <p>Type</p>
              <input type='text' className='border px-4 py-1 rounded-md outline-none mt-2'/>
           </div>
        </div>
        <div>

        </div>
    </div>
  )
}

export default page