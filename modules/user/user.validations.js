import joi from "joi"
export const validateShema = (req,res,next)=>{
    const signUpSchemaValidation = joi.object({
        firstName: joi.string().min(2).required(),
        lastName: joi.string().min(2).required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        repassword: joi.valid(joi.ref('password')).required(),
    })
    const validationError = signUpSchemaValidation.validate(req.body)
    if (validationError.error) {
        return res.json({error: validationError})
    }
    next()
    
    
    }