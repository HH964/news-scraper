const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    desciption:{
        type: String,
        unique: true
    },
    comment:{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    link:{
        type: String,
        required: true
    },
    savedArticles:{
        type: Boolean,
        default: false
    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;



