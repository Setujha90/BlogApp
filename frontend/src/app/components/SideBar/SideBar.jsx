"use client";
import { faBlogger } from '@fortawesome/free-brands-svg-icons'
import { faIdBadge, faPaperPlane, faSquarePlus, faTowerBroadcast, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import LinkButton from './LinkButton'
import { useSelector } from 'react-redux'

const SideBar = () => {

  const user = useSelector(state => state.user.currentUser)

  return (
    <>
	<div className='fixed top-16 flex flex-col text-sm gap-5 px-5 w-[20%]'>
			{/* sb buttons yaha */}
      <div className='flex flex-col gap-1'>
				<LinkButton type={'Profile'} icon={faIdBadge} link={`/user/${user?._id}`} />
				<LinkButton type={'Feeds'} icon={faBlogger} />
				<LinkButton type={'Create Blog'} icon={faSquarePlus} />
				<LinkButton type={'Friends'} icon={faUserGroup} />
				<LinkButton type={'Community'} icon={faTowerBroadcast} />
				<LinkButton type={'Messages'} icon={faPaperPlane} />
			</div>

			{/* followings show krega yaha */}
      <div className='flex flex-col gap-2'>
				<p className='ml-2'>Followings</p>
				<LinkButton type={'Friends'} src={" "} />
				<LinkButton type={'Friends'} src={" "} />
				<LinkButton type={'Friends'} src={" "} />
				<LinkButton type={'Friends'} src={" "} />
				<LinkButton type={'Friends'} src={" "} />
			</div>
    </div>
	</>
  )
}

export default SideBar
