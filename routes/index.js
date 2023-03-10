const router = require("express").Router(); // For different endpoints
const clothingItem = require("./clothingItem"); // Calls from...
const user = require("./user");

router.use("/items", clothingItem); // API call to items from model and routes
router.use("/users", user);

router.use((req, res) => {
  // If no route is found
  res.status(500).send({ message: "Router not found" });
});

module.exports = router;
