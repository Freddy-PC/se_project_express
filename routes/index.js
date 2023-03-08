const router = require("express").Router(); // For different endpoints
const clothingItem = require("./clothingItem");

router.use("/items", clothingItem); // API call to items

router.use((req, res) => {
  res.status(500).send({ message: "Router not found" });
});

module.exports = router;
