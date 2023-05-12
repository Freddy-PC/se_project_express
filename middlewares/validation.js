const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// Valid links via 'validator.isURL(value)'
const validateURL = (value, helpers) => {
    if (validator.isURL(value)) {
        return value;
    }
    return helpers.error("string.uri");
};

/* Validate:
   ClothingItem body when item created */
const createItemValidation = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30).messages({
            "string.min": 'The minimum length of the "name" field is 2',
            "string.max": 'The maximum length of the "name" field is 30',
            "string.empty": 'The "name" field must be filled in',
        }),

        imageUrl: Joi.string().required().custom(validateURL).messages({
            "string.empty": 'The "imageUrl" field must be filled in',
            "string.uri": 'the "imageUrl" field must be a valid url',
        }),
        weather: Joi.string().valid("hot", "warm", "cold"),
    }),
});

// Info body when user created
const createUserValidation = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30).messages({
            "string.min": 'The minimum length of the "name" field is 2',
            "string.max": 'The maximum length of the "name" field is 30',
            "string.empty": 'The "name" field must be filled in',
        }),

        avatar: Joi.string().required().custom(validateURL).messages({
            "string.empty": 'The "imageUrl" field must be filled in',
            "string.uri": 'The "imageUrl" field must be a valid url',
        }),
        email: Joi.string().required().email().messages({
            "string.empty": 'The "email" field must be filled in',
            "string.email": 'The "email" field must be a valid email',
        }),
        password: Joi.string().required().messages({
            "string.empty": 'The "password" field must be filled in',
        }),
    }),
});

// Auth when user logs in
const loginValidation = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().messages({
            "string.empty": 'The "email" field must be filled in',
            "string.email": 'The "email" field must be a valid email',
        }),
        password: Joi.string().required().messages({
            "string.empty": 'The "password" field must be filled in',
        }),
    }),
});

// User & ClothingITem ID's when accessed
const idValidation = celebrate({
    params: Joi.object().keys({
        itemId: Joi.string().hex().length(24).required(),
    }),
});

module.exports = {
    createItemValidation,
    createUserValidation,
    loginValidation,
    idValidation,
};
