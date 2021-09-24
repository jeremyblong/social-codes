const express = require("express");
const router = express.Router();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const _ = require("lodash");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, resppppppp) => {

        const { id } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {
                console.log(user);

                const date = new Date();

                if (_.has(user, "coupon")) {
                    resppppppp.json({
                        message: "You've already used a coupon - You're only allowed to use one coupon."
                    })
                } else {
                    const newCoupon = {
                        id: uuidv4(),
                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                        systemDate: Date.now(),
                        couponCodeUsed: "startup21",
                        start: new Date(),
                        end: new Date(date.setMonth(date.getMonth()+ 3)),
                        discount: 0.15
                    }
                    
                    user["coupon"] = newCoupon;

                    collection.save(user, (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(result);

                            resppppppp.json({
                                message: "Successfully applied coupon, You will now receive 100% of all proceeds earned...!"
                            })
                        }
                    });
                }
            } else {
                resppppppp.json({
                    message: "User could NOT be found."
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);
        })
    });
});

module.exports = router;