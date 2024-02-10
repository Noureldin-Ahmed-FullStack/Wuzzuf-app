import mongoose from "mongoose";

const schema = new mongoose.Schema({
    companyName: {
        type: String,
        trim: true,
        required: true,
        minLength: [2, 'company name is too short']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    describtion: {
        type: String,
        minLength: [2, 'description is too short'],
        maxLength: [900, 'description is too long']
    },
    logo: String,
    address: {
        street: String,
        phone: String,
        city: String,
    },
    numberOfEmployees: String,
    companyEmail: {
        type: String,
        trim: true,
        required: true,
        unique : true,
    },
    companyHR: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required:true,
        unique : true
    }

})
export const companyModel = mongoose.model("company", schema)