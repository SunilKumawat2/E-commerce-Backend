const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    }
})

const ProductModal = mongoose.model("products",ProductSchema);
module.exports = ProductModal;