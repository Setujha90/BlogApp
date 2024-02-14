import {User} from "../models/user.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloud } from "../utils/cloudinary.js"


const generateAccessAndRefreshToken = async(id) => {
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

const register = asyncHandler(async(req, res) => {
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

const login = asyncHandler(async(req, res) => {
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
        // secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(
            200, 
            {
                loggedInUser
            },
            "User logged in successfully"
        ))
})

const logout = asyncHandler(async(req, res)=>{

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

const getUserById = asyncHandler(async(req, res) => {
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

const getAllUsers = asyncHandler(async(req, res) => {
    
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


export {register,login,logout, getUserById, getAllUsers}