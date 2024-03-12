const mongoose = require("mongoose");
const Product = require("../models/Product");

const ProductDetailsSchema = new mongoose.Schema({
    Product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",  // Make sure this matches the name of the referenced model
        autopopulate: true,
    },
    images: {
        type: String,
    },
    title: {
        type: String,
    },
    sub_images1: {
        type: String,
    },
    sub_images2: {
        type: String,
    },
    sub_images3: {
        type: String,
    },
    by_Created: {
        type: String,
    },
    Before_Price: {
        type: String
    },
    Discount_Percentage:{
        type:String
    },
    After_Price: {
        type: String
    },
    Description: {
        type: String,
    },
    Select_Size: [{
        type: mongoose.Schema.Types.Mixed // Array of mixed types to store both strings and objects
    }]
});

// Add the mongoose-autopopulate plugin to automatically populate the referenced document
ProductDetailsSchema.plugin(require('mongoose-autopopulate'));

const ProductDetailsModel = mongoose.model("productdetails", ProductDetailsSchema);
module.exports = ProductDetailsModel;
