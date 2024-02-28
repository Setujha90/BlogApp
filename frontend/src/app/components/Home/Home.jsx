"use client"
import React from "react";
import styles from "./styles.module.css";
import SideProfile from "./SideProfile";

import { useSelector } from "react-redux";
import FetchBlogs from "./FetchBlogs";

const Home = () => {

  const user = useSelector(state => state.user.currentUser)

  return (
    <div className={styles.container}>
      {/* side profile position fixed hoga*/}
      { user ? <SideProfile /> : "Yaha Sign In ka button"}

      {/* all blogs here */}
      <div className={styles.blogsContainer}>
        <FetchBlogs />        
      </div>
    </div>
  );
};

export default Home;
