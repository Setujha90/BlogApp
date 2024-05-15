"use client";
import { faBlogger } from '@fortawesome/free-brands-svg-icons'
import { faIdBadge, faPaperPlane, faRightFromBracket, faSquarePlus, faTowerBroadcast, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import LinkButton from './LinkButton'
import { useSelector } from 'react-redux'
import Logout from '../Logout';
import Followings from './Followings';
import Link from 'next/link';

const SideBar = () => {

  const user = useSelector(state => state.user.currentUser)

  return (
    <>
	<div className='hidden fixed top-5 md:flex flex-col justify-center text-sm gap-5 pl-5 w-[15%]'>
			
      <Link href='/' className='mx-auto'>
        Vishal's Blog
      </Link>

      {/* sb buttons yaha */}
      <div className='flex flex-col gap-1'>
				<LinkButton type={'Profile'} icon={faIdBadge} link={`/user/${user?._id}`} />
				<LinkButton type={'Feeds'} icon={faBlogger} />
				<LinkButton type={'Create Blog'} icon={faSquarePlus} link={`/blog/create`} />
				<LinkButton type={'Friends'} icon={faUserGroup} link={`/user/friends`} />
				<LinkButton type={'Community'} icon={faTowerBroadcast} />
				<LinkButton type={'Messages'} icon={faPaperPlane} />
        <LinkButton icon={faRightFromBracket} >
          <Logout />
        </LinkButton>
			</div>

			{/* followings show krega yaha */}
      <div className='flex flex-col gap-2'>
				<p className='ml-2'>Followings</p>
        {
          user?.following?.map((userId, index) => (
            <Followings key={index} userId={userId} />
          ))
        }
			</div>
    </div>
	</>
  )
}

export default SideBar
