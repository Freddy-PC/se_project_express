require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Connect front & back end
const helmet = require("helmet");
const { errors } = require("celebrate");

const { login, createUser } = require("./controllers/user");
const ErrorHandler = require("./middlewares/ErrorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const {
    createUserValidation,
    loginValidation,
} = require("./middlewares/validation");
const { limiter } = require("./middlewares/limiter");

const { PORT = 3001 } = process.env;
const app = express();
app.use(helmet());
app.use(limiter);

app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

// Connect Routes
const routes = require("./routes");

app.use(express.json());
app.use(requestLogger);
app.post("/signin", loginValidation, login);
app.post("/signup", createUserValidation, createUser);

// Why remove this code after passing the review???
app.get("/crash-test", () => {
    setTimeout(() => {
        throw new Error("Server will crash now");
    }, 0);
});

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(ErrorHandler);

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
