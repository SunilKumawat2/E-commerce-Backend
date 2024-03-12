const mongoose = require("mongoose");

const AddAddresSchema = mongoose.Schema({
    place: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    tokenPayload:{
        userId:String,
        name:String,
        email:String,
        phone:String 
    },
})

const AddAddressModal = mongoose.model("addresses", AddAddresSchema);
module.exports = AddAddressModal