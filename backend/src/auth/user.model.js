const mongoose = require('mongoose')
const DB_URL = process.env.DB_URL
const DATABASE = process.env.DATABASE

const registerModel = {}

mongoose.connect(`${DB_URL}/${DATABASE}`, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error))

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roll_id: {
        type: Number,
        required: true,
    },
});
const userModel = mongoose.model('userRegister', userSchema, 'user_list');

registerModel.getUser = async (email) => {
    let data = await userModel.findOne({email});
    return data
}
registerModel.creatUser = async (name, email, password, roll_id) => {
    console.log(roll_id, "roll_id");
    
    let existUser = await userModel.findOne({email});
    if (existUser) {
        const userExist = {Message:`${email} already registerd`}
        return userExist
    }
    let data = await userModel.insertOne({name, email, password, roll_id});
    return data
}
module.exports = registerModel
