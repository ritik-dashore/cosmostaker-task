const registerModel = require('./user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userController = {}
const secretKey = process.env.SECRETKEY
const admin_id = process.env.ADMIN_ID
const admin_password = process.env.ADMIN_PASSWORD

userController.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const roll_id = 1
        const data = await registerModel.creatUser(name, email, hashedPassword, roll_id)
        res.send({ status: true, data })
    } catch (error) {
        console.log("Error", error);
        res.send({ status: false, message: "Something went wrong" })
    }
}

userController.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (admin_id == email && admin_password == password) {
            const token = genrateToken(email, password)
            const roll_id = 2
            res.send({ status: true, message: 'Admin succesfully loged in.', token, roll_id })
        }
        const getUSer = await registerModel.getUser(email)
        if (!getUSer) {
            res.send({ status: true, message: "User not exit, please register this user" })
        }
        const dataBasePassword = getUSer.password
        const isPasswordMatched = await bcrypt.compare(password, dataBasePassword)
        function genrateToken(email, password) {
            try {
                let token = jwt.sign({
                    username: email,
                    password: password
                }, secretKey, { expiresIn: '1h' });
                return token
            } catch (err) {
                console.log(err);
            }
        }
        if (isPasswordMatched) {
            const token = genrateToken(email, password)
            const roll_id = getUSer.roll_id
            res.send({ status: true, message: 'User succesfully loged in.', token, roll_id })
        } else {
            res.send({ status: true, message: "email && password are not matched." })
        }
    } catch (err) {
        console.log("Error", err);
        res.send({ status: false, message: "Something went wrong" })
    }
}

userController.getUser = async (req, res) => {
    try {
        let data = await registerModel.getUser()
        res.send({ status: true, data })
    } catch (error) {
        console.log("Error", error);
        res.send({ status: false, message: "Something went wrong" })
    }
}

module.exports = userController