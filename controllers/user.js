const bcrypt = require("bcryptjs"); // hash
const jwt = require("jsonwebtoken"); // token

const User = require("../models/user");
const { handleErrorFail, handleError } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

// Create
const createUser = (req, res) => {
    const { name, avatar, email, password } = req.body;
    // Check for duplicate email and throw error
    // Hash passwords via bycrpt
    // find email envelops all
    return bcrypt.hash(password, 10).then((hash) => {
        User.create({ name, avatar, email, password: hash })
            .then((item) => {
                res.send({ data: item }); // display item
            })
            .catch((err) => {
                handleError(err, res);
            });
    });
};

// Return one user
const getCurrentUser = (req, res) => {
    const { userId } = req.params;

    User.findById(userId)
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
                token: jwt.sign({ _id: user._id }, JWT_SECRET, {
                    expiresIn: "7d",
                }),
            });
        })
        .catch((err) => {
            handleError(err, res); // 401 if incorrect email or password?
        });
};

// Update profie
const updateUser = (req, res) => {
    const { name, avatar, userId } = req.body;

    User.findByIdAndUpdate(
        { userId },
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
