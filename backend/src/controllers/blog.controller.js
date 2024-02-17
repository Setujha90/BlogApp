
import { Blog } from "../models/blog.models.js";
import { User } from "../models/user.models.js";
import { Like } from "../models/likes.models.js";
import { Comment } from "../models/comment.models.js"
import { View } from "../models/views.models.js"

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloud } from "../utils/cloudinary.js"
import mongoose from "mongoose";


export const createBlog = asyncHandler(async(req, res) => {
    const user = req.user
    
    if(!user){
        throw new ApiError(401, "unauthorised user, you must be logged in to post blogs")
    }

    const { title, description } = req.body

    if([title, description].some((field) => !field || field?.trim() === "")){
        throw new ApiError(400, "Both title and description are required!!!")
    }

    const thumbnailLocalPath = req.files?.thumbnail && req.files.thumbnail[0]?.path;
    const imagesLocalPath = req.files?.images && req.files.images[0]?.path;

    if(!thumbnailLocalPath){
        throw new ApiError(400, "thumbnail not provided")
    }

    const thumbnail = await uploadOnCloud(thumbnailLocalPath)

    if(!thumbnail){
        throw new ApiError(500, "Unable to upload thumbnail")
    }

    let images
    if(imagesLocalPath){
        images = await uploadOnCloud(imagesLocalPath)

        images = images.url
    }

    const blog = await Blog.create({
        title,
        description,
        thumbnail : thumbnail.url,
        images: [images || ""],
        owner : user._id
    })

    if(!blog){
        throw new ApiError(500, "Error while creating blog!!!")
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                blog
            },
            "Blog created successfully"
        ))
})

export const getAllBlogs = asyncHandler(async(req, res) => {
    
    const blogs = await Blog.find()

    if(!blogs){
        throw new ApiError(500, "Error while fetching all the blogs")
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                blogs
            },
            "Fetched all blogs successfully"
        ))
})

export const deleteBlog = asyncHandler(async(req, res) => {
    const blogId = req.params.id
    const user = req.user

    if(!blogId){
        throw new ApiError(400, "invalid blog id")
    }

    if(!user){
        throw new ApiError(401, "Login to perform these actions")
    }

    const blog = await Blog.findById(blogId)

    if(!blog){
        throw new ApiError(400, "Invalid Blog Id")
    }

    if(!(String(user._id) == String(blog.owner))){
        throw new ApiError(401, "You are unauthorised to delete blogs of other users")
    }

    const deletedBlog = await Blog.findByIdAndDelete(blogId)

    if(!deletedBlog){
        throw new ApiError(500, "Error while deleting blog")
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                deletedBlog
            },
            "Blog Deleted Successfully"
        ))
})

export const updateBlog = asyncHandler(async(req, res) => {
    const user = req.user
    const blogId = req.params.id
    const {title, description} = req.body

    if(!user){
        throw new ApiError(401, "Login to perform these actions")
    }

    if(!blogId){
        throw new ApiError(400, "invalid blog id")
    }

    const blog = await Blog.findById(blogId)

    if(!blog){
        throw new ApiError(400, "Invalid Blog Id")
    }

    if(!(String(user._id) == String(blog.owner))){
        throw new ApiError(401, "You are unauthorised to delete blogs of other users")
    }

    if([title, description].some((field) => !field || field?.trim() === "")){
        throw new ApiError(400, "Both title and description are required!!!")
    }


    const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
        $set:{
            title,
            description,
        }
    }, {new : true})

    if(!updatedBlog){
        throw new ApiError(500, "Error while updating the blog")
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                updatedBlog
            },
            "Updated blog successfully"
        ))
})

export const likeBlog = asyncHandler(async(req, res) => {

    const user = req.user
    // yaha checks lgana baaki h if same user baar baar like krde to

    if(!user){
        throw new ApiError(401, "Login to like this blog")
    }

    const blogId = req.params.id

    if(!blogId){
        throw new ApiError(400, "Invalid user id")
    }

    const blogObjectId = new mongoose.Types.ObjectId(`${blogId}`)

    // agar koi banda pehle se isko like kiye hoga to uska views document bana hoga to usme check krte h
    const ifAlreadyLikedBySameUser = await Like.aggregate([
        {
            $match:{
                blog : blogObjectId,
                likedBy : user._id
            }
        }
    ])

    if(ifAlreadyLikedBySameUser.length > 0){
        return res.status(200).json(new ApiResponse(200, {}, "User already liked this blog"))
    }

    const likesDocument = await Like.create({
        blog: blogId,
        likedBy: user._id
    })

    const LikedBlog = await Blog.findByIdAndUpdate(blogId, {
        $inc:{
            noOfLikes: 1
        }
    }, {new : true})

    if(!LikedBlog){
        throw new ApiError(500, "Error while updating the likes of blog")
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                LikedBlog, likesDocument
            },
            "Successfully liked the blog"
        ))
})

export const getBlogById = asyncHandler(async(req, res) => {
    const blogId = req.params.id
    const user = req.user

    if(!blogId){
        throw new ApiError(400, "Blog id is required")
    }

    const blog = await Blog.findById(blogId)

    if(!blog){
        throw new ApiError(400, "Blog id is invalid")
    }

    let viewedDocument
    // yaha or checks lgana baaki h if same user baar baar fetch kre usko handle krna h
    if(user){

        const blogObjectId = new mongoose.Types.ObjectId(`${blogId}`)
        
        const isAlreadyViewed = await View.aggregate([
            {
                $match:{
                    blog : blogObjectId,
                    user : user._id
                }
            }
        ])

        if(isAlreadyViewed.length > 0){
            return res.status(200).json(new ApiResponse(200, {blog}, "User already viewed this blog"))
        }

        viewedDocument = await View.create({
            blog: blogId,
            user: user._id
        })

        const userHistory = await User.findById(user._id)

        if(!userHistory){
            throw new ApiError(500, "Error while fetching user data")
        }

        userHistory.blogHistory.push(blogId)
        userHistory.save({validateBeforeSave: false})

        blog.noOfViews+=1
        blog.save({validateBeforeSave: false})
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                blog, viewedDocument
            },
            "fetched blog successfully"
        ))
})

export const comment = asyncHandler(async(req, res) => {
    const blogId = req.params.id
    const user = req.user
    
    if(!blogId){
        throw new ApiError(400, "Blog id is invalid")
    }

    if(!user){
        throw new ApiError(401, "Only logged in users can comment")
    }

    const { content } = req.body

    if(!content || content.trim() === ""){
        throw new ApiError(400, "Comment cannot be empty")
    }

    const comment = await Comment.create({
        content,
        owner: user._id,
        blog: blogId
    })

    if(!comment){
        throw new ApiError(500, "Error while creating comment!!! Please try again later")
    }

    const blog = await Blog.findById(blogId)
    
    if(!blog){
        throw new ApiError(400, "Error while fetching the blog")
    }

    blog.comment.push(comment)
    blog.save({validateBeforeSave: false})

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                comment, blog
            },
            "comment posted successfully"
        ))
})