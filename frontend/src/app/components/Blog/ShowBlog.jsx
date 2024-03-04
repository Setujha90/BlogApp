"use client";
import React, { useEffect, useState } from "react";
import styles from "./Create/styles.module.css";
import commentStyles from "./styles.module.css";
import { deleteBlog, getBlogById, likeBlog } from "@/app/server/blogs";
import { userById } from "@/app/server/signup";
import WriteComment from "./WriteComment";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faShareFromSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { formatRelativeTime } from "@/app/server/dateTime";
import { useDispatch, useSelector } from "react-redux";
import {
  likeFailure,
  likeStart,
  likeSuceess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "@/app/redux/user/userSlice";
import { copyToClipboard } from "@/app/server/copyToClipboard";
import Image from "next/image";
import ButtonBar from "./ButtonBar";

const ShowBlog = ({ id }) => {
  const [blog, setBlog] = useState({});
  const [owner, setOwner] = useState({});
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [like, setLike] = useState();

  const router = useRouter();

  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    async function fetchData() {
      try {
        const blogData = await getBlogById(id);
        setBlog(blogData);

        const writer = await userById(blogData.owner);
        setOwner(writer);

        // Set initial comments
        setComments(blogData.comment);
        setLike(blogData.noOfLikes);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (


    <div className="flex flex-col justify-center items-center w-[80%] text-xs px-10 py-6 bg-white mx-auto rounded-xl">
      {/* title plus profile */}
      <div>
        <h1 className="text-2xl font-bold w-[100%]">{blog.title}</h1>
        {/* profile section */}
        <div className="flex items-center gap-2 py-2">
          <Image className="w-[50px] h-[50px] object-cover object-fit rounded-full" width={60} height={60} src={owner.avatarImage} />
          <div>
            <p>@{owner.username} | {loggedInUser?.followings?.includes(owner._id) ? "Unfollow" : "Follow"}</p>
            <small>{formatRelativeTime(blog.createdAt)}</small>
          </div>
        </div>
        {/* like comment section */}
        <div>
          <ButtonBar />
        </div>
      </div>

      <div className="w-[60%] text-center pt-5">
        {/* description */}
        <div>
          `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae harum voluptatibus obcaecati aut provident saepe, aperiam consequatur tempora doloribus adipisci.`
          <hr className="w-[30%] mx-auto mt-2" />
        </div>
        {/* content section */}
        <div className="revert-tailwind">
          <h2>askfjh</h2>
          <p>gilajkffn asfha sfh </p>
        </div>
      </div>
        {/* same like comment section */}
        <div className="mx-auto md:w-[50%] w-[100%]">
          <ButtonBar />
        </div>
        {/* related posts */}
        <div>
        </div>
    </div>

// {/* <div>
//   <div>
//     <div>
//       <img src={owner.avatarImage} alt="avatar" />
//       <div>
//         <Link href={`/user/${owner._id}`}>@{owner.username}</Link>
//         <p>
//           {formatRelativeTime(blog.createdAt)} · {blog.noOfViews} views
//         </p>
//       </div>
//     </div>
//     <div>
//       {loggedInUser && loggedInUser._id === owner._id ? (
//         <button
//           onClick={async (e) => {
//             dispatch(updateStart());
//             try {
//               const response = await deleteBlog(blog._id);
//               router.replace("/");
//               dispatch(updateSuccess(response));
//             } catch (error) {
//               dispatch(updateFailure(error));
//               console.error("Error deleting blog:", error);
//             }
//           }}
//         >
//           <FontAwesomeIcon icon={faTrash} />
//         </button>
//       ) : (
//         ""
//       )}
//     </div>
//   </div>
//   <div>
//     <h1>{blog.title}</h1>
//     <p>{blog.description}</p>
//     {/* Render the first image */}
//     {blog.images?.length > 0 && <img src={blog.images[0]} alt="holla" />}
//   </div>
//   {/* comment sectoin */}
//   <hr />
//   <div>
//     <div>{blog.noOfViews} Views</div>
//     <div>
//       <span>{like} </span>
//       <FontAwesomeIcon
//         onClick={async (e) => {
//           try {
//             dispatch(likeStart());
//             const response = await likeBlog(blog._id);
//             setLike(response.blog.noOfLikes);
//             dispatch(likeSuceess(response.user));
//           } catch (error) {
//             dispatch(likeFailure(error));
//             console.error(error);
//           }
//         }}
//         style={{
//           color: loggedInUser?.likedBlogs.includes(blog._id) ? "red" : "white",
//         }}
//         icon={faHeart}
//       />
//     </div>
//     <div>
//       <span>{blog.noOfComments} </span>
//       <FontAwesomeIcon style={{ color: "white" }} icon={faComment} />
//     </div>
//   </div>
//   <hr />
//   <div>
//     <WriteComment id={id} blogComments={comments} commentIdReply={null} />
//   </div>
// </div> */}



    // <div className={styles.container}>
    //   <div className={styles.profileCard}>
    //     <div className={styles.profile}>
    //       <img src={owner.avatarImage} alt="avatar" />
    //       <div className={styles.profileInfo}>
    //         <Link href={`/user/${owner._id}`}>@{owner.username}</Link>
    //         <p>
    //           {formatRelativeTime(blog.createdAt)} · {blog.noOfViews} views
    //         </p>
    //       </div>
    //     </div>
    //     <div>
    //       {loggedInUser && loggedInUser._id === owner._id ? (
    //         <button
    //           onClick={async (e) => {
    //             dispatch(updateStart());
    //             try {
    //               const response = await deleteBlog(blog._id);
    //               router.replace("/");
    //               dispatch(updateSuccess(response));
    //             } catch (error) {
    //               dispatch(updateFailure(error));
    //               console.error("Error deleting blog:", error);
    //             }
    //           }}
    //         >
    //           <FontAwesomeIcon icon={faTrash} />
    //         </button>
    //       ) : (
    //         ""
    //       )}
    //     </div>
    //   </div>
    //   <div className={styles.blogPart}>
    //     <h1>{blog.title}</h1>
    //     <p>{blog.description}</p>
    //     {/* Render the first image */}
    //     {blog.images?.length > 0 && <img src={blog.images[0]} alt="holla" />}
    //   </div>
    //   {/* comment sectoin */}

    //   <hr className={commentStyles.hr} />

    //   <div className={styles.actionButtons}>
    //     <div>{blog.noOfViews} Views</div>

    //     <div>
    //       <span>{like} </span>
    //       <FontAwesomeIcon
    //         onClick={async (e) => {
    //           try {
    //             dispatch(likeStart());
    //             const response = await likeBlog(blog._id);
    //             setLike(response.blog.noOfLikes);
    //             dispatch(likeSuceess(response.user));
    //           } catch (error) {
    //             dispatch(likeFailure(error));
    //             console.error(error);
    //           }
    //         }}
    //         style={{
    //           color: loggedInUser?.likedBlogs.includes(blog._id)
    //             ? "red"
    //             : "white",
    //         }}
    //         icon={faHeart}
    //       />
    //     </div>

    //     <div>
    //       <span>{blog.noOfComments} </span>
    //       <FontAwesomeIcon style={{ color: "white" }} icon={faComment} />
    //     </div>
    //   </div>

    //   <hr className={commentStyles.hr} />

    //   <div className={commentStyles.comment}>
    //     <WriteComment id={id} blogComments={comments} commentIdReply={null} />
    //   </div>
    // </div>
  );
};

export default ShowBlog;
