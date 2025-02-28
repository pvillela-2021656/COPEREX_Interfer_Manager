import jwt from "jsonwebtoken"
import Admin from "../admins/admins.model.js"

export const validateJWT = async (req, res, next) => {
    try {
        let token = req.body.token || req.query.token || req.headers["authorization"]

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "There is no token in this request."
            })
        }

        token = token.replace(/^Bearer\s+/, "")

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const admin = await Admin.findById(uid)

        if (!admin) {
            return res.status(400).json({
                success: false,
                message: "No User in the DataBase."
            })
        }

        if (admin.status === false) {
            return res.status(400).json({
                success: false,
                message: "Admin has already been deactivated."
            })
        }

        req.administrador = admin
        next()
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error validating the token.",
            error: err.message
        })
    }
}