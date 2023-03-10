const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
// Add options if mongoose is version 5 or error

// Connect Routes
const routes = require("./routes");

app.use(express.json());
app.use((req, res, next) => {
  // user object added to each request
  req.user = {
    _id: "640b8ee18ce59b8d84d581f0",
  };
  next();
});
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
