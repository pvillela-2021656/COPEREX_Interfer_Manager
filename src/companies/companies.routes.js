import { Router } from "express";
import { listCompaniesByAZValidator, listCompaniesByCategoryValidator, listCompaniesByYearsValidator, listCompaniesByZAValidator, listCompaniesValidator, registerCompanyValidator, updateCompanyValidator } from "../middlewares/companies-validator.js";
import { listCompanies, listCompaniesByAZ, listCompaniesByCategory, listCompaniesByYears, listCompaniesByZA, registerCompany, updateCompany } from "./companies.controller.js";

const router = Router();

router.post("/register", registerCompanyValidator, registerCompany)

router.get("/listCompanies", listCompaniesValidator, listCompanies)

router.get("/listCompaniesByYears", listCompaniesByYearsValidator, listCompaniesByYears)

router.get("/listCompaniesByCategory/:category", listCompaniesByCategoryValidator, listCompaniesByCategory)

router.get("/listCompaniesByAZ", listCompaniesByAZValidator, listCompaniesByAZ)

router.get("/listCompaniesByZA", listCompaniesByZAValidator, listCompaniesByZA)

router.put("/updateCompany/:id", updateCompanyValidator, updateCompany)
export default router;