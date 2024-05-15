"use client"
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FetchUserData from './FetchUserData';

const Friends = ({ params }) => {
  
  const user = useSelector(state => state.user.currentUser) || null
  const [search, setSearch] = useState("")
  const [tab, setTab] = useState("Followers")
  const [currentTabData, setCurrentTabData] = useState(user?.followers)
  
  useEffect(() => {
    if (tab === "Followers") {
      setCurrentTabData(user?.followers)
    } else if (tab === "Following") {
      setCurrentTabData(user?.following)
    } else {
      setCurrentTabData([])
    }
  }, [tab, user])
  

  // useEffect(() => {
  //   if (search) {
  //     setShow(user?.followers.filter(follower => {
  //       return follower.username.toLowerCase().includes(search.toLowerCase()) || follower.fullname.toLowerCase().includes(search.toLowerCase())
  //     }))
  //   } else {
  //     setShow(user?.followers)
  //   }
  // }, [search, user])

  return (
    <div className='md:px-40 md:py-5 flex flex-col items-center'>
      <div className='flex justify-between w-full px-1 py-1 bg-[#e2e2e2c2] rounded-xl'>
        <button  
          onClick={(e) => {setTab("Followers")}}
          className={`${tab === "Followers" && "bg-white"} hover:bg-white px-6 py-1 gap-2 rounded-md`}
        >
          Followers
        </button>
        <button  
          onClick={(e) => {setTab("Following")}}
          className={`${tab === "Following" && "bg-white"} hover:bg-white px-6 py-1 gap-2 rounded-md`}
        >
          Following
        </button>
        <button  
          onClick={(e) => {setTab("Suggestions")}}
          className={`${tab === "Suggestions" && "bg-white"} hover:bg-white px-6 py-1 gap-2 rounded-md`}
        >
          Suggestions
        </button>
      </div>
      <input 
        className='w-[80%] px-3 py-1 my-2 rounded-xl focus:outline-none outline-none'
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        value={search}
        type="text" 
        placeholder='Username / Full Name...' 
        />
      <div className='w-full flex flex-col gap-4' key={`/user/${user?._id}/friends`}>
        {
          currentTabData?.length > 0 && currentTabData?.map((userId) => {
            return <FetchUserData key={userId} id={userId} tab={tab} />
          })
        }
      </div>
    </div>
  )
}

export default Friends
