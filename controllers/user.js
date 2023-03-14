const User = require("../models/user");
const { handleErrorFail, handleError } = require("../utils/errors");

// Create
const createUser = (req, res) => {
    const { name, avatar } = req.body;

    User.create({ name, avatar })
        .then((item) => {
            res.send({ data: item }); // display item
        })
        .catch((err) => {
            handleError(err, res);
        });
};

// Return all users
const getUser = (req, res) => {
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

// Return one user
const getUsers = (req, res) => {
    User.find({})
        .then((items) => res.send(items))
        .catch((err) => {
            handleError(err, res);
        });
};

module.exports = { createUser, getUser, getUsers };
