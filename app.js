require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Connect front & back end
const { login, createUser } = require("./controllers/user");
const errorHandler = require("./middlewares/ErrorHandler");

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

// Connect Routes
const routes = require("./routes");

app.use(express.json());
app.post("/signin", login);
app.post("/signup", createUser);

app.use(routes);

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
