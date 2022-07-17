const router = require('express').Router()
const validation = require('../../middlewear/validation')
const validators = require('./auth.validation')
const signUpController = require('./controller/registration')

//signup
router.get('/', signUpController.signUp)
router.post('/signup',validation(validators.signUp , '/') ,signUpController.handleSignUp) 

//login             
router.get('/login', signUpController.login)
router.post('/login',validation(validators.login , '/login') ,signUpController.handleSignIn) 


//logout
router.get('/logout', signUpController.logout)
module.exports = router