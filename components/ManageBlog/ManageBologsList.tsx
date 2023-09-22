'use client'
import React from 'react'
import { ManageBlogCard } from './ManageBlogCard';

export interface blogsType {
    title : string;
    cover : string;
    body : string;
    author : string;
    _id : string;
    createdAt : string;
    updatedAt : string;
}

export const ManageBologsList = ({blogs} : {blogs : blogsType[]} ) => {
  return (
    <div>
        {
            blogs?.map((bl : blogsType) => <ManageBlogCard key={bl._id} title={bl.title} _id={bl._id} publish_date={bl.createdAt} publisher={bl.author} cover={bl.cover}   /> )
        }
    </div>
  )
}
