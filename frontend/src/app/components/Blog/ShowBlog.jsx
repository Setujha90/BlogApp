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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.profile}>
          <img src={owner.avatarImage} alt="avatar" />
          <div className={styles.profileInfo}>
            <Link href={`/user/${owner._id}`}>@{owner.username}</Link>
            <p>
              {formatRelativeTime(blog.createdAt)} · {blog.noOfViews} views
            </p>
          </div>
        </div>
        <div>
          {loggedInUser && loggedInUser._id === owner._id ? (
            <button
              onClick={async (e) => {
                dispatch(updateStart());
                try {
                  const response = await deleteBlog(blog._id);
                  router.replace("/");
                  dispatch(updateSuccess(response));
                } catch (error) {
                  dispatch(updateFailure(error));
                  console.error("Error deleting blog:", error);
                }
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={styles.blogPart}>
        <h1>{blog.title}</h1>
        <p>{blog.description}</p>
        {/* Render the first image */}
        {blog.images?.length > 0 && <img src={blog.images[0]} alt="holla" />}
      </div>
      {/* comment sectoin */}

      <hr className={commentStyles.hr} />

      <div className={styles.actionButtons}>
        <div>{blog.noOfViews} Views</div>

        <div>
          <span>{like} </span>
          <FontAwesomeIcon
            onClick={async (e) => {
              try {
                dispatch(likeStart());
                const response = await likeBlog(blog._id);
                setLike(response.blog.noOfLikes);
                dispatch(likeSuceess(response.user));
              } catch (error) {
                dispatch(likeFailure(error));
                console.error(error);
              }
            }}
            style={{
              color: loggedInUser?.likedBlogs.includes(blog._id)
                ? "red"
                : "white",
            }}
            icon={faHeart}
          />
        </div>

        <div>
          <span>{blog.noOfComments} </span>
          <FontAwesomeIcon style={{ color: "white" }} icon={faComment} />
        </div>
      </div>

      <hr className={commentStyles.hr} />

      <div className={commentStyles.comment}>
        <WriteComment id={id} blogComments={comments} commentIdReply={null} />
      </div>
    </div>
  );
};

export default ShowBlog;
