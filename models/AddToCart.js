const mongoose = require("mongoose");
const ProductDetails = require("../models/ProductDetails");
const AddToCartSchema = new mongoose.Schema({
   ProductDetails:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"productdetails",
    autopopulate:true
   },
   images:{
    type:String,
   },
   sub_images1:{
    type:String
   },
   sub_images2:{
    type:String
   },
   sub_images3:{
    type:String
   },
   title:{
    type:String
   },
   Created_By:{
    type:String
   },
   Before_Price:{
    type:Number
   },
   After_Price:{
    type:Number
   },
   Discount_Percentage:{
    type:String
},
Select_Size:{
       type:Boolean
   },
   Select_Color:{
    type:Boolean,
   },
   Description:{
    type:String
   }
})

const AddToCartModal = mongoose.model("addtocarts",AddToCartSchema);
module.exports = AddToCartModal;