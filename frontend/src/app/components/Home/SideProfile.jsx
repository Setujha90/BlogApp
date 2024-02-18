import React from 'react'
import styles from "./styles.module.css"

import { useSelector } from 'react-redux'

const SideProfile = () => {

  const {fullName, email, avatarImage, blogs} = useSelector(state => state.user.currentUser)
  
  return (
    <div className={styles.profile}>
        <div className={styles.profileCard}>
          <div className={styles.pic}>
            <img
              src={avatarImage}
              alt="DP"
            />
          </div>
          <div className={styles.details}>
            <div>{fullName}</div>
            <div>1 Friends</div>
          </div>
        </div>
        <div className={styles.contact}>{email}</div>
        <div className={styles.blogInfo}>
          <div className={styles.totalBlogs}>
            <p>Total blogs posted</p>
            <p>{blogs.length}</p>
          </div>
          <div className={styles.blogViews}>
            <p>Total views on all blogs</p>
            <p>2186</p>
          </div>
        </div>
        <div>
        </div>
    </div>
  )
}

export default SideProfile
