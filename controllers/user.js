const User = require("../models/user");

// Create
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((item) => {
      console.log(item);
      res.send({ data: item }); // display item
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from createUser", e });
    });
};

// Return all users
const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((item) => res.status(200).send(item)) // Returns item
    .catch((e) => {
      res.status(500).send({ message: "Error from getUsers", e });
    });
};

// Return one user
const getUsers = (req, res) => {
  User.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "Error from getUser", e });
    });
};

module.exports = { createUser, getUser, getUsers };
