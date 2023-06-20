'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useEffect } from 'react'

const Page = () => {
  const router = useRouter()
  useEffect(()=>{
    router.replace("/dashboard/track-order")
  },[])
  return (
    <div>redirectng...</div>
  )
}

export default Page