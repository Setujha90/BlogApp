import { searchUser } from '@/app/server/signup';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const UserFilter = () => {
  
  const [name, setName] = useState("");
  const [skills, setSkills] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function filterUserResults(){
      if(!name) return;
      try{
        const users = await searchUser(name, skills);
        console.log(users)
        setUsers(users);
      }
      catch(error){
        console.log(error)
      }
    }

    filterUserResults();
  }, [name, skills])

  return (
    <>
      <input 
        className="rounded-full outline-none md:w-[100%] px-5 py-2" 
        type="text" 
        placeholder="Search..." 
        onChange={(e) => setName(e.target.value)}
      />
      
      <div key='Key' className="absolute flex flex-col gap-2 top-[100%] py-1 px-2 bg-white w-[90%]">
        {
          name && users?.map((user) => (
            <Link href={`/user/${user._id}`} key={user._id} className="flex gap-2 items-center">
              <Image src={user.avatarImage} width={30} height={30} className="rounded-full w-[30px] h-[30px] object-cover object-center" />
              <p>{user.fullName}</p>
            </Link>
          ))
        }
      </div>
    </>
  )
}

export default UserFilter
