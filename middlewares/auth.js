const jwt = require("jsonwebtoken");
require("dotenv").config();

const { NODE_ENV, JWT_SECRET } = process.env;

const { UnauthorizedError } = require("../utils/errors/UnauthorizedError");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return next(new UnauthorizedError("Authorization header required"));
    }

    // Verify token
    const token = authorization.replace("Bearer ", "");
    let payload;

    try {
        payload = jwt.verify(
            token,
            NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
        );
    } catch (err) {
        return next(new UnauthorizedError("Authorization required"));
    }
    // Payload recieved

    req.user = payload; // assigning the payload to the request object

    return next();
};
