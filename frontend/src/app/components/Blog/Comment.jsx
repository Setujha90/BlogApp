import styles from "./styles.module.css"
import { getCommentById } from '@/app/server/comment.js'
import { userById } from '@/app/server/signup'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Comment = ({commentId}) => {

  const [comment, setComment] = useState({})
  const [commentOwner, setCommentOwner] = useState({})

  useEffect(()=>{
    async function fetchComment(){
      const comment = await getCommentById(commentId)
      setComment(comment)
      const commentOwner = await userById(comment.owner)
      setCommentOwner(commentOwner)
    }

    fetchComment()
  }, [])

  return (
    <div className={styles.commentCard}>
      <div className={styles.commentProfile}>
        <Image src={commentOwner.avatarImage} width={50} height={50}></Image>
        <div>
          <p>{commentOwner.fullName} .<span className={styles.commentTime}>Time</span></p>
          <div className={styles.commentContent}>{comment.content}</div>
        </div>
      </div>
      <div className={styles.commentButton}>
        <button>Like</button>
        <button>Reply</button>
      </div>
    </div>
  )
}

export default Comment
