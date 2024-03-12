const mongoose = require("mongoose");

const ProductAddToCartSchema = new mongoose.Schema({
    ProductDetailsList:{
        _id:String,
        After_Price:Number,
        Before_Price:Number,
        Description:String,
        Discount_Percentage:String,
        by_Created:String,
        images:String,
        title:String,
        sub_images1:String,
        sub_images2:String,
        sub_images3:String,
    },
    tokenPayload:{
        userId:String,
        name:String,
        email:String,
        phone:String 
    },
    selectedSize:String,
    AddQuntity:Number,
    TotalPrice:Number,
    SubTotal:Number

})

const ProductAddToCartModal = mongoose.model("productaddtocarts",ProductAddToCartSchema)
module.exports = ProductAddToCartModal;