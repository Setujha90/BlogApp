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
    bookmark,
    follow,
    generateAccessAndRefreshToken,
    renewLoggedinSession,
} from "../controllers/user.controller.js"
import { verifyJWT } from '../middleware/auth.middleware.js';


const router = Router()

router.route("/register").post(upload.single('avatarImage'), register)
router.route("/login").post(login)
router.route("/:id").get(getUserById)
router.route("/").get(getAllUsers)

router.route("/generateAccessToken").post(renewLoggedinSession)

// secured routes
router.route("/logout").post(verifyJWT, logout)
router.route("/:id/updateProfilePic").post(upload.single('avatarImage'),verifyJWT, updateProfilePic)
router.route("/:id/updateUserProfile").post(verifyJWT, updateUserProfile)
router.route("/:id/bookmark").post(verifyJWT, bookmark)
router.route("/:id/follow").post(verifyJWT, follow)

export default router;