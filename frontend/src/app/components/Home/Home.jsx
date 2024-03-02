"use client";
import React from "react";
import styles from "./styles.module.css";
import SideProfile from "./SideProfile";

import { useSelector } from "react-redux";
import FetchBlogs from "./FetchBlogs";

const Home = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="relative flex justify-center gap-8 py-5 md:py-10">
      {/* side profile position fixed hoga*/}
      {/* {user ? <SideProfile /> : ""} */}

      {/* all blogs here */}
      <div className="w-[90%] md:w-[40%] flex flex-col bg-white bg-opacity-20 px-1 py-1 rounded-md">
        <FetchBlogs />
      </div>
    </div>
  );
};

export default Home;
