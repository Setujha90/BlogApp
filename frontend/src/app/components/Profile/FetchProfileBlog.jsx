import { getBlogById } from '@/app/server/blogs'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'

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
      <div className={styles.blogCard} key={blog._id} id={blog._id}>
        <div className={styles.blogThumbnail}>
          <img src={blog.thumbnail} alt="Thumbnail" />
        </div>
        <div className={styles.blogDescription}>
          <h4>{blog.title}</h4>
          <p>{blog.description}</p>
        </div>
      </div>
    </Link>
  )
}

export default FetchProfileBlog

