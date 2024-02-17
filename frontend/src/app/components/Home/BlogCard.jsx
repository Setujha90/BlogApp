import React, { useState, useEffect } from 'react';
import styles from "./styles.module.css";
import { userById } from '@/app/server/signup';
import Link from 'next/link';
import { likeBlog } from '@/app/server/blogs';

const BlogCard = ({ data }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userDataArray = await Promise.all(
        data.map(async (blog) => {
          const { fullName, avatarImage } = await userById(blog.owner);
          return { fullName, avatarImage };
        })
      );
      setUserData(userDataArray);
    };

    fetchData();
  }, [data]);

  return (
    <>
      {data.map((blog, i) => (
        <div key={blog._id} className={styles.blogCard}>
          {/* Render blog details using userData state */}
          <div className={styles.profilePostCard}>
            <div className={styles.pic}>
              <img src={userData[i]?.avatarImage} alt="DP" />
            </div>
            <div className={styles.details}>
              <div>
                {userData[i]?.fullName} . <span>Time</span>
              </div>
              <div>1 Friends</div>
            </div>
          </div>
          <div className={styles.blogPart}>
            {/* Title */}
            <Link href={`/blog/${blog._id}`}>{blog.title}</Link>
            {/* Description */}
            <p>{blog.description}</p>
            <img src={blog.thumbnail} alt="Blog Image" />
          </div>
          <div className={styles.actionButtons}>
            <div>
              <span> {blog.noOfLikes} </span>
              <button className={styles.btn}
                onClick={async(e)=>{
                  try{
                    const response = await likeBlog(blog._id)
                    console.log("Blog Liked", response)
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
      ))}
    </>
  );
};

export default BlogCard;
