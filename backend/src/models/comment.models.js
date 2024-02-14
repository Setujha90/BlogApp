import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
        trim:true,
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref: "User",
        required:true,
    },
    blog:{
        type:mongoose.Types.ObjectId,
        ref: "Blog"
    }
}, {timestamps:true})

export const Comment = mongoose.model("Comment", commentSchema)