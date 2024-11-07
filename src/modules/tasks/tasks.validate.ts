import Joi from "joi"


const taskVal = Joi.object({
    title:Joi.string().min(3).max(20),
    description:Joi.string().min(3).max(100),
})

export{
    taskVal
}
