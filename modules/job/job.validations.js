import joi from "joi"
export const validateShema = (req,res,next)=>{
    const SchemaValidation = joi.object({
        jobTitle: joi.string().min(2).required(),
        jobLocation: joi.string().min(2).required(),
        workingTime: joi.string().min(2).required(),
        seniorityLevel: joi.string().min(2).required(),
    })
    const validationError = SchemaValidation.validate(req.body)
    if (validationError.error) {
        return res.json({error: validationError})
    }
    next()
    
    
    }