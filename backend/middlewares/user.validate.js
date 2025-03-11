const userValidate = require("../utils/user.joi");

const validate = (req, res, next) => {
    const { error } = userValidate.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.details.map(err => err.message)
        });
    }
    
    next(); 
};

module.exports = validate;
