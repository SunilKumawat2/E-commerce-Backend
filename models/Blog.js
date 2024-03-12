const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    images:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    short_description:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},
{ timestamps: true }
)
const BlogModal = mongoose.model("blogs",BlogSchema);
module.exports = BlogModal;