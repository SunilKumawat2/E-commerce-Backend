const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        // minLength: 1
    },
    last_Name: {
        type: String
    },
    email: {
        type: String,
        // required: true,
    },
    phone: {
        type: String,
        // required: true,
        // minlength: 10,
        // maxlength: 12,
    },
    password: {
        type: String,
    },
    conf_password: {
        type: String,
    },
    dob: {
        type: String
    },
    images: {
        type: String
    },
    tokens: [
        {
            otp: {
                type: String,
                // required: true,
            },
            token: {
                type: String,
                // required: true,
            }
        }
    ],
    is_veerify: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    Forget_PassWord_otp:Number,
    Forget_Password_is_Verify:{
     type:Boolean,
     default:false   
    }
});

const UserModal = mongoose.model("users", UserSchema);
module.exports = UserModal;
