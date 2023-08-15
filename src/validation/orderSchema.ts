import joi from 'joi';

const orderSchema = joi.object({
  userId: joi.number().strict().required(),
  productIds: joi.array().items(joi.number().strict().required().messages({
    'number.base': '422|{#label} must include only numbers',
  })).required(),
}).messages({
  'any.required': '400|{#label} is required',
  'number.base': '422|{#label} must be a number',
  'array.base': '422|{#label} must be an array',
  'array.includesRequiredUnknowns': '422|{#label} must include only numbers',
});

export default orderSchema;