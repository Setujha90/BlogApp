import { userById } from '@/app/server/signup'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const FetchUserData = ({ id, tab }) => {
  
  const [user, setUser] = useState({})

  useEffect(() => {
    async function fetchUser(){
      try {
        const user = await userById(id)
        setUser(user)
      } catch (error) {
        throw error
      }
    }

    fetchUser()
  }, [])

  return (
    <div key={id}
      className='bg-white px-3 py-2 w-full flex justify-between gap-2 items-center rounded-md shadow-md'
    >
      <div className='flex gap-2 items-center'>
        <Image
          src={user?.avatarImage || '/images/default-avatar.jpg'}
          width={60}
          height={60}
          className='size-[60px] rounded-full object-cover object-fit'
          alt='user__image'
        />
        <div>
          <Link href={`/user/${user?._id}`} >{user?.username}</Link>
          <p className='text-slate-500 text-sm'>{user?.career}</p>
        </div>
      </div>
      {
        tab !== "Followers" && <button className='text-sm bg-slate-50 px-3 py-1 rounded-full shadow-md'>Following</button>
      }
    </div>
  )
}

export default FetchUserData
