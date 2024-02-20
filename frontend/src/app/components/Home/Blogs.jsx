import React, { useState } from 'react'
import styles from "./styles.module.css";
import Link from 'next/link';
import { likeBlog } from '@/app/server/blogs';



const Blogs = ({blog, userData, i}) => {

    const [likes, setLikes] = useState(blog.noOfLikes)


    return (
        <div key={blog._id} className={styles.blogCard}>
          {/* Render blog details using userData state */}
          <div className={styles.profilePostCard}>
            <div className={styles.pic}>
              <img src={userData[i]?.avatarImage} alt="DP" />
            </div>
            <div className={styles.details}>
              <div>
                <Link href={`/user/${userData[i]?._id}`}>{userData[i]?.fullName}</Link> . <span>Time</span>
              </div>
              <div>1 Friends</div>
            </div>
          </div>
          <div className={styles.blogPart}>
            {/* Title */}
            <Link href={`/blog/${blog._id}`}><h2>{blog.title}</h2></Link>
            {/* Description */}
            <p>{blog.description}</p>
            <img src={blog.thumbnail} alt="Blog Image" />
          </div>
          <div className={styles.actionButtons}>
            <div>
              {blog.noOfViews} Views
            </div>
            <div>
              <span> {likes} </span>
              <button className={styles.btn}
                onClick={async(e)=>{
                  try{
                    // setLikes(blog.noOfLikes)
                    const response = await likeBlog(blog._id)
                    if(response["likesDocument"]){
                      setLikes(likes+1)
                    }
                    else{
                      setLikes(likes-1)
                    }
                  }
                  catch(error){
                    console.error("Error while Liking the blog", error)
                  }
                }}
              >Like
              </button>
            </div>
            <div>
              <span> {blog.noOfComments} </span>
              <button className={styles.btn}>Comment</button>
            </div>
            <button>Share</button>
          </div>
        </div>
    )
}

export default Blogs
