"use client";
import React, { useEffect, useState } from "react";
import "../../page.css";
import { useDispatch, useSelector } from "react-redux";
import FetchProfileBlog from "./FetchProfileBlog";
import {
  follow,
  updateProfilePic,
  updateUserProfile,
  userById,
} from "@/app/server/signup";
import Image from "next/image";
import ProfileButton from "./ProfileButton";
import AuthUser from "@/app/utils/AuthUser";
import AuthLoggedInUser from "@/app/utils/AuthLoggedInUser";

const Profile = ({ id, tab }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.currentUser);
  const updateLoading = useSelector((state) => state.user.loading);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarImage, setAvatarImage] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  const [isUserFollowed, setIsUserFollowed] = useState(null);
  const [noOfFolloers, setNoOfFolloers] = useState(0);
  const [noOfFollowings, setNoOfFollowings] = useState(0);

  const [currentTab, setCurrentTab] = useState(tab);
  const [currentTabData, setCurrentTabData] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await userById(id);
        setUser(user);
        setFullName(user?.fullName);
        setEmail(user?.email);
        setAvatarImage(user.avatarImage);
        setNoOfFolloers(user?.followers?.length);
        setNoOfFollowings(user?.following?.length);
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

    setCurrentTabData(returnCurrentTabData() || []);
  }, [currentTab, user]);

  if (loading) {
    return <div>Loading Data...</div>;
  }

  return (

    <div className="w-[90%] rounded-lg overflow-hidden bg-[#f1f1f1] text-sm">
      <div className="w-[100%] h-fit mb-8">
        <div className="relative">
          <Image className="w-[100%] h-[200px] object-cover object-center"
            width={800}
            height={50}
            src="https://images.pexels.com/photos/268941/pexels-photo-268941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Cover Image"
          />
          <div className="absolute left-[5%] -bottom-[18%] flex justify-center items-end gap-3 text-sm">
            <Image className="w-[170px] h-[170px] rounded-full object-cover object-center"
              width={200}
              height={200}
              alt="dp"
              src={avatarImage || "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"}
            />
            <p>{noOfFolloers} Followers</p>
            <p>{noOfFollowings} Followings</p>
            <AuthUser>
              <ProfileButton type={isUserFollowed ? "Unfollow" : "Follow"} bg="#26D1FF" color="black" />
              <ProfileButton type="Chat" bg="#ADADAD" color="black" />
            </AuthUser>
          </div>
        </div>
      </div>
      <div className="px-10 py-3 flex justify-between">
        <div className="w-[70%]">
          <div>{fullName}</div>
          <div className="text-sm ml-2 text-slate-500">Software Engineer</div>
          <div className="text-sm ml-2 text-slate-500">Kolkata, West Bengal</div>
          <div className="my-2 leading-5">Description :- Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum sequi nulla cupiditate nobis animi quasi corporis temporibus ab maxime eveniet?</div>
          <AuthUser>
            <AuthLoggedInUser userId={user?._id}>
              <div>
                <ProfileButton onClick={(e) => {console.log("Clicked", e)}} type={"Edit Profile"} bg={"black"} border="2px solid black" color={"white"} />
                <ProfileButton type={"Settings"} bg={"white"} color={"black"} border="2px solid black" ></ProfileButton>
              </div>
            </AuthLoggedInUser>
          </AuthUser>
        </div>
        <div className="w-[30%] self-end text-right">
          <div className="text-slate-500">Skills</div>
          <div className="flex justify-end gap-2 text-sm text-right">
            <div className="bg-[#F8CB6A] px-3 py-1 rounded-2xl" >HTML</div>
            <div className="bg-[#F8CB6A] px-3 py-1 rounded-2xl" >CSS</div>
            <div className="bg-[#F8CB6A] px-3 py-1 rounded-2xl" >Dart</div>
            <div className="bg-[#F8CB6A] px-3 py-1 rounded-2xl" >C++</div>
          </div>
        </div>
      </div>
      <div className="px-10 py-3 text-md flex justify-center">
        <div className="flex gap-1 justify-center p-1 rounded-md bg-[#e2e2e2c2]">
          <button onClick={(e) => {setCurrentTab("Blog")}} className={`px-2 py-1 w-[150px] ${currentTab === "Blog" ? "bg-white" : "hover:bg-slate-100"} rounded-md`}>Blogs</button>
          <button onClick={(e) => {setCurrentTab("History")}} className={`px-2 py-1 w-[150px] ${currentTab === "History" ? "bg-white" : "hover:bg-slate-100"} rounded-md`}>History</button>
          <button onClick={(e) => {setCurrentTab("LikedBlogs")}} className={`px-2 py-1 w-[150px] ${currentTab === "LikedBlogs" ? "bg-white" : "hover:bg-slate-100"} rounded-md`}>Liked Blogs</button>
          <button onClick={(e) => {setCurrentTab("Bookmark")}} className={`px-2 py-1 w-[150px] ${currentTab === "Bookmark" ? "bg-white" : "hover:bg-slate-100"} rounded-md`}>Bookmark</button>
        </div>
      </div>
      <div className="px-10 py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 content-center">
        {currentTab.length != 0 ? (
          currentTabData?.map((blogId, i) => <FetchProfileBlog id={blogId} />)
        ) : (
          <div>No Posts Yet...</div>
        )}
      </div>
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
