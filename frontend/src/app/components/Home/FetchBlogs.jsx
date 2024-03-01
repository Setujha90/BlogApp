import React, { useState, useEffect, Suspense } from "react";
import BlogCard from "./BlogCard";
import { getAllBlogs } from "@/app/server/blogs";
import Await from "@/app/server/await";
import Skeleton from "./Skeleton";

const FetchBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* <Suspense fallback={<Skeleton />}> */}
      {/* <Await promise={blogs}> */}
      {/* {({blogs}) => <BlogCard blogs={blogs} />} */}
      {blogs.length > 0 ? (
        <BlogCard data={blogs} />
      ) : (
        <div>No Posts Available Right Now</div>
      )}
      {/* </Await> */}
      {/* </Suspense> */}
    </>
  );
};

export default FetchBlogs;
