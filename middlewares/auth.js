const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).send({ message: "Authorization Required" });
    }

    // Verify token
    const token = authorization.replace("Bearer ", "");
    let payload;

    try {
        payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return res.status(401).send({ message: "Authorization Required" }); // unauhorized user tried to access
    }
    // Payload recieved

    req.user = payload; // assigning the payload to the request object

    next();
};
