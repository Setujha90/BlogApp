"use client"
import React, { useEffect, useState } from 'react'
import styles from "./Create/styles.module.css"
import { getBlogById } from '@/app/server/blogs'
import { userById } from '@/app/server/signup'


const ShowBlog = ({id}) => {


    const [blog, setBlog] = useState({})
    const [owner, setOwner] = useState({})

    useEffect(async() => {
        try{
            const blog = await getBlogById(id)
            setBlog(blog)

            const writer = await userById(blog.owner)
            setOwner(writer)

        } catch(error){
            throw error
        }

    }, [])

    console.log(blog)
    console.log(owner)

  return (
    <div className={styles.container}>
        {/* <div className={styles.profile}>
          <img src={avatarImage} alt="avatar" />
          <p>{fullName}</p>
        </div> */}

        {/* blog part */}
        {/* <div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div> */}
    
    </div>
  )
}

export default ShowBlog
