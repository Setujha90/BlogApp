"use client"
import React, { useState, useEffect } from "react";
import "../../page.css";
import styles from "./styles.module.css";
import axios from "axios";

const Profile = ({ id }) => {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/${id}`);
        setUser(response.data.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error gracefully, e.g., set error state
      }
    };

    fetchData();
  }, [id]);

  if (!user) {
    // Render loading state or return null
    return null;
  }

  const { username, fullName, email, avatarImage, blogs, viewedBlogs, blogHistory } = user;

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        {/* Main profile section */}
        <div className={styles.pic}>
          <img src={avatarImage} alt="Profile Image" />
          <p>#{username}</p>
        </div>
        <div className={styles.description}>
          <div className={styles.details}>
            <p>{fullName}</p>
            <p>{email}</p>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.editBtn}>Edit</button>
            {/* <button className={styles.updateBtn}>Update</button> */}
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className={styles.section2}>
        <div className={styles.slideBar}>
          <div>
            <button>Your Blogs</button>
          </div>
          <div>
            <button>History</button>
          </div>
          <div>
            <button>Liked Blogs</button>
          </div>
        </div>
        <div className={styles.data}>
          {[...Array(15)].map((_, index) => (
            <div key={index} className={`${styles.div1} ${styles[`divColor-${index + 1}`]}`}>
              Div {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
