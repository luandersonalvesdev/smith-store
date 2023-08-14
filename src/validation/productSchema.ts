import joi from 'joi';

const productSchema = joi.object({
  name: joi.string().required().min(3),
  price: joi.string().required().min(3),
  orderId: joi.number().required(),
}).messages({
  'any.required': '400|{#label} is required',
  'string.min': '422|{#label} length must be at least 3 characters long',
  'string.base': '422|{#label} must be a string',
});

export default productSchema;