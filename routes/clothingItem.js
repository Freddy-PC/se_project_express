const router = require("express").Router(); // Import

const {
    createItem,
    getItems,
    deleteItems,
    likeItem,
    dislikeItem,
} = require("../controllers/clothingItem"); // Host
const auth = require("../middlewares/auth");
const {
    createItemValidation,
    idValidation,
} = require("../middlewares/validation");

// Create
router.post("/", auth, createItemValidation, createItem);
// Get --> no authorization needed
router.get("/", getItems);
// Delete = '/items/:itemId'
router.delete("/:itemId", auth, idValidation, deleteItems);
// Like
router.put("/:itemId/likes", auth, idValidation, likeItem);
// Dislike
router.delete("/:itemId/likes", auth, idValidation, dislikeItem);

module.exports = router;
