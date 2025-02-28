import Admin from "../admins/admins.model.js"

export const emailExists = async (email = "") => {
    const existe = await Admin.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await Admin.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}


export const adminExists = async (uid = " ") => {
    const existe = await Admin.findById(uid)
    if(!existe){
        throw new Error("There is no ADMIN with that ID")
    }
}