import Link from 'next/link'
import React from 'react'

const SideBard = () => {
  return (
    <div>
			{/* sb buttons yaha */}
      <div className='flex flex-col gap-2'>
				<Link href={"/"}>
					Profile
				</Link>
				<Link href={"/"}>
					Feeds
				</Link>
				<Link href={"/"}>
					Create Blog
				</Link>
				<Link href={"/"}>
					Friends
				</Link>
				<Link href={"/"}>
					Community
				</Link>
				<Link href={"/"}>
					Chat
				</Link>
			</div>

			{/* followings show krega yaha */}
      <div className='flex flex-col gap-2'>
				Followings
				<Link href={"/"}>
					Friends
				</Link>
				<Link href={"/"}>
					Friends
				</Link>
				<Link href={"/"}>
					Friends
				</Link>
			</div>
    </div>
  )
}

export default SideBard
