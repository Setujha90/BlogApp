"use client";
import React, { useEffect, useState } from "react";
import "../../page.css";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import FetchProfileBlog from "./FetchProfileBlog";
import {
  follow,
  updateProfilePic,
  updateUserProfile,
  userById,
} from "@/app/server/signup";
import Link from "next/link";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "@/app/redux/user/userSlice";
import Spinner from "../Spinner";
import SideBard from "../SideBar/SideBard";

const Profile = ({ id, tab }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.currentUser);
  const updateLoading = useSelector((state) => state.user.loading);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarImage, setAvatarImage] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  const [isUserFollowed, setIsUserFollowed] = useState(null);
  const [noOfFolloers, setNoOfFolloers] = useState(0);
  const [noOfFollowings, setNoOfFollowings] = useState(0);

  const [currentTab, setCurrentTab] = useState(tab);
  const [currentTabData, setCurrentTabData] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await userById(id);
        setUser(user);
        setFullName(user.fullName);
        setEmail(user.email);
        setAvatarImage(user.avatarImage);
        setNoOfFolloers(user.followers.length);
        setNoOfFollowings(user.following.length);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    }

    function ifFollower() {
      if (loggedInUser && loggedInUser?.following?.includes(id)) {
        return true;
      } else {
        return false;
      }
    }

    setIsUserFollowed(ifFollower());
    fetchUser();
  }, [isUserFollowed]);

  useEffect(() => {
    function returnCurrentTabData() {
      if (currentTab === "Blogs") {
        return user?.blogs;
      } else if (currentTab === "History") {
        return user?.blogHistory;
      } else if (currentTab === "LikedBlogs") {
        return user?.likedBlogs;
      } else {
        return user?.bookmark;
      }
    }
    setCurrentTabData(returnCurrentTabData());
  }, [currentTab, user]);

  if (loading) {
    return <div>Loading Data...</div>;
  }

  return (

    <div>
      <SideBard />
    </div>


    // <div className={styles.container}>
    //   <div className={styles.profile}>
    //     {/* Main profile section */}
    //     <div className={styles.pic}>
    //       <label
    //         htmlFor={
    //           loggedInUser && loggedInUser?._id === user?._id ? "avatarImage" : ""
    //         }
    //       >
    //         {updateLoading && <Spinner width={200} height={200} />}
    //         {!updateLoading && <img src={avatarImage} alt="Profile Image" />}
    //       </label>
    //       <input
    //         style={{ display: "none" }}
    //         type="file"
    //         name="avatarImage"
    //         id="avatarImage"
    //         onChange={async (e) => {
    //           dispatch(updateStart());
    //           try {
    //             const response = await updateProfilePic(
    //               user._id,
    //               e.target.files[0],
    //             );
    //             setAvatarImage(response.avatarImage);
    //             dispatch(updateSuccess(response));
    //           } catch (error) {
    //             dispatch(updateFailure());
    //             console.log("Error while updating avatarImage:- ", error);
    //           }
    //         }}
    //       />
    //       <p>@{user?.username}</p>
    //     </div>
    //     <div className={styles.description}>
    //       <div className={styles.details}>
    //         <input
    //           onChange={(e) => {
    //             setFullName(e.target.value);
    //           }}
    //           value={fullName}
    //           disabled={!isEdit}
    //         />
    //         <input
    //           onChange={(e) => {
    //             setEmail(e.target.value);
    //           }}
    //           value={email}
    //           disabled={!isEdit}
    //         />
    //       </div>

    //       {loggedInUser && loggedInUser?._id === user?._id ? (
    //         <div className={styles.actionButtons}>
    //           {!isEdit && (
    //             <button
    //               onClick={(e) => {
    //                 setIsEdit(true);
    //               }}
    //               className={styles.editBtn}
    //             >
    //               Edit
    //             </button>
    //           )}
    //           {isEdit && (
    //             <button
    //               onClick={async (e) => {
    //                 dispatch(updateStart());
    //                 try {
    //                   const response = await updateUserProfile(
    //                     user._id,
    //                     fullName,
    //                     email,
    //                   );
    //                   setFullName(response.fullName);
    //                   setEmail(response.email);
    //                   setIsEdit(false);
    //                   dispatch(updateSuccess(response));
    //                 } catch (error) {
    //                   dispatch(updateFailure());
    //                   console.log("Error while updating user details", error);
    //                 }
    //               }}
    //               className={styles.updateBtn}
    //             >
    //               Update
    //             </button>
    //           )}
    //           <button>
    //             <Link href={"/blog/create"}>Create Blog</Link>
    //           </button>
    //         </div>
    //       ) : (
    //         ""
    //       )}
    //       {loggedInUser && loggedInUser?._id !== user?._id ? (
    //         <div>
    //           <button
    //             onClick={async (e) => {
    //               dispatch(updateStart());
    //               try {
    //                 const response = await follow(loggedInUser._id, user._id);
    //                 dispatch(updateSuccess(response.user));
    //                 setIsUserFollowed(
    //                   (prevIsUserFollowed) => !prevIsUserFollowed,
    //                 );
    //               } catch (error) {
    //                 dispatch(updateFailure(error));
    //                 console.error("Error while following user:- ", error);
    //               }
    //             }}
    //           >
    //             {isUserFollowed ? "Unfollow" : "Follow"}
    //           </button>
    //         </div>
    //       ) : (
    //         ""
    //       )}
    //     </div>

    //     <div className={styles.stats}>
    //       <div>
    //         <p>
    //           <span>{noOfFolloers}</span> Followers
    //         </p>
    //         <p>
    //           <span>{noOfFollowings}</span> Following
    //         </p>
    //         <p>
    //           <span>{user?.blogs?.length}</span> Blogs
    //         </p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Section 2 */}
    //   <div className={styles.section2}>
    //     <div className={styles.slideBar}>
    //       <div>
    //         <button
    //           style={
    //             currentTab === "Blogs"
    //               ? { background: "rgb(235, 235, 235, 10%)" }
    //               : {}
    //           }
    //           onClick={(e) => {
    //             setCurrentTab("Blogs");
    //           }}
    //         >
    //           Blogs
    //         </button>
    //       </div>
    //       <div>
    //         <button
    //           style={
    //             currentTab === "History"
    //               ? { background: "rgb(235, 235, 235, 10%)" }
    //               : {}
    //           }
    //           onClick={(e) => {
    //             setCurrentTab("History");
    //           }}
    //         >
    //           History
    //         </button>
    //       </div>
    //       <div>
    //         <button
    //           style={
    //             currentTab === "LikedBlogs"
    //               ? { background: "rgb(235, 235, 235, 10%)" }
    //               : {}
    //           }
    //           onClick={(e) => {
    //             setCurrentTab("LikedBlogs");
    //           }}
    //         >
    //           Liked Blogs
    //         </button>
    //       </div>
    //       <div>
    //         <button
    //           style={
    //             currentTab === "Bookmark"
    //               ? { background: "rgb(235, 235, 235, 10%)" }
    //               : {}
    //           }
    //           onClick={(e) => {
    //             setCurrentTab("Bookmarks");
    //           }}
    //         >
    //           Bookmarks
    //         </button>
    //       </div>
    //     </div>
    //     <div className={styles.data}>
    //       {currentTab.length != 0 ? (
    //         currentTabData?.map((blogId, i) => <FetchProfileBlog id={blogId} />)
    //       ) : (
    //         <div>No Posts Yet...</div>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Profile;
