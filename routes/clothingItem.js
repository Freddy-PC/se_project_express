const router = require("express").Router(); // Import

const {
  createItem,
  getItems,
  deleteItems,
} = require("../controllers/clothingItem"); // Host

// Create
router.post("/", createItem);
// Get
router.get("/", getItems);
// Delete
router.delete("/:itemId", deleteItems);

module.exports = router;
