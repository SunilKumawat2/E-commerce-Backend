const mongoose = require("mongoose");


const ShipingAddresSchema = mongoose.Schema({
    company: {
        type: String,
    },
    Address: {
        type: String,
        required: true
    },
    AddtionalAddress: {
        type: String,
    },
    Appartment: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    tokenPayload:{
        userId:String,
        name:String,
        email:String,
        phone:String 
    },

})

const ShipingAddresModal = mongoose.model("shipingAddess", ShipingAddresSchema);
module.exports = ShipingAddresModal