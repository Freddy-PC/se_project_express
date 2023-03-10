const router = require("express").Router();

const { createUser, getUser, getUsers } = require("../controllers/user");

// Create
router.post("/", createUser);
// Return one
router.get("/:userId", getUser);

// Return all
router.get("/", getUsers);

module.exports = router;
