const mongoose = require("mongoose");
 
const ForumSchema =  new mongoose.Schema({
    id: {
        type: String
    },
    description: {
        type: String
    },
    title: {
        type: String
    },
    snippets: {
        type: Array
    },
    tags: {
        type: Array
    },
    systemDate: {
        type: Number
    },
    date: {
        type: String
    },
    poster: {
        type: String
    },
    responses: {
        type: Array
    },
    reactions: {
        type: Object
    },
    views: {
        type: Number
    },
    likes: {
        type: Number
    },
    dislikes: {
        type: Number
    },
    emojiResponses: {
        type: Array
    },
    comments: {
        type: Array
    }
});

module.exports = Forum = mongoose.model("forum", ForumSchema);