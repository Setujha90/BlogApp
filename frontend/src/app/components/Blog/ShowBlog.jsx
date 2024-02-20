"use client"
import React, { useEffect, useState } from 'react';
import styles from "./Create/styles.module.css";
import { getBlogById } from '@/app/server/blogs';
import { userById } from '@/app/server/signup';

const ShowBlog = ({ id }) => {
    const [blog, setBlog] = useState({});
    const [owner, setOwner] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const blogData = await getBlogById(id);
                setBlog(blogData);

                const writer = await userById(blogData.owner);
                setOwner(writer);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

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
        </div>
    );
};

export default ShowBlog;
