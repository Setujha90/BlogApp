import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import { getAllBlogs } from '@/app/server/blogs';

const FetchBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBlogs();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <BlogCard data={blogs} />
    </>
  );
};

export default FetchBlogs;
