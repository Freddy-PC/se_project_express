const ClothingItem = require("../models/clothingItem");

// Create/c
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id; // same as field in model
  const createAt = Date.now();

  ClothingItem.create({ name, weather, imageUrl, owner, createAt })
    .then((item) => {
      console.log(item);
      res.send({ data: item }); // display item
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from createItem", e });
    });
};
// Get/r
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "Error from getItems", e });
    });
};

// Delete/d
const deleteItems = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndRemove(itemId)
    .orFail()
    .then((item) => res.status(204).send({}))
    .catch((e) => {
      res.status(500).send({ message: "Error from deleteItems", e });
    });
};

module.exports = { createItem, getItems, deleteItems };
