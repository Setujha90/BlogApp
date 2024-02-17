// "use client"
import Profile from '@/app/components/Profile/Profile.jsx'
import React from 'react'

const page = async({params}) => {
  return (
      <Profile id={params.id} />
  )
}

export default page
