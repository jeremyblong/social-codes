const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const stripe = require('stripe')(config.get("stripeSecretKey"));
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, resppppppppp) => {

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

                resppppppppp.json({
                    message: "An error occurred while fetching users to update",
                    err
                })
            } else {
                let otherUserData = null;

                for (let index = 0; index < users.length; index++) {
                    const element = users[index];
                    if (element.unique_id === otherUserID) {
                        otherUserData = element;
                    }
                }
                const promise = new Promise(async (resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // signed in user
                        if (user.unique_id === id) {
                            for (let iiiii = 0; iiiii < user.cardPaymentMethods.length; iiiii++) {
                                const card = user.cardPaymentMethods[iiiii];
                                
                                if (card.primary === true) {
                                    const paymentIntent = await stripe.paymentIntents.create({
                                        amount: Number(Math.round(Number(rate) * 100)),
                                        currency: 'usd',
                                        payment_method_types: ['card'],
                                        customer: user.stripeCustomerAccount.id,
                                        description: 'Pre-Complete payment for project completion.',
                                        application_fee_amount: Math.round(Number(Math.round(Number(rate) * 100) * 0.20)),
                                        on_behalf_of: otherUserData.stripeConnectAccount.id,
                                        capture_method: 'manual',
                                        confirm: true,
                                        transfer_data: {
                                            destination: otherUserData.stripeConnectAccount.id
                                        }
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


                                    const configgg = {
                                        headers: {
                                            "Authorization": `key=${config.get("firebaseCloudMessagingServerKey")}`,
                                            "Content-Type": "application/json"
                                        }
                                    }
                    
                                    const notification_addition = {
                                        id: uuidv4(),
                                        system_date: Date.now(),
                                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        data: {
                                            title: `${passedData.user.firstName} ${passedData.user.lastName} has made a payment to your account!`,
                                            body: `${passedData.user.firstName} ${passedData.user.lastName} paid you a pre-payment of ${Math.round(Number(Math.round(Number(rate)) * 0.80)).toFixed(2)} to be paid upon project completion!`
                                        },
                                        from: passedData.user.unique_id,
                                        link: "notifications"
                                    };
                    
                                    axios.post("https://fcm.googleapis.com/fcm/send", {
                                        "to": user.firebasePushNotificationToken,
                                        "notification": {
                                            "title": `${passedData.user.firstName} ${passedData.user.lastName} has made a payment to your account!`,
                                            "body": `${passedData.user.firstName} ${passedData.user.lastName} paid you a pre-payment of $${Math.round(Number(Math.round(Number(rate)) * 0.80)).toFixed(2)} to be paid upon project completion!`,
                                            "mutable_content": true,
                                            "sound": "Tri-tone"
                                        },
                                        "data": {
                                            // use company logo 
                                            "url": `${config.get("logoImage")}`,
                                            "dl": "notifications"
                                            // use company logo ^^^^^^^^^^^^^^^^^^^^^^^^^
                                        }
                                    }, configgg).then((res) => {
            
                                        console.log("RES", res.data);
                    
                                        if (user.notifications) {
                                            user.notifications.push(notification_addition);
                                        } else {
                                            user["notifications"] = [notification_addition];
                                        }
                                        
                                        applicant.paidFull = true;

                                        const paymentNew = {
                                            ...passedData.payment,
                                            payer: passedData.user.firstName + passedData.user.lastName,
                                            payerID: passedData.user.unique_id
                                        }
                                        applicant.payments.push(paymentNew);

                                        console.log("pushed new payment in second half...")

                                        collection.save(user);

                                        resppppppppp.json({
                                            message: "Made CUSTOM payment!"
                                        })
                    
                                    }).catch((err) => {
                                        console.log(err);
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