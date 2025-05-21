const Joi = require('joi');
const validation = {}
validation.registration = (req, res, next) => {
  if (!req.body) {
    return res.send({ status: false, message: 'field body is missing.' });
  }
  const schema = Joi.object().keys({
    email: Joi.string().required(),
    name: Joi.string().required(),
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
  console.log("req.body", req.body);
  
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
module.exports = validation
