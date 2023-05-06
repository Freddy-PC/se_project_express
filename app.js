require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Connect front & back end
const { login, createUser } = require("./controllers/user");
const ErrorHandler = require("./middlewares/ErrorHandler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

// Connect Routes
const routes = require("./routes");

app.use(express.json());
app.post("/signin", login);
app.post("/signup", createUser);

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(ErrorHandler);

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
