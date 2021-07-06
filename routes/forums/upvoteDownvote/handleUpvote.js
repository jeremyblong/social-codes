const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { posting, id } = req.body;

        const database = db.db("db");

        const collection = database.collection("forums");

        collection.findOne({ id: posting.id }).then((forum) => {
            if (forum) {
                console.log(forum);

                const filtered = forum.responses.filter((item) => {
                    if (item.id === id) {
                        return item;
                    }
                })
                
                const selected = filtered[0];

                if (forum.responses.includes(selected)) {
                    if (selected.response === "upvote") {
                        forum.likes -= 1;    
                    } else {
                        forum.dislikes -= 1;
                    }
                } else {
                    forum.likes += 1;
                }

                if (forum.responses.includes(selected)) {
                    const index = forum.responses.indexOf(selected);

                    forum.responses.splice(index, 1);
                } else {
                    forum.responses.push({
                        id,
                        response: "upvote"
                    });
                }

                

                collection.save(forum);

                res.json({
                    message: "Located and updated the desired forum!",
                    forum
                })
            } else {
                res.json({
                    message: "Forum post could NOT be found."
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);
        })
    });
});

module.exports = router;