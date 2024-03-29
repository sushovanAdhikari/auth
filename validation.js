//Validation
const Joi = require('@hapi/joi');

//register Validation
const registerationValidation = (data) => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(10).required().email(),
        password: Joi.string().min(6).required()
    }

    return Joi.validate(data, schema);
};

const LoginValidation = (data) => {
    const schema = {
        email: Joi.string().min(10).required().email(),
        password: Joi.string().min(6).required()
    }

    return Joi.validate(data, schema);
};



module.exports.registerValidation = registerationValidation;
module.exports.loginValidation = LoginValidation;


    

