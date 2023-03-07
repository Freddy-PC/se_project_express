const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author", // linked to author's model identifer
    required: true,
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // linked to user's model identifer
  },
  createAt: {
    type: Date,
    default: Date.now,
  }, // item creation date
});

module.exports = mongoose.model("items", clothingItemSchema);
