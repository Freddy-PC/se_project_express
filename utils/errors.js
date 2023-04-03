// Set error codes
const ERROR_CODES = {
    BadRequest: 400, // data or ID invalid
    Unauthorized: 401, // lacks authentification
    ForbiddenAccess: 403, // User is not owner
    NotFound: 404, // no user or item with ID or non-existent address
    DuplicateConflict: 409, // a MongoDB duplicate error
    DefaultError: 500, // server error prevents request
};

// For orfail() / if nothing found (404)
const handleErrorFail = () => {
    const error = new Error("Item ID not found");
    error.statusCode = 404;
    throw error; // so catch handles error & return error
};

// Refuse to authorize request (403)
const handleForbiddenError = () => {
    const error = new Error("Invalid user authorization");
    error.status = 403;
    throw error;
};

// For other errors
const handleError = (err, res) => {
    // 400
    if (err.name === "ValidationError" || err.name === "CastError") {
        res.status(ERROR_CODES.BadRequest).send({
            message: "Bad request, invalid data",
        });
        return;
    }
    // 401
    if (err.message === "Incorrect email or password") {
        res.status(ERROR_CODES.Unauthorized).send({
            message: "Email or password is incorrect",
        });
        return;
    }
    // 403 Refuse to authorize request
    if (err.status === 403) {
        res.status(ERROR_CODES.ForbiddenAccess).send({
            message: "Invalid user authorization",
        });
        return;
    }
    // 409
    if (err.code === 11000) {
        res.status(ERROR_CODES.DuplicateConflict).send({
            message: "User with email already exists",
        });
    }
    // 404 & 500
    if (err.statusCode === 404) {
        res.status(ERROR_CODES.NotFound).send({ message: "Data not found" });
    } else {
        res.status(ERROR_CODES.DefaultError).send({
            message: "An error occurred with the server",
        });
    }
};

module.exports = {
    ERROR_CODES,
    handleErrorFail,
    handleError,
    handleForbiddenError,
};
