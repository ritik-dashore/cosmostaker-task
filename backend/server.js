const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config() 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const port = process.env.port || 3000

const userRouter = require('./src/auth/user.router')
const projectRouter = require('./src/projects/projects.router')

app.use('/Cosmostaker/api', userRouter)
app.use('/Cosmostaker/api/project', projectRouter)
app.listen(port, (err)=>{
    if (err) {
        console.log("Error", err);
    }else{
        console.log(`Server is ready on port http://localhost:${port}`);
    }
})
