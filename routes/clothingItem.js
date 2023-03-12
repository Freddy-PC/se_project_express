const router = require("express").Router(); // Import

const {
  createItem,
  getItems,
  deleteItems,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem"); // Host

// Create
router.post("/", createItem);
// Get
router.get("/", getItems);
// Delete = '/items/:itemId'
router.delete("/:itemId", deleteItems);

// Like
router.put("/:itemId/likes", likeItem);
// Dislike
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
