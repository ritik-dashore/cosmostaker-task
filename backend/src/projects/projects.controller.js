const projectModel = require('./projects.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const projectController = {}
const secretKey = process.env.SECRETKEY
const admin_id = process.env.ADMIN_ID
const admin_password = process.env.ADMIN_PASSWORD

projectController.createProject = async (req, res) => {
    try {
        const { project, assineName } = req.body        
        const data = await projectModel.projectCreate(project, assineName)
        res.send({ status: true, data })
    } catch (error) {
        console.log("Error", error);
        res.send({ status: false, message: "Something went wrong" })
    }
}

projectController.getProject = async (req, res) => {
    try {
        const data = await projectModel.getProject()
        res.send({ status: true, data })
    } catch (error) {
        console.log("Error", error);
        res.send({ status: false, message: "Something went wrong" })
    }
}

projectController.updateProject = async (req, res) => {
    try {
        const { id, project, assineName } = req.body
        const data = await projectModel.updateProject(id, project, assineName)
        res.send({ status: true, data })
    } catch (error) {
        console.log("Error", error);
        res.send({ status: false, message: "Something went wrong" })
    }
}

projectController.deleteProject = async (req, res) => {
    try {
        const { id, project, assineName } = req.body
        const data = await projectModel.deleteProject(id)
        res.send({ status: true, data })
    } catch (error) {
        console.log("Error", error);
        res.send({ status: false, message: "Something went wrong" })
    }
}

module.exports = projectController