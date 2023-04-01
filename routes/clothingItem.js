const router = require("express").Router(); // Import

const {
    createItem,
    getItems,
    deleteItems,
    likeItem,
    dislikeItem,
} = require("../controllers/clothingItem"); // Host
const auth = require("../middlewares/auth");

// Create
router.post("/", auth, createItem);
// Get --> no authorization needed
router.get("/", getItems);
// Delete = '/items/:itemId'
router.delete("/:itemId", auth, deleteItems);
// Like
router.put("/:itemId/likes", auth, likeItem);
// Dislike
router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
