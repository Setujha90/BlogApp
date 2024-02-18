"use client"
import React, { useState } from 'react'
import '../../page.css'
import styles from './styles.module.css'
import Link from 'next/link'

import { useSelector } from 'react-redux'
import Image from 'next/image'
import Logout from '../Logout'

const Header = () => {
  
  const user = useSelector(state => state.user.currentUser)

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
            <><Image onClick={(e)=>{
              setDropDown(!dropDown)
            }} className={styles.profileDP} src={user.avatarImage} width={60} height={60}/> 
            <div style={{display: dropDown? "flex": "none"}} className={styles.dropDown}>
              <button>Help & Support</button>
              <button>
                <Link href={`/user/profile`}>Profile</Link>
              </button>
              <button>
                <Link href={'/blog/5'}>Blog</Link>
              </button>
              <Logout/>
            </div>
            </>
            : <div><Link href={"/user/signup"} className={styles.btn}>Sign Up</Link></div>}
        </div>
      </div>
    </>
  )
}

export default Header
