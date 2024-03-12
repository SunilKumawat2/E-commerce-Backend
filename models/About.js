const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
    images: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    about: {
        type: String,

    }
})

const AboutModal = mongoose.model("abouts", AboutSchema);
module.exports = AboutModal;