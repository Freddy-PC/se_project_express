const router = require("express").Router(); //Import

const { createItem } = require("../controllers/clothingItem"); // Host
// CRUD

// Create
router.post("/", createItem);

module.exports = router;
