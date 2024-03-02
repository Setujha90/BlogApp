"use client"
import React from 'react'
import { renewLoginSession } from '../server/signup'
import { useDispatch } from 'react-redux'
import { authFailure, authStart, signInSuccess } from '../redux/user/userSlice'
import { useRouter } from 'next/navigation'

const AuthUser = ({loginWall = false, children}) => {
  
  const dispatch = useDispatch()
  const router = useRouter()
  
  const cookie = document.cookie

  if(!cookie){
    return ;
  }
  const accessToken = cookie.split(';').find(c => c.trim().startsWith('accessToken=')).replace('accessToken=', '')
  const refreshToken = cookie.split(';').find(c => c.trim().startsWith('refreshToken=')).replace('refreshToken=', '')
  
  if(!accessToken){
    if(refreshToken){
      try {
        dispatch(authStart())
        const user = renewLoginSession()
        dispatch(signInSuccess(user))
      } catch (error) {
        dispatch(authFailure(error))
      }
    }
  }

  if(accessToken && refreshToken) {
    return (
      <>
      {children}
      </>
    )
  }

  if(loginWall){
    router.replace("/signup")
  }
  return(
    ""
  )
}

export default AuthUser
