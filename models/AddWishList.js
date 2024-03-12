const mongoose = require("mongoose");

const ProductAddWishListSchema = new mongoose.Schema({
    ProductDetailsList:{
        _id:String,
        After_Price:String,
        Before_Price:String,
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
    AddQuntity:String,
   
})

const ProductAddWishListModal = mongoose.model("whishlists",ProductAddWishListSchema)
module.exports = ProductAddWishListModal;