const mongoose = require("mongoose");
const SalesOpportunitySchema = require("./opportunity");

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    tel: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdDateTime: {
        type: Date,
        required: true
    },
    salesOpportunities: [SalesOpportunitySchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;