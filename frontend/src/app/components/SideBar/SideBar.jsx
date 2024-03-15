"use client";
import { faBlogger } from '@fortawesome/free-brands-svg-icons'
import { faIdBadge, faPaperPlane, faSquarePlus, faTowerBroadcast, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import LinkButton from './LinkButton'
import { useSelector } from 'react-redux'
import Message from '@/app/utils/Message';

const SideBar = () => {

  const user = useSelector(state => state.user.currentUser)

  return (
    <>
	<div className='hidden fixed top-16 md:flex flex-col text-sm gap-5 pl-5 w-[15%]'>
			{/* sb buttons yaha */}
      <div className='flex flex-col gap-1'>
				<LinkButton type={'Profile'} icon={faIdBadge} link={`/user/${user?._id}`} />
				<LinkButton type={'Feeds'} icon={faBlogger} />
				<LinkButton type={'Create Blog'} icon={faSquarePlus} link={`/blog/create`} />
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
