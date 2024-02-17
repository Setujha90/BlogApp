import React from 'react'
import BlogCard from './BlogCard'
import { getAllBlogs } from '@/app/server/blogs'

const FetchBlogs = async () => {

  const data = await getAllBlogs()


  return (
    <>
      <BlogCard data={data}/>
    </>
  )
}

export default FetchBlogs
