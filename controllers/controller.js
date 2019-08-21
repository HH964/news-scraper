
const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

const db = require("../models/index");

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/scrape", (req, res) => {
    axios.get("http://www.echojs.com/").then(function (response) {
        var $ = cheerio.load(response.data);
        var result = [];
        $("article").each(function (i, element) {
           
            var scrapedData = {}
            scrapedData.title = $(element)
                .find("h2")
                .text();

            scrapedData.link = $(element)
                .find("h2")
                .find("a")
                .attr("href");
            result.push(scrapedData);
            db.Article.create(scrapedData)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
            
        });
        
        
        
        res.json(result);
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
