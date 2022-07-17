const joi = require('joi')

const signUp = {
    body : joi.object().required().keys({
        userName : joi.string().required(),
        email : joi.string().email().required(),
        password  : joi.string().required().pattern(new  RegExp (/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)),
        cPassword : joi.string().valid(joi.ref('password')).required()
    })
}

const login = {
    body : joi.object().required().keys({
        email : joi.string().email().required(),
        password  : joi.string().required().pattern(new  RegExp (/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)),
    })
}

module.exports ={
    signUp,
    login

}
