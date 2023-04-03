const ClothingItem = require("../models/clothingItem");
const {
    handleErrorFail,
    handleError,
    handleForbiddenError,
} = require("../utils/errors");

// Create/c
const createItem = (req, res) => {
    const { name, weather, imageUrl } = req.body;
    const owner = req.user._id; // same as field in model
    const createAt = Date.now();

    ClothingItem.create({ name, weather, imageUrl, owner, createAt })
        .then((item) => {
            res.send({ data: item }); // display item
        })
        .catch((err) => {
            // console.log(err.message);
            // console.log(err.name);
            handleError(err, res);
        });
};
// Get/r
const getItems = (req, res) => {
    ClothingItem.find({})
        .then((items) => res.send(items))
        .catch((err) => {
            handleError(err, res);
        });
};

// Delete/d
const deleteItems = (req, res) => {
    const { itemId } = req.params;

    ClothingItem.findById(itemId)
        .orFail(() => {
            // ClothingItem will give object
            handleErrorFail();
        })
        .then((item) => {
            // If ownerId and current user match...
            // DeleteOne supported by Mongoose & return to handle errors
            if (item.owner.equals(req.user._id)) {
                item.deleteOne()
                    .then(() => res.send({ ClothingItem: item }))
                    .catch((err) => {
                        handleError(err, res);
                    });
            }
            // I thought the 403 error was already handled above by the
            // catch block??
            handleForbiddenError();
        })
        .catch((err) => {
            handleError(err, res);
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
        .orFail(() => {
            handleErrorFail();
        })
        .then((item) => res.send({ data: item }))
        .catch((err) => {
            handleError(err, res);
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
        .orFail(() => {
            handleErrorFail();
        })
        .then((item) => res.send({ data: item }))
        .catch((err) => {
            handleError(err, res);
        });
};

module.exports = { createItem, getItems, deleteItems, likeItem, dislikeItem };
