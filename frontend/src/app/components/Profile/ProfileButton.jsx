import React from 'react'

const ProfileButton = ({
    type="Likh de kuch",
    bg="black",
    border = "none",
    color="white",
    ...props
}) => {


  if(type === "Unfollow"){
    bg = "#ADADAD"
  }

  return (
    <button style={{backgroundColor: bg, color: color, border:border}} className='text-white px-3 py-1 mr-2 rounded-lg' {...props}>{type}</button>
  )
}

export default ProfileButton
