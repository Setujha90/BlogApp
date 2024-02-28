import React, { useState } from 'react'
import styles from "./styles.module.css";
import actionButtonStyles from "@/app/components/Blog/Create/styles.module.css"
import Link from 'next/link';
import { likeBlog } from '@/app/server/blogs';
import Spinner from '../Spinner';
import { copyToClipboard } from '@/app/server/copyToClipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareFromSquare, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';
import { formatRelativeTime } from '@/app/server/dateTime';
import Image from 'next/image';
import { faBars, faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
// import menu from '@/app/styles/menu.png'

const Blogs = ({blog, userData, i}) => {
  
    const formattedTime = formatRelativeTime(blog.createdAt);

    // const [likes, setLikes] = useState(blog.noOfLikes)
    // const [loading, setLoading] = useState(false)
    const loggedInUser = useSelector(state => state.user.currentUser)

    

    const [copyLoading, setCopyLoading] = useState(false)
    const [bookmarkLoading, setBookmarkLoading] = useState(false)

    const [actionButtons, setActionButtons] = useState(false)

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
                <button className={styles.actionButtons} onClick={async(e) => {
                  setCopyLoading(false)
                  await copyToClipboard(`http://localhost:3000/blog/${blog._id}`)
                  setBookmarkLoading(false)
                  setCopyLoading(true)
                  }}>
                  <FontAwesomeIcon icon={faShareFromSquare} />
                </button>
                {
                loggedInUser ?
                <button className={`${styles.actionButtons} ${styles.popup}`} onClick={(e) => {
                  setActionButtons(!actionButtons)
                  setCopyLoading(false)
                  }} >
                  <div className={styles.threeDot}>
                    <FontAwesomeIcon icon={faBars} />
                    <div style={{width: actionButtons? "200px": "0px", height : actionButtons ? "200px": "0px"}} className={styles.popUpButtons}>
                      <button>Delete</button>
                      <button>Bookmark</button>
                      <button>Report</button>
                      <button>Share</button>
                      <button>Related_Posts</button>
                    </div>
                  </div>
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
          
          <div className={actionButtonStyles.actionButtons}>
                <div>
                    {blog.noOfViews} Views
                </div>

                <div>
                    <span>{blog.noOfLikes} </span>
                    <FontAwesomeIcon style={{color: loggedInUser?.likedBlogs.includes(blog._id) ? 'red' : 'white'}} icon={faHeart} />
                </div>

                <div>
                    <span>{blog.noOfComments} </span>
                    <FontAwesomeIcon style={{color: 'white'}} icon={faComment} />
                </div>
            </div>

        </div>
    )
}

export default Blogs
