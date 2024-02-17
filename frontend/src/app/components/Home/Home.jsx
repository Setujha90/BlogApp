"use client"
import React from "react";
import styles from "./styles.module.css";
import SideProfile from "./SideProfile";

import { useSelector } from "react-redux";
import FetchBlogs from "./FetchBlogs";

const Home = () => {

  const { isUser, id } = useSelector(state => ({
    isUser: state.isUser,
    id: state.id,
  }))

  return (
    <div className={styles.container}>
      {/* side profile position fixed hoga*/}
      { isUser ? <SideProfile id={id} /> : ""}

      {/* all blogs here */}
      <div className={styles.blogsContainer}>
        <FetchBlogs />
        
      </div>
    </div>
  );
};

export default Home;
