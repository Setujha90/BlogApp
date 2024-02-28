import { getBlogById } from '@/app/server/blogs'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import cardStyles from './cards.module.css'
import { userById } from '@/app/server/signup'
import { formatRelativeTime } from '@/app/server/dateTime'

const FetchProfileBlog = ({id}) => {

  const [blog, setBlog] = useState("")
  const [loading, setLoading] = useState(true)
  const [blogOwner, setBlogOwner] = useState({})

  useEffect(()=>{
    async function fetchData(){
      try{
        const blog = await getBlogById(id)
        const blogOwner = await userById(blog.owner)
        setBlog(blog)
        setBlogOwner(blogOwner)
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
    <div className={`${cardStyles.container}`}>
        <div className={cardStyles.card}>
        <Link href={`/blog/${blog._id}`}>
          <div className={cardStyles.card__header}>
            {/* 600 * 400 */}
            <img src={blog.thumbnail} alt="card__image" className={`${cardStyles.card__image} ${cardStyles.img}`} width="600" />
          </div>
          <div className={cardStyles.card__body}>
            <span className={`${cardStyles.tag} ${cardStyles.tagred}`}>tag</span>
            <h4>{blog.title}</h4>
            <p>{blog.description}</p>
          </div>
        </Link>
          <Link href={`/user/${blog.owner}`}>
            <div className={cardStyles.card__footer}>
              <div className={cardStyles.user}>
                <img src={blogOwner.avatarImage} alt="user__image" className={`${cardStyles.user__image} ${cardStyles.img}`} />
                <div className={cardStyles.user__info}>
                  <p>@{blogOwner.username}</p>
                  <small>{formatRelativeTime(blog.createdAt)}</small>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
  )
}

export default FetchProfileBlog

