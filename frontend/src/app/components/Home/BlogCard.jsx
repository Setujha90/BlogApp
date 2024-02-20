import React, { useState, useEffect } from 'react';
import { userById } from '@/app/server/signup';
import Blogs from './Blogs';

const BlogCard = ({ data }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userDataArray = await Promise.all(
        data.map(async (blog) => {
          const { _id, fullName, avatarImage } = await userById(blog.owner);
          return { _id, fullName, avatarImage };
        })
      );
      setUserData(userDataArray);
    };

    fetchData();
  }, [data]);

  if(data.length === 0){
    return (<div>Empty</div>);
  }

  return (
    <>
      {data.map((blog, i) => (
        <Blogs blog={blog} userData={userData} i={i} />
      ))}
    </>
  );
};

export default BlogCard;
