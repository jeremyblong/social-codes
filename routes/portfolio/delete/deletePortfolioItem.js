const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.put("/", (req, res) => {

        const { item, id } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {
                console.log(user);

                for (let index = 0; index < user.portfolioProjects.length; index++) {
                    const portfolio = user.portfolioProjects[index];
                    
                    if (portfolio.id === item.id) {

                        user.portfolioProjects.splice(index, 1);

                        collection.save(user);

                        res.json({
                            message: "Deleted!",
                            user
                        })
                    }
                }
            } else {
                res.json({
                    message: "User could NOT be found."
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);
        })
    });
});

module.exports = router;