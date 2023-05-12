const ClothingItem = require("../models/clothingItem");

const BadRequestError = require("../utils/errors/BadRequestError");
const ForbiddenError = require("../utils/errors/ForbiddenError");
const NotFoundError = require("../utils/errors/NotFoundError");

// Create card
const createItem = (req, res, next) => {
    const { name, weather, imageUrl } = req.body;
    const owner = req.user._id; // same as field in model
    const createAt = Date.now();

    ClothingItem.create({ name, weather, imageUrl, owner, createAt })
        .then((item) => {
            res.send({ data: item }); // display item
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
                next(new BadRequestError("Invalid data, Bad request"));
            }
            next(err);
        });
};
// Get
const getItems = (req, res, next) => {
    ClothingItem.find({})
        .then((items) => res.send(items))
        .catch((err) => {
            next(err);
        });
};

// Delete
const deleteItems = (req, res, next) => {
    const { itemId } = req.params;

    ClothingItem.findById(itemId)
        .then((item) => {
            // If ownerId and current user match...
            if (!item) {
                next(new NotFoundError("Item not found"));
            }
            if (item.owner.equals(req.user._id)) {
                item.deleteOne()
                    .then(() => res.send({ ClothingItem: item }))
                    .catch(() => {
                        // If item owner is not the requested user..
                        next(new ForbiddenError("Invalid user authorization"));
                    });
            }
        })
        .catch((err) => {
            if (err.name === "CastError") {
                next(new BadRequestError("Invalid item ID"));
            }
            next(err);
        });
};

// Like an item
const likeItem = (req, res, next) => {
    const { itemId } = req.params;

    ClothingItem.findByIdAndUpdate(
        itemId,
        { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
        { new: true }
    )
        .then((item) => {
            if (!item) {
                throw next(new NotFoundError("Card not found"));
            } else {
                res.send({ data: item });
            }
        })
        .catch((err) => {
            if (err.name === "CastError") {
                next(new BadRequestError("Bad request, invalid data ID"));
            }
            next(err);
        });
};
// Dislike an item
const dislikeItem = (req, res, next) => {
    const { itemId } = req.params;
    ClothingItem.findByIdAndUpdate(
        itemId,
        { $pull: { likes: req.user._id } }, // remove _id from the array
        { new: true }
    )
        .then((item) => {
            if (!item) {
                throw next(new NotFoundError("Card not found"));
            } else {
                res.send({ data: item });
            }
        })
        .catch((err) => {
            if (err.name === "CastError") {
                next(new BadRequestError("Bad request, invalid data ID"));
            }
            next(err);
        });
};

module.exports = { createItem, getItems, deleteItems, likeItem, dislikeItem };
