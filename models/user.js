const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs"); // hash

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
        unique: true, // NO duplicates
        validate: {
            validator(v) {
                return validator.isEmail(v);
            },
            message: "You must enter a valid email",
        },
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
});

const UnauthorizedError = require("../utils/errors/UnauthorizedError");

// authentification handler for user schema
userSchema.statics.findUserByCredentials = function findUserByCredentials(
    email,
    password
) {
    return this.findOne({ email })
        .select("+password")
        .then((user) => {
            // this = User model
            if (!user) {
                return Promise.reject(
                    new UnauthorizedError("Incorrect email or password")
                );
            }

            // found - comparing hashes + error handling
            return bcrypt.compare(password, user.password).then((matched) => {
                if (!matched) {
                    return Promise.reject(
                        new UnauthorizedError("Incorrect email or password")
                    );
                }

                return user;
            });
        });
};

module.exports = mongoose.model("users", userSchema);
