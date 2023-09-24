import { Feed, SideBar, TopBanner } from '@/components'
import React from 'react'

const getData = async () => {
      const res = await fetch("https://free-time-server.onrender.com/api/v1/blog", {cache : "no-cache"})
      return res.json();
}


const page = async () => {
  const blog = await getData()
   
  return (
    <div>
        <TopBanner page="BLOGS" route={"home / blog"} />
        <div className='lg:grid lg:grid-cols-12 gap-x-5  max-w-screen-2xl mx-auto my-10 px-4'>
          <Feed blog={blog?.data} />
          <SideBar />
        </div>
    </div>
  )
}

export default page