const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        // required: true
    },
    currency: {
        type: String,
        // required: true
    },
    source: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    }
})

const PaymentModal = mongoose.model("payments", PaymentSchema);
module.exports = PaymentModal