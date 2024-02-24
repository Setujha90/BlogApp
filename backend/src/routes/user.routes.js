import { Router } from 'express';
import {upload} from "../middleware/multer.middleware.js"

import {
    login,
    register,
    logout,
    getUserById,
    getAllUsers,
    updateProfilePic,
    updateUserProfile,
    userHistory,
    likedBlogs,
    bookmark,
    follow,
} from "../controllers/user.controller.js"
import { verifyJWT } from '../middleware/auth.middleware.js';


const router = Router()

router.route("/register").post(upload.single('avatarImage'), register)
router.route("/login").post(login)
router.route("/:id").get(getUserById)
router.route("/").get(getAllUsers)


// secured routes
router.route("/logout").post(verifyJWT, logout)
router.route("/:id/updateProfilePic").post(upload.single('avatarImage'),verifyJWT, updateProfilePic)
router.route("/:id/updateUserProfile").post(verifyJWT, updateUserProfile)
router.route("/:id/history").post(verifyJWT, userHistory)
router.route("/:id/likedBlogs").post(verifyJWT, likedBlogs)
router.route("/:id/bookmark").post(verifyJWT, bookmark)
router.route("/:id/follow").post(verifyJWT, follow)

export default router;