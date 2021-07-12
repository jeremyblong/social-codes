const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const stripe = require('stripe')(config.get("stripeSecretKey"));


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { 
            rate,
            id,
            date,
            jobID,
            otherUserID 
        } = req.body;

        console.log(req.body);

        const database = db.db("db");

        const collection = database.collection("users");

        collection.find({ unique_id: { $in: [ otherUserID, id ]}}).toArray((err, users) => {
            if (err) {
                console.log(err);

                res.json({
                    message: "An error occurred while fetching users to update",
                    err
                })
            } else {

                const promise = new Promise(async (resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // signed in user
                        if (user.unique_id === id) {
                            for (let iiiii = 0; iiiii < user.cardPaymentMethods.length; iiiii++) {
                                const card = user.cardPaymentMethods[iiiii];
                                
                                if (card.primary === true) {
                                    const charge = await stripe.charges.create({
                                        amount: Number(Math.round(rate * 100)),
                                        currency: 'usd',
                                        customer: user.stripeCustomerAccount.id,
                                        description: 'Complete payment for project completion.',
                                    }).then((payment) => {
                                        console.log(payment);
        
                                        user.paymentHistory.push(payment);
        
                                        for (let index = 0; index < user.activeHiredApplicants.length; index++) {
                                            const applicant = user.activeHiredApplicants[index];
                                            
                                            if (applicant.jobID === jobID) {
        
                                                applicant.paidFull = true;
        
                                                const paymentNew = {
                                                    ...payment,
                                                    payer: user.firstName + user.lastName,
                                                    payerID: user.unique_id
                                                }
        
                                                applicant.payments.push(paymentNew);
        
                                                console.log("resolve ran...");
        
                                                collection.save(user);

                                                const passedData = {
                                                    user,
                                                    payment
                                                }
        
                                                resolve(passedData);
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    }
                })

                promise.then((passedData) => {
                    console.log("RSLVED.")
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // other user
                        if (user.unique_id === otherUserID) {
                            console.log("MATCH!")
                            
                            for (let index = 0; index < user.activeHiredApplicants.length; index++) {
                                const applicant = user.activeHiredApplicants[index];
                                
                                if (applicant.jobID === jobID) {
                                    applicant.paidFull = true;

                                    const paymentNew = {
                                        ...passedData.payment,
                                        payer: passedData.user.firstName + passedData.user.lastName,
                                        payerID: passedData.user.unique_id
                                    }
                                    applicant.payments.push(paymentNew);

                                    console.log("pushed new payment in second half...")

                                    collection.save(user);

                                    res.json({
                                        message: "Made COMPLETE payment!"
                                    })
                                }
                            }
                        }
                    }
                })
            }
        })
    });
});

module.exports = router;