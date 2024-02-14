"use client"
import React from 'react'
import '../page.css'
import '../styles/Header.css'
import Link from 'next/link'

import NextTopLoader from 'nextjs-toploader'

const Header = () => {
  return (
    <>
      <navbar className='header'>
        <div className='blog'>
          <Link className='link' href={"/"}>Vishal's Blog</Link>
        </div>
        <div className='search'>
          <input type="text" placeholder="Search..." />
        </div>
        <div className='link-button'>
          <div><Link className='link' href="/users/signup">Home</Link></div>
          <div><Link className='link' href="/About">About</Link></div>
          <div><Link className='link' href="/Project">Projects</Link></div>
        </div>
        <div className='right'>
          {/* <div>Dark/Light</div> */}
          <div><button className='btn'>Sign Up</button></div>
        </div>
      </navbar>
    </>
  )
}

export default Header
