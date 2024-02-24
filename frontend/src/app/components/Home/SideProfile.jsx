import React from 'react'
import styles from "./styles.module.css"

import { useSelector } from 'react-redux'
import Link from 'next/link'

const SideProfile = () => {

  const userData = useSelector(state => state.user.currentUser)
  
  if(!userData){
    return <div>Yaha SignIn krne ka button</div>
  }

  const {_id, username, email, avatarImage, blogs} = userData

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
            <Link href={`/user/${_id}`}>@{username}</Link>
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
