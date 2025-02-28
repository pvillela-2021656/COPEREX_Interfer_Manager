import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Company from './companies.model.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error generating the Excel report.",
            error: err.message
        });
    }
};
