import styles from "./styles.module.css"
import { deleteComment, getCommentById } from '@/app/server/comment.js'
import { userById } from '@/app/server/signup'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import WriteComment from "./WriteComment"
import { useSelector } from "react-redux"

const Comment = ({commentId}) => {

  const loggedInUser = useSelector(state => state.user.currentUser)
  

  const [comment, setComment] = useState({})
  const [commentOwner, setCommentOwner] = useState({})
  const [showReply, setShowReply] = useState(false)
  const [replyId, setReplyId] = useState([])
  const [deletedComment, setDeletedComment] = useState(false)

  useEffect(()=>{
    async function fetchComment(){
      const comment = await getCommentById(commentId)
      setComment(comment)
      setReplyId(comment.comment)
      // console.log(replyId)
      const commentOwner = await userById(comment.owner)
      setCommentOwner(commentOwner)
    }

    fetchComment()
  }, [])

  return (
    <div style={{display: deletedComment? "none" : "initial"}} className={styles.commentCard}>
      <div className={styles.commentProfile}>
        <Image src={commentOwner.avatarImage} width={50} height={50}></Image>
        <div>
          <p>{commentOwner.fullName} .<span className={styles.commentTime}>Time</span></p>
          <div className={styles.commentContent}>{comment.content}</div>
        </div>
      </div>
      <div className={styles.commentButton}>
        <span>{comment.noOfLikes} </span><button>Like</button>
        
        {
        loggedInUser && loggedInUser?._id === commentOwner._id ?     
        <>
        <button>Edit</button>
        <button onClick={async(e)=>{
          try {
            const deletedComment = await deleteComment(comment._id)

            setDeletedComment(true)
          } catch (error) {
            console.error("Error while deleting comment ", error)
          }
        }}>Delete</button>
        </>
        :
        ""
        }
        
        <span>{replyId.length} <button onClick={(e)=>{setShowReply(!showReply)}}>Reply</button></span>

        {
          showReply ? <WriteComment commentIdReply={comment._id} replyCommentId={comment.comment} /> : ""
        }

      </div>
    </div>
  )
}

export default Comment
