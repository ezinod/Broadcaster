const Joi = require('@hapi/joi');

// Sign up validation
const singUpValidation = data =>{
    const schema ={
        firstName: Joi.string().min(4).required(),
        lastName: Joi.string().min(4).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema);
}

// Sing in validation
const singInValidation = data =>{
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema);
}


module.exports.singUpValidation = singUpValidation;
module.exports.singInValidation = singInValidation;