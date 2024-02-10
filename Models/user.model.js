import mongoose from "mongoose";

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
        minLength: [2, 'first name is too short']
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
        minLength: [2, 'last name is too short']
    },
    userName: {
        type: String,
        trim: true,
        required: true,
        minLength: [2, 'username is too short']
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    recoveryEmail: {
        type: String,
        // required:true,        
    },
    dateOfBirth: {
        type: Date
    },
    profilePicture: {
        type: String,
        required: false,
        default: ""
    },
    resume:String,
    password: {
        type:String,
        required:true,        
    },
    role: {
        type: String,
        enum: ['User', 'Company_HR'],
        default: 'User'
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'
    }
},{toJSON: { virtuals: true }})

schema.virtual('companyHRVirtual', {
    ref: 'company',
    localField: '_id',
    foreignField: 'companyHR',
  });
  schema.pre('find', function () {
    this.populate('companyHRVirtual')
  })
export const userModel = mongoose.model("user", schema)