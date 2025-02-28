import { hash } from "argon2";
import Admin from "../admins/admins.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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

export const register = async (req, res) => {
    try {
        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        data.profilePicture = profilePicture

        const admin = await Admin.create(data);

        return res.status(201).json({
            message: "Admin has been created.",
            username: admin.username,
            email: admin.email,
            password: admin.password
        });
    } catch (err) {
        return res.status(500).json({
            message: "Admin registration failed.",
            error: err.message
        });
    }
}

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

export const login = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const admin = await Admin.findOne({
            $or:[{email: email}, {username: username}]
        })

        if(!admin){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error:"No existe el usuario o correo ingresado"
            })
        }

        const token = await generateJWT(admin.id)

        return res.status(200).json({
            message: "Login successful",
            adminDetails: {
                token: token
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "Login failed, server error",
            error: err.message
        })
    }
}