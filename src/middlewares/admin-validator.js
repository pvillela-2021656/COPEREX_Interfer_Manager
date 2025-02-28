import { body } from "express-validator";
import { emailExists, usernameExists } from "../helpers/db-validators.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle_errors.js";
import { validarCampos } from "./validate-fields.js";

export const registerValidator = [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").notEmpty().withMessage("The email IS required."),
    body("email").isEmail().withMessage("Not a valid Email."),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }),
    validarCampos,
    deleteFileOnError,
    handleErrors,
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Not a valid email."),
    body("username").optional().isString().withMessage("Username's in a wrong format."),
    body("password").isLength({min: 4}).withMessage("The password MUST have at least of 8 characters."),
    validarCampos,
    handleErrors
]