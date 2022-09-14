const mongoose = require("mongoose");

//creating a schema for our model
const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subscribedToChannel: {
        type: String,
        required: true
    },
    subscriberDate: {
        type: String,
        required: true,
        default: Date.now
    }
})

// this exporting our model to our app.
module.exports = mongoose.model("Subscriber", subscriberSchema)