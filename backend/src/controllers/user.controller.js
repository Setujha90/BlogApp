import {User} from "../models/user.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloud } from "../utils/cloudinary.js"
import {View} from "../models/views.models.js"
import { Like } from "../models/likes.models.js"
import { Blog } from "../models/blog.models.js"

export const generateAccessAndRefreshToken = async(id) => {
    const user = await User.findById(id)

    if(!user){
        throw new ApiError(401, "Unauthorized access")
    }

    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()

    user.refreshToken = refreshToken

    await user.save({validateBeforeSave: false})

    return {accessToken, refreshToken}
}

export const register = asyncHandler(async(req, res) => {
    const { username, fullName, email, password } = req.body
    const avatarImageLocalPath = req.file?.path

    if([username, fullName, email, password].some((field)=> !field || field.trim() === "")){
        throw new ApiError(401, "All the fields are required!!!")
    }
    
    const userExists = await User.findOne({
        $or : [{username}, {email}]
    })

    if(userExists){
        throw new ApiError(400, "User with same username or email already exists")
    }

    if(!avatarImageLocalPath){
        throw new ApiError(401, "Please upload avatar image")
    }

    const avatarImage = await uploadOnCloud(avatarImageLocalPath)

    if(!avatarImage){
        throw new ApiError(501, "Error while uploading avatarImage to cloud")
    }


    const user = await User.create({
        username,
        fullName,
        email,
        password,
        avatarImage: avatarImage.url
    })

    if(!user){
        throw new ApiError(500, "Error while register user")
    }

    const createdUser = await User.findById(user._id).select("-password -refreshToken -role")

    if(!createdUser){
        throw new ApiError(500, "Error while register user (search me nhi mile for createdUser)")
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                createdUser
            },
            "User registerd successfully"
        ))
})

export const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    if(!email && !password){
        throw new ApiError(400, "Email and Password both are required")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(404, "User not found, please register first")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(403, "Unauthorized access, password is incorrect")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken -role")

    const options = {
        // httpOnly: true,
        sameSite: false,
        maxAge: 24 * 60 * 60 * 1000,
        // secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, {
            sameSite: false,
            maxAge: 24 * 60 * 60 * 1000,
        })
    .cookie("refreshToken", refreshToken, {
        sameSite: false,
        maxAge: 24 * 60 * 60 * 10000,
    })
        .json(new ApiResponse(
            200, 
            {
                loggedInUser
            },
            "User logged in successfully"
        ))
})

export const logout = asyncHandler(async(req, res)=>{

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken : undefined
            }
        }
    )

    const options = {
        // httpOnly: true,
        // sameSite: none,
        // secure: true,
    }

    return res
        .status(200)
        .clearCookie("refreshToken")
        .clearCookie("accessToken")
        .json(new ApiResponse(
            200,
            {},
            "User logged off successfully"
        ))
})

export const getUserById = asyncHandler(async(req, res) => {
    const { id } = req.params

    if(!id){
        throw new ApiError(400, "Id is required, bad request")
    }

    let user;

    try {
        user = await User.findById(id)?.select("-password -refreshToken -role")
    
    } catch (error) {
        throw new ApiError(400, "Invalid id, bad request")
    }

    if(!user){
        throw new ApiError(400, "Invalid id, Bad request")
    }


    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                user
            },
            "User fetched successfully"
        ))
})

export const getAllUsers = asyncHandler(async(req, res) => {
    
    const user = await User.find()?.select("-password -refreshToken -role")

    if(!user){
        throw new ApiError(500, "Error on server")
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                user
            },
            "All users fetched successfully"
        ))

})

export const updateProfilePic = asyncHandler(async(req, res) => {
    const loggedInUser = req.user
    const {id} = req.params
    console.log(req.file)
    const avatarImageLocalPath = req.file?.path

    if(!id){
        throw new ApiError(400, "Invalid Id")
    }
    
    if(!loggedInUser){
        throw new ApiError(401, "User must be logged in")
    }

    const user = await User.findById(id)

    if(!user){
        throw new ApiError(404, "User not found!!")
    }

    if(!(String(loggedInUser._id) == String(user._id))){
        throw new ApiError(401, "You are unauthorised to delete blogs of other users")
    }

    if(!avatarImageLocalPath){
        throw new ApiError(401, "Please upload avatar image")
    }

    const avatarImage = await uploadOnCloud(avatarImageLocalPath)

    if(!avatarImage){
        throw new ApiError(501, "Error while uploading avatarImage to cloud")
    }

    user.avatarImage = avatarImage.url
    await user.save({validateBeforeSave:false})

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                user,
            },
            "User profile updated successfully!"
        ))

})

export const updateUserProfile = asyncHandler(async(req, res) => {
    const loggedInUser = req.user
    const {id} = req.params

    const {fullName, email} = req.body

    if(!loggedInUser){
        throw new ApiError(401, "User must be logged in to user these features")
    }

    if(!id){
        throw new ApiError(400, "Invalid user id")
    }

    if([fullName, email].some((field) => !field || field.trim() === "")){
        throw new ApiError(400, "All fields are required!!")
    }

    const user = await User.findById(id)

    if(!user){
        throw new ApiError(404, "User not found!!")
    }

    if(String(loggedInUser._id) !== String(user._id)){
        throw new ApiError(401, "You cannot tamper other users profile")
    }

    user.fullName = fullName
    user.email = email
    await user.save({validateBeforeSave:false})

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                user
            },
            "User updated successfully"
        ))
})

// user history is directly available in user model blogHistory
export const userHistory = asyncHandler(async(req, res) => {
    const user = req.user

    if(!user){
        throw new ApiError(401, "User must be logged in to use these features")
    }

    const history = await View.aggregate([
        {
            $match: {
                user: user._id,
            }
        },
        {
            $project:{
                _id:1
            }
        }
    ])

    const userHistory = history.map(item => item._id);

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                userHistory
            },
            "fetched successfully"
        ))
})

export const likedBlogs = asyncHandler(async(req, res) => {
    const user = req.user

    if(!user){
        throw new ApiError(401, "User must be logged in to use these features")
    }

    const blogs = await Like.aggregate([
        {
            $match: {
                user: user._id,
            }
        },
        {
            $project:{
                _id:1
            }
        }
    ])

    const likedBlogs = blogs.map(items => items._id)
    
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                likedBlogs
            },
            "fetched liked blogs successfully"
        ))
})

export const bookmark = asyncHandler(async(req, res) => {
    const loggedInUser = req.user
    const { id } = req.params
    const {blogId} = req.body

    if(!id){
        throw new ApiError(400, "Invalid user id")
    }

    if(!loggedInUser){
        throw new ApiError(401, "User must be logged in to use these features")
    }

    if(!blogId){
        throw new ApiError(400, "Blog id is required")
    }

    const blog = await Blog.findById(blogId)

    if(!blog){
        throw new ApiError(404, "Blog not found")
    }

    const user = await User.findById(id)

    if(!user){
        throw new ApiError(404, "User not found")
    }

    const isBookmarked = user.bookmark.includes(blogId)

    if(isBookmarked){
        user.bookmark = user.bookmark.filter(item => String(item) !== String(blogId))
        await user.save({validateBeforeSave:false})
        return res
            .status(200)
            .json(new ApiResponse(
                200,
                {
                    user
                },
                "Bookmark removed successfully"
            ))
    }

    user.bookmark.push(blogId)
    await user.save({validateBeforeSave:false})

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                user
            },
            "Bookmark added successfully"
        ))
})

export const follow = asyncHandler(async(req, res) => {
    const loggedInUser = req.user
    const {id} = req.params
    const {userId} = req.body

    if(!loggedInUser){
        throw new ApiError(401, "User must be logged in to use these features")
    }

    if(!id){
        throw new ApiError(400, "Invalid user id")
    }

    if(!userId){
        throw new ApiError(400, "Followed user id is required")
    }

    const user = await User.findById(id)

    if(!user){
        throw new ApiError(404, "User not found")
    }

    const followedUser = await User.findById(userId)

    if(!followedUser){
        throw new ApiError(404, "Followed user not found")
    }

    if(String(user._id) === String(followedUser._id)){
        throw new ApiError(400, "You cannot follow yourself")
    }

    const isFollowed = user.following.includes(userId)

    if(isFollowed){
        followedUser.followers = followedUser.followers.filter(item => String(item) !== String(user._id))
        await followedUser.save({validateBeforeSave:false})

        user.following = user.following.filter(item => String(item) !== String(userId))
        await user.save({validateBeforeSave:false})
        return res
            .status(200)
            .json(new ApiResponse(
                200,
                {
                    user
                },
                "Follow removed successfully"
            ))
    }

    followedUser.followers.push(user._id)
    await followedUser.save({validateBeforeSave:false})

    // add follow to user

    user.following.push(userId)
    await user.save({validateBeforeSave:false})
    
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                user
            },
            "Follow added successfully"
        ))
})