import axios from "axios"


const url = "http://localhost:8000/api/v1/comment"


export const getCommentById = async(commentId) => {
    try{
        const comment = await axios.get(`${url}/${commentId}`)

        return comment.data.data["comment"]
    }
    catch(error){
        throw error
    }
}

export const updateComment = async(commentId) => {
    try{
        const comment = await axios.patch(`${url}/${commentId}/update`)

        return comment.data.data["comment"]
    }
    catch(error){
        throw error
    }
}

export const deleteComment = async(commentId) => {
    try{
        const comment = await axios.delete(`${url}/${commentId}/delete`)

        return comment.data.data["deletedComment"]
    }
    catch(error){
        throw error
    }
}