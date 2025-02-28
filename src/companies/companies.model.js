import { Schema, model } from 'mongoose';

const CompanySchema = new Schema({
    name:{
        type: String,
        required: [true, "Name of the company is required."],
        unique: true,
    },
    description:{
        type: String,
        required: [true, "Description of the company is required."],
    },
    address:{
        type: String,
        required: [true, "Address of the company is required."]
    },
    email:{
        type: String,
        required: [true, "Email of the company is required."]
    },
    impactLevel:{
        type: String,
        required: [true, "Level of impact of the company is required."],
        enum: ["HIGH_LEVEL", "MEDIUM_LEVEL", "LOW_LEVEL"]
    },
    yearsOperating:{
        type: Number,
        required: [true, "Years of operation of the company is required."],
    },
    category:{
        type: String,
        required: [true, "Category of the company is required."],
    },
    webPage:{
        type: String,
        required: [true, "Web page of the company is required."],
        unique: true,
    }
}, {
    versionKey: false,
    timestamps: true,
});

export default model('Company', CompanySchema);