const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const AdminModal = mongoose.model("admins", AdminSchema);
module.exports = AdminModal;