"use client"
import React from 'react'
import '../../page.css'
import styles from './styles.module.css'
import Link from 'next/link'

import { useSelector } from 'react-redux'
import Image from 'next/image'

const Header = () => {

  const { isUser, id, avatarImage } = useSelector(state => state)

  return (
    <>
      <navbar className={styles.header}>
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
          {isUser ? <Image className={styles.profileDP} src={avatarImage} width={60} height={60}/> : <div><Link href={"/user/signup"} className={styles.btn}>Sign Up</Link></div>}
        </div>
      </navbar>
    </>
  )
}

export default Header
