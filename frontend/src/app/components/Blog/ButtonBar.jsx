import React from 'react'

const ButtonBar = () => {
  return (
    <div>
      <hr />
      <div className='flex justify-between py-1 w-[100%]'>
        <div className=' space-x-3'>
          <button>Like</button>
          <button>Comment</button>
        </div>
        <div className='space-x-3'>
          <button>Bookmark</button>
          <button>Share</button>
          <button>Delete</button>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default ButtonBar
