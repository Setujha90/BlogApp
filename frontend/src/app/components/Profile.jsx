"use client"
import React, { useState } from 'react'
import '../styles/Profile.css'
import axios from 'axios'
import { LogoutSubmit } from '../server/signup.js'
import Spinner from './Spinner.jsx'

import { useRouter } from 'next/navigation'

const Profile = async({id}) => {

  const router = useRouter()

  let user;
  const url = "http://localhost:8000/api/v1/users"

  const [loading, setLoading] = useState(false)

  try {
    await axios.get(`${url}/${id}`)
    .then((res) => {
      user = res.data.data
    })
  
    
  } catch (error) {
    throw error
  }

  const { username, fullName, email, avatarImage, blogs } = user.user
  const loadingSpinner = <><Spinner/><span>Loading...</span></>
  

  return (
    <main>
      <div className="container">
        <div className='profile'>
          <div className='follow'>Follow</div>
          <div className='pic'>
            <img 
            src={`${avatarImage}`} 
            // src='../../public/sampleProfilePic/profile.jpg'
            alt="Profile picture" 
            width={200}
            height={200}
            />
            <div className='information'>
              <p>#{username}</p>
              <p>{fullName}</p>
              <p>{email}</p>
            </div>
          </div>
          <div className='msg'>
            <button 
              onClick={async(e)=>{
                try{
                  setLoading(true)
                  const response = await LogoutSubmit()
                  router.replace("/users/signup")
                }
                catch(error){
                  throw error
                }
                setLoading(false)
              }}
              className="btn btn2"
            >
              {loading ? loadingSpinner : 'Logout'}
            </button>
          </div>
        </div>
        <div className='blog-info'>
          <div className='blog'>
            <div>{blogs.length}</div>
            <div>Blogs Posted</div>
          </div>
          <div className='view'>
            <div>no of views</div>
            <div>Views</div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Profile
