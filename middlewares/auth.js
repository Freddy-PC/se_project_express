const jwt = require("jsonwebtoken");
require("dotenv").config();
const { NODE_ENV, JWT_SECRET } = process.env;

const { ERROR_CODES } = require("../utils/errors");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res
            .status(ERROR_CODES.Unauthorized)
            .send({ message: "Authorization header Required" });
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
        return res
            .status(ERROR_CODES.Unauthorized)
            .send({ message: "Authorization # Required" }); // unauhorized user tried to access
    }
    // Payload recieved

    req.user = payload; // assigning the payload to the request object

    next();
};
