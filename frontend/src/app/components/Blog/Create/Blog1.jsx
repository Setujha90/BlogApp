"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";

import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "@/app/server/blogs";
import { useRouter } from "next/navigation";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "@/app/redux/user/userSlice";
import Spinner from "../../Spinner";

const Blog = () => {
  const router = useRouter();

  const loggedInUser = useSelector((state) => state.user.currentUser);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState(null);

  if (!loggedInUser) {
    return <div>You need to login first to create a blog</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <img src={loggedInUser.avatarImage} alt="avatar" />
        <p>{loggedInUser.fullName}</p>
      </div>

      <form
        encType="multipart/form-data"
        className={styles.blog}
        onSubmit={async (e) => {
          e.preventDefault();
          dispatch(updateStart());
          try {
            const { _id, user } = await createBlog(
              title,
              description,
              thumbnail,
              images,
            );
            // router.push(`/blog/${id}`)
            console.log("Blog Posted with id:-", _id);
            dispatch(updateSuccess(user));
            router.replace(`/blog/${_id}`);
          } catch (error) {
            dispatch(updateFailure(error));
            console.error("Error hua h yaarr ", error);
          }
        }}
      >
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          type="text"
          placeholder="Title"
        />

        <textarea
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
          rows="20"
          placeholder="decription"
        ></textarea>

        <label>
          Thumnail :{" "}
          <input
            name="thumbnail"
            id="thumbnail"
            onChange={(e) => {
              setThumbnail(e.target.files[0]);
            }}
            type="file"
          />
        </label>

        <label>
          Images :{" "}
          <input
            name="images"
            id="images"
            onChange={(e) => {
              setImages(e.target.files[0]);
            }}
            type="file"
          />
        </label>
        <button disabled={loading}>{loading ? <Spinner /> : "POST"}</button>
      </form>
    </div>
  );
};

export default Blog;
