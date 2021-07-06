const mongoose = require("mongoose");

const UserSchema =  new mongoose.Schema({
    accountType: {
        type: String
    },
    username: {
        type: String
    },
    loginUsername: {
        type: String
    },
    loginPassword: {
        type: String
    },
    email: {
        type: String
    },
    loginEmail: {
        type: String
    },
    unique_id: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    birthdate: {
        type: Date
    },
    phoneNumber: {
        type: String
    },
    photo: {
        type: String
    },
    cometChatAuthToken: {
        type: String
    },
    stripeConnectAccount: {
        type: Object
    },
    stripeCustomerAccount: {
        type: Object
    },
    skillsApiToken: {
        type: String
    },
    googleID: {
        type: String
    }
});

module.exports = User = mongoose.model("user", UserSchema);