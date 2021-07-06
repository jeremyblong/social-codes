const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, resp) => {

        const { forumID } = req.query;

        const database = db.db("db");

        const collection = database.collection("forums");

        collection.findOne({ id: forumID }).then((forummm) => {
            if (forummm) {

                const promises = [];

                for (let index = 0; index < forummm.comments.length; index++) {
                    const comment = forummm.comments[index];
                    
                    promises.push(new Promise((resolve, reject) => {
                        axios.get(`${config.get("ngrok_url")}/gather/more/basic/info`, {
                            params: {
                                userID: comment.posterID
                            }
                        }).then((res) => {
                            if (res.data.message === "Located the desired user!") {
                                console.log(res.data);
        
                                const { user } = res.data;
        
                                comment.profilePics = user.profilePics;
                                comment.firstName = user.firstName;
                                comment.lastName = user.lastName;
                                comment.accountType = user.accountType;
                                comment.username = user.username;
                                comment.birthdate = user.birthdate;
        
                                resolve(comment);
                            } else {
                                console.log("err", res.data);
        
                                reject(null);
                            }
                        }).catch((err) => {
                            console.log(err);
        
                            reject(null);
                        })
                    }))
                }

                Promise.all(promises).then((passedValues) => {
                    resp.json({
                        message: "Succesfully gathered updated comments!",
                        comments: passedValues
                    })
                })
            } else {
                resp.json({
                    message: "Forum post could NOT be found."
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);
        })
    });
});

module.exports = router;