import Profile from '@/app/components/Profile/Profile.jsx'
import React from 'react'


const page = ({params}) => {

  return (
    <div>
      <Profile id={params.id} />
    </div>
  )
}

export default page
