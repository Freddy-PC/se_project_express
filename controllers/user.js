const bcrypt = require("bcryptjs"); // hash
const jwt = require("jsonwebtoken"); // token
require("dotenv").config();

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require("../models/user");

const BadRequestError = require("../utils/errors/BadRequestError");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");
const NotFoundError = require("../utils/errors/NotFoundError");
const ConflictError = require("../utils/errors/ConflictError");

// Create
const createUser = (req, res, next) => {
    const { name, avatar, email, password } = req.body;
    // Hash passwords via bycrpt
    return bcrypt
        .hash(password, 10)
        .then((hash) => {
            User.create({ name, avatar, email, password: hash })
                .then((item) => {
                    res.send({
                        name: item.name,
                        avatar: item.avatar,
                        email: item.email,
                    });
                })
                .catch((err) => {
                    // Check for duplicate email (409)
                    // A duplicate acccount with same email can still be made???
                    if (err.code === 11000) {
                        next(
                            new ConflictError("User with email already exists")
                        );
                    }
                    // Incorrect data
                    if (err.name === "ValidationError") {
                        next(new BadRequestError("Bad request, invalid data"));
                    }
                    next(err);
                });
        })
        .catch((err) => {
            next(err);
        });
};

// Return one user
const getCurrentUser = (req, res, next) => {
    // If accessible after authorization (auth)
    User.findById(req.user._id)
        .then((user) => {
            if (!user) {
                next(new NotFoundError("User not found"));
            } else {
                res.send(user); // Returns if item exists
            }
        })
        .catch((err) => {
            // Can't create an ObjectID from your request body
            if (err.name === "CastError") {
                next(new BadRequestError("Bad request, invalid data ID"));
            }
            next(err);
        });
};

// Get & authenticate 2 fields
const login = (req, res, next) => {
    // Get email & password from request body
    const { email, password } = req.body;

    // If req.body correct, create JSON web token:
    // Called on authentif. handler from schema
    User.findUserByCredentials(email, password)
        .then((user) => {
            res.send({
                token: jwt.sign(
                    { _id: user._id },
                    NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
                    {
                        expiresIn: "7d",
                    }
                ),
            });
        })
        .catch(() => {
            next(new UnauthorizedError("Incorrect email or password"));
        });
};

// Update profie
const updateUser = (req, res, next) => {
    const { name, avatar } = req.body;
    // Id is availabe after auth.
    User.findByIdAndUpdate(
        req.user._id,
        { name, avatar },
        { new: true, runValidators: true }
    )
        .then((user) => res.send({ data: user }))
        .catch((err) => {
            if (err.name === "ValidationError") {
                next(new BadRequestError("Bad request, invalid data"));
            }
            next(err);
        });
};

module.exports = { createUser, getCurrentUser, login, updateUser };
