import Admin from "../admins/admins.model.js"
import Company from "../companies/companies.model.js"

export const emailExistsA = async (email = "") => {
    const existe = await Admin.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const companyExist = async (nameCompany) => {
    const existe = await Company.findOne({ nameCompany });
    if (existe) {
        throw new Error(`The Company ${nameCompany} is already registered`);
    }
}

export const emailExistsC = async (email = "") => {
    const existe = await Company.findOne({email})
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