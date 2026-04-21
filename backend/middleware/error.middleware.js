const notFound = (req, res, next) => {
    res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode >= 400 ? res.statusCode : 500;

    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
        statusCode = 401;
    } else if (err.name === "ValidationError" || err.name === "CastError") {
        statusCode = 400;
    } else if (err.code === 11000) {
        statusCode = 409;
    }

    res.status(statusCode).json({
        message: err.message || "Internal server error",
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
};

export { notFound, errorHandler };
