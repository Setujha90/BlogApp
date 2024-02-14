import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },
    decription:{
        type:String,
        required:true,
        trim:true,
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref: "User"
    }
    ,
    thumbnail:{
        type:String,
        required:true,
    }
    ,
    images:[{
        type:String,
    }],
    tags:[{
        type:mongoose.Types.ObjectId,
        ref:"Tag"
    }],
    noOfLikes:{
        type:Number,
        default:0,
    },
    noOfViews:{
        type:Number,
        default:0,
    },
    noOfComments:{
        type:Number,
        default:0,
    },
    comment:[{
        type:mongoose.Types.ObjectId,
        ref: "Comment"
    }],
    views:{
        type:Number,
        default:0,
    }

}, {timestamps:true})

export const Blog = mongoose.model('Blog', blogSchema)
