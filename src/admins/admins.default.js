import { hash } from "argon2";
import Admin from "./admins.model.js";

export const adminDefault = async () => {
    try {

        const existingAdmin = await Admin.findOne({ role: "ADMIN_ROLE" });
        if (existingAdmin) {
            console.log("Admin has already been created");
            return;
        }
            await Admin.create({
                username: "ADMINDEFAULT",
                email: "ADMINDEFAULT@kinal.edu.gt",
                password: await hash("Poll2Granj#ro"),
                profilePicture: "pvillela.jpg",
                role: "ADMIN_ROLE"
            });
            
        console.log("Default admin created");

    } catch (err) {
        console.log("Error creating user");
    }
};