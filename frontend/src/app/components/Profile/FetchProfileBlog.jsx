import { getBlogById } from '@/app/server/blogs'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const FetchProfileBlog = ({id}) => {

  const [blog, setBlog] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function fetchData(){
      try{
        const blog = await getBlogById(id)
        setBlog(blog)
      }
      catch(error){
        throw error
      }
      finally{
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Link href={`/blog/${blog._id}`}>
      <div id={blog._id}>
        <h3>{blog.title}</h3>
        <img src={blog.thumbnail} alt="Thumbnail" />
      </div>
    </Link>
  )
}

export default FetchProfileBlog
