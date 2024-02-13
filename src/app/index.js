const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("../routes/authentication/auth_route");
dotenv.config();

const app = express();
// app.set("view engine", "ejs");

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.send({ message: "All Good!" });
});

const dbConnection = require("../DB/db_connection");

// Use the database connection
dbConnection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
dbConnection.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
