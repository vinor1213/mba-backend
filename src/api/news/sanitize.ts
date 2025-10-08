import Joi from 'joi';
export const schema = Joi.object({
  title: Joi.string().required(),
  excerpt: Joi.string().allow('', null),
  content: Joi.string().required(),
  date: Joi.date().required(),
  category: Joi.string().allow('', null)
});
