import joi from 'joi';

const loginSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
}).messages({
  'any.required': '"username" and "password" are required',
});

export default loginSchema;