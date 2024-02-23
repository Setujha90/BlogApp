import { comment, getBlogById } from '@/app/server/blogs';
import React, { useState } from 'react'
import commentStyles from "./styles.module.css"
import Comment from './Comment';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { getCommentById, replyComment } from '@/app/server/comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


const WriteComment = ({id, blogComments, commentIdReply, replyCommentId}) => {

    const user = useSelector(state => state.user.currentUser)
    const [commentContent, setCommentContent] = useState("")
    const [comments, setComments] = useState(blogComments); // New state to store comments
    
    const [replyContent, setReplyContent] = useState("")
    const [replyComments, setReplyComments] = useState(replyCommentId)

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

    async function createReply(){
        try{
            const reply = await replyComment(commentIdReply, replyContent)

            const updatedReplyComment = await getUpdatedReplyComment(commentIdReply)
            setReplyComments(updatedReplyComment)
            setReplyContent("")
        }
        catch(error){
            console.error("Error while creating reply ", error)
        }
    }

    async function getUpdatedReplyComment(commentId){
        try{
            const commentData = await getCommentById(commentId)
            return commentData.comment
        }
        catch(error){
            console.error("Error while fetching comment reply: ", error)
            return []
        }
    }

  return (
    <>
    {
        user ? (
        <form onSubmit={(e)=>{
            e.preventDefault()
            console.log(commentIdReply)
            commentIdReply ? createReply() : createComment()
        }}>
            <div className={commentStyles.writeComment}>
                <Image src={user.avatarImage} width={70} height={70} />
                <input type="text" placeholder='Enter Your Comment' value={commentIdReply ? replyContent : commentContent} onChange={(e)=>{
                    commentIdReply ? setReplyContent(e.target.value) : setCommentContent(e.target.value)
                }} />
                <button disabled={commentIdReply ? replyContent.length === 0 : commentContent.length === 0}><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
        </form>
        )
            :
            "Login to comment!!!"
    }                
    <div className={commentStyles.commentSection}>
    {
        commentIdReply ? 
        
        replyComments.map((commentId, i) => {
            return (<Comment key={i} commentId={commentId} />)
        })
        :
        comments.map((commentId, i) => {
            return (<Comment key={i} commentId={commentId} />)
        })
    }
    </div>
    </>
  )
}

export default WriteComment
