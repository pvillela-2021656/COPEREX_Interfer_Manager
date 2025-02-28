import { hash } from "argon2";
import Admin from "../admins/admins.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

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