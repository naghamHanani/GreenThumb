const Joi = require('@hapi/joi');

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
   
    
});

const signupSchema = Joi.object({
    name: Joi.string().required(),
    role: Joi.string().required(),
    email: Joi.string().email().required().custom((value, helpers) => {
        if (!value.includes('@') || !value.endsWith('.com')) {
            return helpers.message('"email" must include "@" and end with ".com"');
        }
        return value;
    }),
    password: Joi.string().pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/).min(8).required()
}).unknown(true);

const resourcesSchema=Joi.object({
    name: Joi.string().required(),
    type : Joi.string().required(),
    availiability: Joi.boolean().required(),
    ownerID : Joi.number().required()

})

const knowledgeSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    author: Joi.string().required()
});

module.exports = {
    loginSchema,
    signupSchema,
    resourcesSchema,
    knowledgeSchema
};