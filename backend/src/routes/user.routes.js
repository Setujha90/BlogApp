import { Router } from 'express';
import {upload} from "../middleware/multer.middleware.js"

import {
    login,
    register,
    logout,
    getUserById,
    getAllUsers,
} from "../controllers/user.controller.js"
import { verifyJWT } from '../middleware/auth.middleware.js';


const router = Router()

router.route("/register").post(upload.single('avatarImage'), register)
router.route("/login").post(login)
router.route("/:id").get(getUserById)
router.route("/").get(getAllUsers)


// secured routes
router.route("/logout").post(verifyJWT, logout)


export default router;