import React from "react";
import styles from "./styles.module.css";
import { getAllBlogs } from "@/app/server/blogs";


const Home = async () => {

  const data = await getAllBlogs()

  return (
    <div className={styles.container}>
      {/* side profile position fixed hoga*/}
      <div className={styles.profile}>
        <div className={styles.profileCard}>
          <div className={styles.pic}>
            <img
              src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
              alt="DP"
            />
          </div>
          <div className={styles.details}>
            <div>Full Name</div>
            <div>1 Friends</div>
          </div>
        </div>
        <div className={styles.contact}>Email</div>
        <div className={styles.blogInfo}>
          <div className={styles.totalBlogs}>
            <p>Total blogs posted</p>
            <p>51</p>
          </div>
          <div className={styles.blogViews}>
            <p>Total views on all blogs</p>
            <p>2186</p>
          </div>
        </div>
      </div>

      {/* all blogs here */}
      <div className={styles.blogsContainer}>
        <div className={styles.blogCard}>
          <div className={styles.profilePostCard}>
            <div className={styles.pic}>
              <img
                src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                alt="DP"
              />
            </div>
            <div className={styles.details}>
              <div>
                Full Name . <span>Time</span>
              </div>
              <div>1 Friends</div>
            </div>
          </div>
          <div className={styles.blogPart}>
            {/* Title */}
            <h2>Title Lorem ipsum dolor sit amet.</h2>
            {/* Description */}
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
              aperiam quis incidunt doloremque consequuntur. Iste quis harum
              consequatur repudiandae molestias.
            </p>
            <img
              src="https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlJTIwb3JpZW50YXRpb258ZW58MHx8MHx8fDA%3D"
              alt="Blog Image"
            />
          </div>
          <div className={styles.actionButtons}>
            <div>
              <span> 51 </span>
              <button className={styles.btn}>Like</button>
            </div>
            <div>
              <span> 51 </span>
              <button className={styles.btn}>Comment</button>
            </div>
            <button>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
