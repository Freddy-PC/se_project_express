const ErrorHandler = (err, res, req, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Error occurred with the server";
    res.status(statusCode).send({ message }); // return a error message
};

module.exports = ErrorHandler;

// class error handlers cover: 400, 401, 403, 404 & 409
// if none, then 500 from other
