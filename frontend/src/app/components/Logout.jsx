"use client"
import React from 'react'
import { LogoutSubmit } from '../server/signup.js'
import { useRouter } from 'next/navigation.js'
// import '../styles/Profile.css'

import { useDispatch } from 'react-redux'
import { loggedOut } from '../redux/user/userSlice.js'

const Logout = () => {

  const router = useRouter()

  const dispatch = useDispatch();

  return (
    <button 
    onClick={async(e)=>{
      try{
        const response = await LogoutSubmit()
        dispatch(loggedOut())
        router.replace("/user/signup")
      }
      catch(error){
        throw error
      }
    }}
    className="btn btn2"
  >
    Log Out
  </button>
  )
}

export default Logout
