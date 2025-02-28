import { Router } from "express";
import { listCompaniesByAZValidator, listCompaniesByCategoryValidator, listCompaniesByYearsValidator, listCompaniesByZAValidator, listCompaniesValidator, registerCompanyValidator, updateCompanyValidator } from "../middlewares/companies-validator.js";
import { ExcelReport, listCompanies, listCompaniesByAZ, listCompaniesByCategory, listCompaniesByYears, listCompaniesByZA, registerCompany, updateCompany } from "./companies.controller.js";

const router = Router();

/**
 * @swagger
 * /companies/register:
 *   post:
 *     summary: Register a new company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Company Name"
 *               description:
 *                 type: string
 *                 example: "Company Description"
 *               address:
 *                 type: string
 *                 example: "Company Address"
 *               email:
 *                 type: string
 *                 example: "company@example.com"
 *               impactLevel:
 *                 type: string
 *                 example: "HIGH_LEVEL"
 *               yearsOperating:
 *                 type: number
 *                 example: 10
 *               category:
 *                 type: string
 *                 example: "Technology"
 *               webPage:
 *                 type: string
 *                 example: "https://www.company.com"
 *     responses:
 *       201:
 *         description: Company has been created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Company has been created."
 *                 company:
 *                   $ref: '#/components/schemas/Company'
 *       500:
 *         description: Company registration failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Company registration failed."
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */

router.post("/register", registerCompanyValidator, registerCompany)

/**
 * @swagger
 * /companies/listCompanies:
 *   get:
 *     summary: Get a list of all companies
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: List of companies retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 total:
 *                   type: number
 *                   example: 10
 *                 companieslist:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Company'
 *       500:
 *         description: Couldn't get the list of companies.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Couldn't get the list of companies."
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */

router.get("/listCompanies", listCompaniesValidator, listCompanies)

/**
 * @swagger
 * /companies/listCompaniesByYears:
 *   get:
 *     summary: Get a list of companies sorted by years operating
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: List of companies retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 total:
 *                   type: number
 *                   example: 10
 *                 companieslist:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Company'
 *       500:
 *         description: Couldn't get the list of companies by years.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Couldn't get the list of companies by years."
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */

router.get("/listCompaniesByYears", listCompaniesByYearsValidator, listCompaniesByYears)

/**
 * @swagger
 * /companies/listCompaniesByCategory/{category}:
 *   get:
 *     summary: Get a list of companies by category
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: The category of the companies
 *     responses:
 *       200:
 *         description: List of companies retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 total:
 *                   type: number
 *                   example: 10
 *                 companieslist:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Company'
 *       500:
 *         description: Couldn't get the list of companies by category.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Couldn't get the list of companies by category."
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */

router.get("/listCompaniesByCategory/:category", listCompaniesByCategoryValidator, listCompaniesByCategory)

/**
 * @swagger
 * /companies/listCompaniesByAZ:
 *   get:
 *     summary: Get a list of companies sorted by name A-Z
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: List of companies retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 total:
 *                   type: number
 *                   example: 10
 *                 companieslist:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Company'
 *       500:
 *         description: Couldn't get the list of companies sorted by name A-Z.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Couldn't get the list of companies sorted by name A-Z."
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */

router.get("/listCompaniesByAZ", listCompaniesByAZValidator, listCompaniesByAZ)

/**
 * @swagger
 * /companies/listCompaniesByZA:
 *   get:
 *     summary: Get a list of companies sorted by name Z-A
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: List of companies retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 total:
 *                   type: number
 *                   example: 10
 *                 companieslist:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Company'
 *       500:
 *         description: Couldn't get the list of companies sorted by name Z-A.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Couldn't get the list of companies sorted by name Z-A."
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */

router.get("/listCompaniesByZA", listCompaniesByZAValidator, listCompaniesByZA)

/**
 * @swagger
 * /companies/updateCompany/{id}:
 *   put:
 *     summary: Update a company
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the company to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Company Name"
 *               description:
 *                 type: string
 *                 example: "Updated Company Description"
 *               address:
 *                 type: string
 *                 example: "Updated Company Address"
 *               email:
 *                 type: string
 *                 example: "updated@example.com"
 *               impactLevel:
 *                 type: string
 *                 example: "MEDIUM_LEVEL"
 *               yearsOperating:
 *                 type: number
 *                 example: 15
 *               category:
 *                 type: string
 *                 example: "Finance"
 *               webPage:
 *                 type: string
 *                 example: "https://www.updatedcompany.com"
 *     responses:
 *       200:
 *         description: Company has been updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Company has been updated."
 *                 company:
 *                   $ref: '#/components/schemas/Company'
 *       404:
 *         description: Company not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Company not found."
 *       500:
 *         description: Company update failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Company update failed."
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */

router.put("/updateCompany/:id", updateCompanyValidator, updateCompany)

/**
 * @swagger
 * /companies/excel:
 *   get:
 *     summary: Generate an Excel report of all companies
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: Excel report generated successfully.
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Error generating the Excel report.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error generating the Excel report."
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */

router.get("/excel", ExcelReport)

export default router;