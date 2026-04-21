import { validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation failed",
            errors: errors.array().map((item) => ({
                field: item.path,
                message: item.msg,
            })),
        });
    }

    next();
};

export default validateRequest;
