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

// Like an item
const likeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then(() => res.status(204).send({}))
    .catch((e) => {
      res.status(500).send({ message: "Error from likeItem", e });
    });
};
// Dislike an item
const dislikeItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail()
    .then(() => res.status(204).send({}))
    .catch((e) => {
      res.status(500).send({ message: "Error from likeItem", e });
    });
};

module.exports = { createItem, getItems, deleteItems, likeItem, dislikeItem };
