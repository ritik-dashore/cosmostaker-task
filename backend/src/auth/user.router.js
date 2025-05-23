const express = require('express')
const router = express.Router()
const userValidation = require('./user.middleware')
const userController = require('./user.controller')
router.get('/getuser', userValidation.tokenVerify, userController.getUser)
router.post('/registration', userValidation.registration, userController.createUser)
router.post('/login', userValidation.login, userController.loginUser)


module.exports = router