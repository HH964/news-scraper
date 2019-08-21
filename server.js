require("dotenv").config()
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const logger = require("morgan");


const MONGODB_URI = process.env.URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

const app = express();

app.use(express.static("public"));

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

const routes = require("./controllers/controller");
app.use(routes)

app.listen(9000, function () {
    console.log("http://localport:9000");
});