// Set error codes
const ERROR_CODES = {
    BadRequest: 400, // data or ID invalid
    NotFound: 404, // no user or item with ID or non-existent address
    DefaultError: 500,
};

// For orfail() / if nothing found (404)
const handleErrorFail = (err, req) => {
    const error = new Error("Item ID not found");
    error.statusCode = 404;
    throw error; // so catch handles error & return error
};

// For other errors (400, 500)
const handleError = (err, req) => {
    if (err.statusCode === 404) {
        res.status(ERROR_CODES.NotFound).send({ message: "Data not found" });
    } else {
        res.status(ERROR_CODES.DefaultError).send({
            message: "An error occurred with the server",
        });
    }
};

module.exports = { ERROR_CODES, handleErrorFail, handleError };
