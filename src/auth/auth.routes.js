import { Router } from "express"
import { loginValidator, registerValidator } from "../middlewares/admin-validator.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"
import { login, register } from "./auth.controller.js"

const router = Router()

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "admin"
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Admin has been registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Admin has been registered."
 *                 admin:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "admin"
 *                     email:
 *                       type: string
 *                       example: "admin@example.com"
 *                     password:
 *                       type: string
 *                       example: "password123"
 *       500:
 *         description: Admin registration failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Admin registration failed."
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */

router.post(
    "/register",
    uploadProfilePicture.single("profilePicture"),
    registerValidator,
    register
)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login as an admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               username:
 *                 type: string
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 adminDetails:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "jwt_token"
 *       400:
 *         description: Invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Crendenciales inválidas"
 *                 error:
 *                   type: string
 *                   example: "No existe el usuario o correo ingresado"
 *       500:
 *         description: Login failed, server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login failed, server error"
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */

router.post(
    "/login",
    loginValidator,
    login
)

export default router