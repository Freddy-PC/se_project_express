const bcrypt = require("bcryptjs"); // hash
const jwt = require("jsonwebtoken"); // token
require("dotenv").config();
const { NODE_ENV, JWT_SECRET } = process.env;

const User = require("../models/user");
const { handleErrorFail, handleError } = require("../utils/errors");

// Create
const createUser = (req, res) => {
    const { name, avatar, email, password } = req.body;
    // Check for duplicate email (409)
    // Hash passwords via bycrpt
    return bcrypt
        .hash(password, 10)
        .then((hash) => {
            User.create({ name, avatar, email, password: hash })
                .then((item) => {
                    res.send({
                        // Only displays these 'items' of item
                        name: item.name,
                        avatar: item.avatar,
                        email: item.email,
                        _id: item._id,
                    });
                })
                .catch((err) => {
                    handleError(err, res);
                });
        })
        .catch((err) => {
            handleError(err, res);
        });
};

// Return one user
const getCurrentUser = (req, res) => {
    // If accessible after authorization (auth)
    User.findById(req.user._id)
        .then((item) => {
            if (!item) {
                // Send the 404 error if no item
                handleErrorFail();
            } else {
                res.send(item); // Returns if item exists
            }
        })
        .catch((err) => {
            handleError(err, res);
        });
};

// Get & authenticate 2 fields
const login = (req, res) => {
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
        .catch((err) => {
            handleError(err, res); // 401 if incorrect email or password?
        });
};

// Update profie
const updateUser = (req, res) => {
    const { name, avatar } = req.body;

    // Id is availabe after auth.
    User.findByIdAndUpdate(
        req.user._id,
        { name, avatar },
        { new: true, runValidators: true }
    )
        .then((user) => res.send({ data: user }))
        .catch((err) => {
            handleError(err, res);
        });
};

// // Return all
// const getUsers = (req, res) => {
//     User.find({})
//         .then((items) => res.send(items))
//         .catch((err) => {
//             handleError(err, res);
//         });
// };

module.exports = { createUser, getCurrentUser, login, updateUser };
