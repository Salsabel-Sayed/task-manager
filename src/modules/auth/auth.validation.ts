import Joi from "joi"


const userVal = Joi.object({
    userName:Joi.string().min(3).max(10),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
     password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,10}$')),

})

export{
    userVal
}
