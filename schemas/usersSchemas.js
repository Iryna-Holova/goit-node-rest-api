import Joi from "joi";
import constants from "../constants.js";

const registerSchema = Joi.object({
  password: Joi.string().min(constants.MIN_PASSWORD).required(),
  email: Joi.string().pattern(constants.EMAIL_REGEXP).required().messages({
    "string.pattern.base": "Invalid email",
  }),
  subscription: Joi.string().valid(...constants.SUBSCRIPTIONS),
});

const loginSchema = Joi.object({
  password: Joi.string().min(constants.MIN_PASSWORD).required(),
  email: Joi.string().pattern(constants.EMAIL_REGEXP).required().messages({
    "string.pattern.base": "Invalid email",
  }),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...constants.SUBSCRIPTIONS)
    .required(),
});

export default { registerSchema, loginSchema, updateSubscriptionSchema };
