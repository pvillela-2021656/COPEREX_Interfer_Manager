import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Company from './companies.model.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export const registerCompany = async (req, res) => {
    try {
        const data = req.body;

        const company = await Company.create(data);

        return res.status(201).json({
            success: true,
            message: "Company has been created.",
            company
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Company registration failed.",
            error: err.message
        });
    }
};

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

export const listCompanies = async (req, res) => {
    try {
        const companieslist = await Company.find();

        return res.status(200).json({
            success: true,
            total: companieslist.length,
            companieslist
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Couldnt get the list of companies.",
            error: error.message
        })
    }
}
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

export const listCompaniesByYears = async (req, res) => {
    try {
        const companieslist = await Company.find().sort({ yearsOperating: 1 });

        return res.status(200).json({
            success: true,
            total: companieslist.length,
            companieslist
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Couldn't get the list of companies by years.",
            error: err.message
        });
    }
};

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

export const listCompaniesByCategory = async (req, res) => {
    try {
        const companieslist = await Company.find().sort({ category: -1 });

        return res.status(200).json({
            success: true,
            total: companieslist.length,
            companieslist
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Couldn't get the list of companies by categories.",
            error: err.message
        });
    }
};

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

export const listCompaniesByAZ = async (req, res) => {
    try {
        const companieslist = await Company.find().sort({ name: 1 });

        return res.status(200).json({
            success: true,
            total: companieslist.length,
            companieslist
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Couldn't get the list of companies by categories.",
            error: err.message
        });
    }
};

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

export const listCompaniesByZA = async (req, res) => {
    try {
        const companieslist = await Company.find().sort({ name: -1 });

        return res.status(200).json({
            success: true,
            total: companieslist.length,
            companieslist
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Couldn't get the list of companies by categories.",
            error: err.message
        });
    }
};

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

export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { ...data } = req.body;

        const company = await Company.findByIdAndUpdate(id, data, { new: true });
        if (!company) {
            //Encontrando la compañía para actualizar
            return res.status(404).json({
                success: false,
                message: "Company not found."
            });
        }
        res.status(200).json({
            success: true,
            message: "Company has been updated.",
            company
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Company update failed.",
            error: err.message
        });
    }
};

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
//REPORTE DE EXCEL:
export const ExcelReport = async (req, res) => {
    try {
        const companies = await Company.find();
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Companies");

        worksheet.columns = [
            { header: "Name", key: "name", width: 30 },
            { header: "Description", key: "description", width: 60 },
            { header: "Address", key: "address", width: 40 },
            { header: "Email", key: "email", width: 20 },
            { header: "Impact Level", key: "impactLevel", width: 25 },
            { header: "Years Operating", key: "yearsOperating", width: 10 },
            { header: "Category", key: "category", width: 30 },
            { header: "Web Page", key: "webPage", width: 50 },
        ];

        companies.forEach(company => {
            worksheet.addRow(company);
        });

        const Directorio = path.join(__dirname, "../../public/reports/excel-reports");
        if (!fs.existsSync(Directorio)) {
            fs.mkdirSync(Directorio, { recursive: true });
        }
        
        const fileName = "companies-report.xlsx";
        const filePath = path.join(Directorio, fileName);

        await workbook.xlsx.writeFile(filePath);
        
        res.status(200).json({
            success: true,
            message: "Excel has been created.",
        })
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error generating the Excel report.",
            error: err.message
        });
    }
};