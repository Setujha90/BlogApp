"use client"
import React, { useEffect, useState } from "react";
import "../../page.css";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import FetchProfileBlog from "./FetchProfileBlog";
import { userById } from "@/app/server/signup";

const Profile = ({id}) => {

  
  const loggedInUser = useSelector(state => state.user.currentUser);
  
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser(){
      try {
        const user = await userById(id)
        setUser(user)
      } 
      catch (error) {
        throw error
      } 
      finally{
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if(loading){
    return (
      <div>Loading Data...</div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        {/* Main profile section */}
        <div className={styles.pic}>
          <img src={user.avatarImage} alt="Profile Image" />
          <p>#{user.username}</p>
        </div>
        <div className={styles.description}>
          <div className={styles.details}>
            <p>{user.fullName}</p>
            <p>{user.email}</p>
          </div>

          {
            loggedInUser && loggedInUser?._id === user._id ?           
            
            <div className={styles.actionButtons}>
              <button className={styles.editBtn}>Edit</button>
              <button className={styles.updateBtn}>Update</button>
              <button>Create Blog</button>
            </div>
            :
            ""
          }


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
          {
            user.blogs.length != 0? user.blogs.map((blogId, i) => 
              <FetchProfileBlog id={blogId} />
            )
            : 
            <div>No Posts Yet...</div>
          }
        </div>
      </div>
    </div>
  );
};

export default Profile;
