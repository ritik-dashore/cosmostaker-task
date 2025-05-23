const mongoose = require('mongoose')
const DB_URL = process.env.DB_URL
const DATABASE = process.env.DATABASE
const projectCollection = process.env.PROJECT_COLLECTION
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
    assignName: {
        type: String,
        required: true,
    },
    is_deleted:{
        type: Number,
        required: true,
    }
});
const projectsModel = mongoose.model('projects', userSchema, projectCollection);

const objId = (id)=>{
    return new mongoose.Types.ObjectId(id)
}
projectModel.getProject = async () => {
    let data = await projectsModel.find({is_deleted:{$eq:0}});
    return data
}
projectModel.projectCreate = async (project, assignName) => {
    
    const existUser = await projectsModel.findOne({project});
    if (existUser) {
        const userExist = {status:false, message:`${project} already registerd`}
        return userExist
    }
    const data = await projectsModel.insertOne({project, assignName, is_deleted:0});
    return data
}
projectModel.updateProject = async (id, project, assignName) => {    
    const data = await projectsModel.updateOne({_id: new mongoose.Types.ObjectId(id)},{ $set: { project, assignName } });
    return data
}

projectModel.deleteProject = async (id) => {    
    const data = await projectsModel.updateOne({_id: new mongoose.Types.ObjectId(id)},{ $set: { is_deleted:1 } });
    console.log("deleteProject", data);
    
    return data
}
module.exports = projectModel
