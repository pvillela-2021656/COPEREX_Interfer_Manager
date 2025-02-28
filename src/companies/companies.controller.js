import Company from './companies.model.js';

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

        const company = await Company.findByIdAndUpdate(id, data, {new: true});
        if(!company){
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
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Company update failed.",
            error: err.message
        });
    }
};