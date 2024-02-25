import React, { useState } from 'react'
import styles from "./styles.module.css";
import Link from 'next/link';
import { likeBlog } from '@/app/server/blogs';
import Spinner from '../Spinner';
import { copyToClipboard } from '@/app/server/copyToClipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareFromSquare, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';
import { formatRelativeTime } from '@/app/server/dateTime';


const Blogs = ({blog, userData, i}) => {
  
    const formattedTime = formatRelativeTime(blog.createdAt);

    // const [likes, setLikes] = useState(blog.noOfLikes)
    // const [loading, setLoading] = useState(false)
    const loggedInUser = useSelector(state => state.user.currentUser)

    const [copyLoading, setCopyLoading] = useState(false)
    const [bookmarkLoading, setBookmarkLoading] = useState(false)

    return (
        <div key={blog._id} className={styles.blogCard}>
          {/* Render blog details using userData state */}
          <div className={styles.profileContainer}>
            <div className={styles.profilePostCard}>
              <div className={styles.pic}>
                <img src={userData[i]?.avatarImage} alt="DP" />
              </div>
              <div className={styles.details}>
                <div>
                  <Link href={`/user/${userData[i]?._id}`}>@{userData[i]?.username}</Link> · <span>{formattedTime}</span>
                </div>
                <div>{userData[i]?.followers.length} Followers</div>
              </div>
            </div>
              
            <div className={styles.actionButtons}>
                <button className={`${styles.popUp} ${copyLoading ? styles.copyPopUp: ""}`} onClick={async(e) => {
                  setCopyLoading(false)
                  await copyToClipboard(`http://localhost:3000/blog/${blog._id}`)
                  setBookmarkLoading(false)
                  setCopyLoading(true)
                  }}>
                  <FontAwesomeIcon icon={faShareFromSquare} />
                </button>
                {
                loggedInUser ?
                <button className={`${bookmarkLoading? styles.bookmarkPopUp : ""} ${styles.popUp}`} onClick={(e) => {
                  setBookmarkLoading(true)
                  setCopyLoading(false)
                  }} >
                  <FontAwesomeIcon icon={faBookmark} />
                </button>
                :
                ""
                }
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
            {/* <div>
              {blog.noOfViews} Views
            </div>
            <div>
              <span> {loading ? <Spinner /> : likes} </span>
              <button className={styles.btn}
                onClick={async(e)=>{
                  try{
                    setLoading(true)
                    // setLikes(blog.noOfLikes)
                    const response = await likeBlog(blog._id)
                    if(response["likesDocument"]){
                      setLikes(likes+1)
                    }
                    else{
                      setLikes(likes-1)
                    }
                    setLoading(false)
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
            </div> */}

          </div>
        </div>
    )
}

export default Blogs
