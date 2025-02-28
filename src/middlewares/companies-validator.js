import { body, param } from "express-validator";
import { emailExistsC } from "../helpers/db-validators.js";
import { handleErrors } from "./handle_errors.js";
import { validarCampos } from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const registerCompanyValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("Name is required."),
    body("description").notEmpty().withMessage("Description is required."),
    body("address").notEmpty().withMessage("Address is required"),
    body("email").notEmpty().withMessage("The email IS required."),
    body("email").isEmail().withMessage("Not a valid Email."),
    body("email").custom(emailExistsC),
    body("impactLevel").notEmpty().withMessage("Impact level is required."),
    body("yearsOperating").notEmpty().withMessage("Years of operation is required."),
    body("category").notEmpty().withMessage("Category is required."),
    body("webPage").notEmpty().withMessage("Web page is required."),
    validarCampos,
    handleErrors,
]

export const listCompaniesValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors,
]

export const listCompaniesByYearsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors,
]

export const listCompaniesByCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("category").notEmpty().withMessage("Category is required."),
    validarCampos,
    handleErrors,
]

export const listCompaniesByAZValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors,
]

export const listCompaniesByZAValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors,
]

export const updateCompanyValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("Not a valid Mongo ID"),
    validarCampos,
    handleErrors,
]