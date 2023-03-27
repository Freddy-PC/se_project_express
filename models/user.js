const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "Elise Bouer",
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    avatar: {
        type: String,
        default:
            "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Elise.png",
        required: true,
        validate: {
            validator(v) {
                return validator.isURL(v);
            },
            message: "You must enter a valid URL",
        },
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator(v) {
                return validator.isURL(v);
            },
            message: "You must enter a valid email",
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator(v) {
                return validator.isURL(v);
            },
            message: "You must enter a valid password",
        },
    },
});

module.exports = mongoose.model("users", userSchema);
