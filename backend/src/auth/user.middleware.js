const Joi = require('joi');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY
const validation = {}
validation.registration = (req, res, next) => {
  console.log("req.body", req.body);
  
  if (!req.body) {
    return res.send({ status: false, message: 'field body is missing.' });
  }
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(req.body)
  if (result.error) {
    console.log("result", result.error.message);
    res.send({ status: false, message: result.error.message })
  }
  next()
}

validation.login = (req, res, next) => {
  if (!req.body) {
    return res.send({ status: false, message: 'field body is missing.' });
  }
  const schema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(req.body)
  if (result.error) {
    console.log("result", result.error.message);
    res.send({ status: false, message: result.error.message })
  }
  next()
}

validation.tokenVerify = (req, res, next) => {
  // console.log("tokenVerify", req.headers['authorization']);
  
  const token = req.headers['authorization']?.split(' ')[1];
  // console.log("gettoken", token);
  
  if (!token) {
        return res.send({status:'false', message: 'Token is required' }); 
    }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.send({status:'false', message: 'Token is invalid' }); 
    }
    // console.log("decoded", decoded)

  });
  next()
}
module.exports = validation
