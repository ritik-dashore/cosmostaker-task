const mongoose = require('mongoose')
const DB_URL = process.env.DB_URL
const DATABASE = process.env.DATABASE

const projectModel = {}

mongoose.connect(`${DB_URL}/${DATABASE}`, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error))

const userSchema = new mongoose.Schema({
    project: {
        type: String,
        required: true,
    },
    assineName: {
        type: String,
        required: true,
    }
});
const projectsModel = mongoose.model('projects', userSchema, 'projects');

const objId = (id)=>{
    return new mongoose.Types.ObjectId(id)
}
projectModel.getProject = async () => {
    let data = await projectsModel.find();
    return data
}
projectModel.projectCreate = async (project, assineName) => {
    
    let existUser = await projectsModel.findOne({project});
    if (existUser) {
        const userExist = {Message:`${project} already registerd`}
        return userExist
    }
    let data = await projectsModel.insertOne({project, assineName, is_deleted:0});
    return data
}
projectModel.updateProject = async (id, project, assineName) => {    
    const data = await projectsModel.updateOne({_id: new mongoose.Types.ObjectId(id)},{ $set: { project, assineName } });
    return data
}

projectModel.deleteProject = async (id) => {    
    const data = await projectsModel.updateOne({_id: new mongoose.Types.ObjectId(id)},{ $set: { is_deleted:1 } });
    return data
}
module.exports = projectModel
