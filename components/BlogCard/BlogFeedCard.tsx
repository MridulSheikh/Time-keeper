import formatDate from '@/lib/DateFormate';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdOutlineArrowForwardIos } from 'react-icons/md'

interface PropsType{
  id : string;
  title : string;
  slug : string;
  create_at : string;
  cover : string;
}

export const BlogFeedCard = ({id, title, slug, create_at, cover} : PropsType) => {
  return (
    <div className='mb-20' >
        <div className='relative w-full h-96'>
            <Image alt={title + "image"} src={cover} fill className='object-cover' />
        </div>
        <p className=' text-md mt-5 font-roboto text-cs-gray'>{formatDate(create_at)}</p>
        <h1 className=' text-2xl sm:text-4xl mt-5 font-oswoald text-cs-black'>{title}</h1>
        <Link href={`/blog/${slug}`}>
        <button className="flex font-oswoald items-center gap-x-5 hover:gap-x-1 group transition-all mt-5">
          <div className="border bg-cs-black border-cs-black w-10" />
          <p className="font-roboto  overflow-hidden ease-in duration-300 text-cs-black">
            READ MORE
          </p>
          <MdOutlineArrowForwardIos className="text-cs-black" />
        </button>
        </Link>
    </div>
  )
}
