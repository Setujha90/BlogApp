import { serachBlog } from '@/app/server/blogs';
import { searchUser } from '@/app/server/signup';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const UserFilter = () => {
  
  const [name, setName] = useState("");
  const [skills, setSkills] = useState([]);
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [tag, setTag] = useState([]);

  useEffect(() => {
    async function filterUserResults(){
      if(!name) return;
      try{
        const users = await searchUser(name, skills);
        setUsers(users);
      }
      catch(error){
        console.log(error)
      }
    }

    filterUserResults();
  }, [name, skills])

  useEffect(() => {
    async function filterBlogResults(){
      if(!name) return;
      try{
        const blogs = await serachBlog(name, tag);
        setBlogs(blogs);
      }
      catch(error){
        console.log(error)
      }
    }

    filterBlogResults()
  }, [name, tag])

  useEffect(() => {
    if(!name){
      setUsers([]);
      setBlogs([]);
    }
  }, [name])

  return (
    <>
      <input 
        className="rounded-full outline-none md:w-[100%] px-5 py-2" 
        type="text" 
        placeholder="Search..." 
        onChange={(e) => setName(e.target.value)}
      />

      <div key='Key' className={`${users.length > 0 || blogs.length > 0 ? 'w-[90%] h-fit mt-1 py-1 px-2' : 'w-0 h-0 p-0'} absolute flex flex-col gap-2 top-[100%] transition-all ease-in rounded-md bg-white`}>
        <p className={`${users.length > 0 ? "text-slate-500" : "hidden"}`}>Users</p>
        {
          name && users?.map((user) => (
            <Link href={`/user/${user._id}`} key={user._id} className="flex gap-2 p-1 transition-all ease-in-out hover:px-2 rounded-full items-center hover:bg-slate-200 hover:bg-opacity-50 ">
              <Image alt='UserProfileImage' src={user.avatarImage} width={30} height={0} className="rounded-full size-[30px] object-cover object-center" />
              <p>{user.fullName}</p>
            </Link>
          ))
        }
        <p className={`${blogs.length > 0 ? "text-slate-500" : "hidden"}`}>Blogs</p>
        {
          name && blogs?.map((blog) => (
            <Link href={`/blog/${blog._id}`} key={blog._id} className="flex gap-2 p-1 transition-all ease-in-out hover:px-2 rounded-full items-center hover:bg-slate-200 hover:bg-opacity-50 ">
              <p className=' line-clamp-1'>{blog.title}</p>
            </Link>
          ))
        }
        <Link className={`${users.length > 0 || blogs.length > 0 ? "text-xs text-blue-500 self-end" : "hidden"}`} href={'/'}>Show All Results</Link>
      </div>
    </>
  )
}

export default UserFilter
