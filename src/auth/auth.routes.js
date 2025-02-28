import { Router } from "express"
import { loginValidator, registerValidator } from "../middlewares/admin-validator.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"
import { login, register } from "./auth.controller.js"

const router = Router()

router.post(
    "/register",
    uploadProfilePicture.single("profilePicture"),
    registerValidator,
    register
)

router.post(
    "/login",
    loginValidator,
    login
)

export default router