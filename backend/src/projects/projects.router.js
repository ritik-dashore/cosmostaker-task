const express = require('express')
const router = express.Router()
const projectValidation = require('./projects.middleware')
const projectController = require('./projects.controller')
router.get('/get', projectController.getProject )
router.post('/create', projectValidation.create, projectController.createProject)
router.put('/update', projectValidation.update, projectController.updateProject)
router.put('/delete', projectValidation.update, projectController.updateProject)


module.exports = router