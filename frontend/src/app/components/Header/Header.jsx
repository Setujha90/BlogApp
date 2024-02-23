"use client"
import React, { useState } from 'react'
import '../../page.css'
import styles from './styles.module.css'
import Link from 'next/link'

import { useSelector } from 'react-redux'
import Image from 'next/image'
import Logout from '../Logout'
import Spinner from '../Spinner'

const Header = () => {
  
  const user = useSelector(state => state.user.currentUser)
  const loading = useSelector(state => state.user.loading)

  const [dropDown, setDropDown] = useState(false)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.blog}>
          <Link className={styles.link} href={"/"}>Vishal's Blog</Link>
        </div>
        <div className={styles.search}>
          <input type="text" placeholder="Search..." />
        </div>
        <div className={styles.linkButton}>
          <div><Link className={styles.link} href="/">Home</Link></div>
          <div><Link className={styles.link} href="/About">About</Link></div>
          <div><Link className={styles.link} href="/Project">Projects</Link></div>
        </div>
        <div className={styles.right}>
          {/* <div>Dark/Light</div> */}
          {user ? 
            <>{loading && <Spinner width={50} height={50} />}
            {!loading && <Image onClick={(e)=>{
              setDropDown(!dropDown)
            }} className={styles.profileDP} src={user.avatarImage} width={60} height={60}/> }
            <div style={{display: dropDown? "flex": "none"}} className={styles.dropDown}>
              <Link className={styles.button} href={`/user/${user._id}`}>Profile</Link>
              <Link className={styles.button} href={'/blog/create'}>Create Blog</Link>
              <Logout/>
              <Link className={styles.button} href={"/"}>Help & Support</Link>
            </div>
            </>
            : <div><Link href={"/user/signup"} className={styles.btn}>Sign Up</Link></div>}
        </div>
      </div>
    </>
  )
}

export default Header
