const router = require("express").Router(); // For different endpoints

const clothingItem = require("./clothingItem"); // Calls from...
const user = require("./user");
const auth = require("../middlewares/auth");
const { NotFoundError } = require("../utils/errors/NotFoundError");

router.use("/items", clothingItem); // API call to items from model and routes
router.use("/users", user);

router.use(auth, (req, res, next) => {
    // If no route is found (404)
    next(new NotFoundError("Route not found"));
});

module.exports = router;
