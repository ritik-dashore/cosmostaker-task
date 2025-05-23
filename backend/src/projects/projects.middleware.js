const Joi = require('joi');
const proValidation = {}
proValidation.create = (req, res, next) => {
  if (!req.body) {
    return res.send({ status: false, message: 'Project field is missing.' });
  }
  const schema = Joi.object().keys({
    projectsName : Joi.string().required(),
    assignName: Joi.string().required(),
    // email: Joi.string().required(),
    // password: Joi.string().required(),
  });
  const result = schema.validate(req.body)
  if (result.error) {
    console.log("result", result.error.message);
    res.send({ status: false, message: result.error.message })
  }
  next()
}

proValidation.update = (req, res, next) => {
  if (!req.body) {
    return res.send({ status: false, message: 'field body is missing.' });
  }
  const schema = Joi.object().keys({
    projectsName: Joi.string().required(),
    assignName: Joi.string().required(),
    id: Joi.string().required(),
    // password: Joi.string().required(),
  });
  const result = schema.validate(req.body)
  if (result.error) {
    console.log("result", result.error.message);
    res.send({ status: false, message: result.error.message })
  }
  next()
}

proValidation.delete = (req, res, next) => {
  console.log("req.body", req.body);
  
    if (!req.body) {
    return res.send({ status: false, message: 'field body is missing.' });
  }
  const schema = Joi.object().keys({
    id: Joi.string().required(),
  });
  const result = schema.validate(req.body)
  if (result.error) {
    console.log("result", result.error.message);
    res.send({ status: false, message: result.error.message })
  }
  next()
}

proValidation.login = (req, res, next) => {
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
module.exports = proValidation
