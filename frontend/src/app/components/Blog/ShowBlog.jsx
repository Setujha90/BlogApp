"use client"
import React, { useEffect, useState } from 'react';
import styles from "./Create/styles.module.css";
import commentStyles from "./styles.module.css"
import { comment, getBlogById } from '@/app/server/blogs';
import { userById } from '@/app/server/signup';
import Comment from './Comment';
import { useSelector } from 'react-redux';
import Image from 'next/image';

const ShowBlog = ({ id }) => {
    const [blog, setBlog] = useState({});
    const [owner, setOwner] = useState({});
    const [loading, setLoading] = useState(true);
    const [commentContent, setCommentContent] = useState("")
    const [comments, setComments] = useState([]); // New state to store comments

    const user = useSelector(state => state.user.currentUser)

    async function createComment(){
        try {
            const createdComment = await comment(id, commentContent);
            // After successfully creating a comment, fetch updated comments and update state
            const updatedComments = await getUpdatedComments(id);
            setComments(updatedComments);
            setCommentContent(""); // Clear comment input
        } catch (error) {
            console.error("Error while creating comment ", error)
        }
    }

    async function getUpdatedComments(blogId) {
        try {
            const blogData = await getBlogById(blogId);
            return blogData.comment;
        } catch (error) {
            console.error('Error fetching comments:', error);
            return [];
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const blogData = await getBlogById(id);
                setBlog(blogData);

                const writer = await userById(blogData.owner);
                setOwner(writer);

                // Set initial comments
                setComments(blogData.comment);
            } catch (error) {
                console.error('Error fetching data:', error);
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
            <div className={styles.profile}>
                <img src={owner.avatarImage} alt="avatar" />
                <p>{owner.fullName}</p>
            </div>
            <div>
                <h1>{blog.title}</h1>
                <p>{blog.description}</p>
                {/* Render the first image */}
                {blog.images.length > 0 && <img src={blog.images[0]} alt="holla" />}
            </div>
            {/* comment sectoin */}

            <hr className={commentStyles.hr}/>

            <div className={commentStyles.comment}>
                {
                    user ? (<>
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        createComment()
                    }}>
                        <div className={commentStyles.writeComment}>
                            <Image src={user.avatarImage} width={70} height={70} />
                            <input type="text" placeholder='Enter Your Comment' value={commentContent} onChange={(e)=>{
                                setCommentContent(e.target.value)
                            }} />
                            <button disabled={commentContent.length === 0}>Post</button>
                        </div>
                    </form>
                    </>)
                        :
                        "Login to comment!!!"
                }
                <div className={commentStyles.commentSection}>
                    {
                        comments.map((commentId, i) => {
                            return (<Comment key={i} commentId={commentId} />)
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default ShowBlog;
