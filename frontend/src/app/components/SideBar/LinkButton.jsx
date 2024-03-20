import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

const LinkButton = ({src, icon, type, link, children}) => {
  return (
		<Link className='transition-all text-sm ease-in hover:bg-[#f5f5f5] flex items-center gap-1 px-2 py-[5px] rounded-md  hover:shadow-lg' 
			href={link || "/"}>
		  <div className='w-7 flex justify-center'>
		  	{icon && <FontAwesomeIcon icon={icon} />}
		  	{src && <img src={src} alt="dp" />}
		  </div>
		  <p className={type ? "w-[100%]" : ""}>{type || null}</p>
      {children}
	  </Link>
  )
}

export default LinkButton
