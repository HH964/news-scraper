
const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

const db = require("../models/index");

router.get("/", (req,res) => {
    res.render("index");
});

router.get("/scrape", (req, res) => {
    axios.get("http://www.echojs.com/").then(function (response) {
        var $ = cheerio.load(response.data);

        $("article h2").each(function (i, element) {
            var result = {};

            result.title = $(this)
                .children("a")
                .text();

            result.link = $(this) 
                .children("a")
                .attr("href");

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });
        res.send("Scrape Complete");
    });
});

router.get("/articles", function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })

        .catch(function (err) {
            res.json(err);
        });
});

router.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("article")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })

        .catch(function (err) {
            res.json(err);
        });
});

router.post("/articles/:id", function (req, res) {
    db.Article.create(req.body)
        .then(function (dbArticle) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { article: dbArticle._id }, { new: true });
        })

        .then(function (dbArticle) {
            res.json(dbArticle);
        })

        .catch(function (err) {
            res.json(err);
        });
});

module.exports = router;
