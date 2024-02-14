import React from 'react'
import { LogoutSubmit } from '../server/signup.js'
import { useRouter } from 'next/navigation.js'
import '../styles/Profile.css'



const Logout = async() => {

    const router = useRouter()

  return (
    <button 
    onClick={async(e)=>{
      try{
        const response = await LogoutSubmit()
        console.log(response)
        router.replace("/")
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
