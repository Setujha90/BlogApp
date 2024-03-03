"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

const AuthUser = ({loginWall = false, children}) => {

  const router = useRouter()
  const user = useSelector(state => state.user.currentUser)

  if(user){
    return children
  }

  if(loginWall){
    router.replace("/signup")
  }
  return null
}

export default AuthUser
