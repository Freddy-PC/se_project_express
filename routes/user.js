const router = require("express").Router();

const { getCurrentUser, updateUser } = require("../controllers/user");
const auth = require("../middlewares/auth");

// // Create
// router.post("/", createUser);
// // Return one
// router.get("/:userId", getUser);

// // Return all
// router.get("/", getUsers);

// Return user data
router.get("/me", auth, getCurrentUser);

// // Update user profile
router.get("/me", auth, updateUser);

module.exports = router;
