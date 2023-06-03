import { Feed, SideBar, TopBanner } from '@/components'
import React from 'react'

const page = () => {
  return (
    <div>
        <TopBanner page="BLOGS" route={"home / blog"} />
        <div className='grid lg:grid-cols-12 gap-x-5  max-w-screen-2xl mx-auto my-10 px-4'>
          <Feed />
          <SideBar />
        </div>
    </div>
  )
}

export default page