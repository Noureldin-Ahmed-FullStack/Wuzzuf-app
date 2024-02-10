import joi from "joi"
export const validateShema = (req,res,next)=>{
    const SchemaValidation = joi.object({
        companyName: joi.string().min(2).required(),
        describtion: joi.string().min(2).max(900).required(),
        companyEmail: joi.string().min(2).email().required(),
        from: joi.number().optional(),
        to: joi.number().optional()
    })
    const validationError = SchemaValidation.validate(req.body)
    if (validationError.error) {
        return res.json({error: validationError})
    }
    next()
    
    
    }