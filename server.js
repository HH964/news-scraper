require("dotenv").config()
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const logger = require("morgan");
const user = process.env.user;
const pass = process.env.pass;

// mongodb://<dbuser>:<dbpassword>@ds311538.mlab.com:11538/heroku_60ncq8zl
const MONGODB_URI = process.env.URI || "mongodb://localhost/mongoheadlines";
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
    console.log("http://localhost:9000");
});