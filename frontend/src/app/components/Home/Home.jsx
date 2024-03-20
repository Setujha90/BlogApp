"use client";
import React from "react";
import FetchBlogs from "./FetchBlogs";

const Home = () => {
  return (
      <div className="relative flex justify-center gap-8 py-5 md:py-10">
        {/* side profile position fixed hoga*/}
        {/* {user ? <SideProfile /> : ""} */}
        {/* all blogs here */}
        <div className="w-[90%] md:w-[50%] flex flex-col bg-white bg-opacity-20 p-1 rounded-md">
          <FetchBlogs />
        </div>
      </div>
  );
};

export default Home;
