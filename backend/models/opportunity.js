const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = opportunitySchema;