const User = require("../models/User")
// <------------ Verify Otp---------------->
const VerifyOTP = async (req, res) => {
    try {
        const { email, OTP } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found",
            });
        }

        // Check if there is an OTP
        const tokenInfo = user.tokens[0];

        if (!tokenInfo) {
            return res.status(400).json({
                status: 400,
                message: "No OTP found. Please request a new OTP.",
            });
        }

        // Verify the entered OTP
        if (OTP !== tokenInfo.otp) {
            return res.status(400).json({
                status: 400,
                message: "Incorrect OTP. Please enter the correct OTP.",
            });
        }

        // Clear the OTP from the user's tokens array
        // user.tokens.otp = [];
        user.is_veerify = true;

        // Save the user without the OTP
        await user.save();

        return res.status(200).json({
            status: 200,
            message: "OTP verified successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Server Side error during OTP verification",
        });
    }
};

const Forget_Password_Verify_OTP = async (req, res) => {
    try {
        const { email, Forget_PassWord_otp } = req.body;
         console.log("email Forget_Password_Verify_OTP",email)
        // Find the user by email
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found",
            });
        }

        // Check if there is an OTP
        const tokenInfo = user.Forget_PassWord_otp;
         console.log("tokenInfo",tokenInfo)
        if (!tokenInfo) {
            return res.status(400).json({
                status: 400,
                message: "No OTP found. Please request a new OTP.",
            });
        }

        // Verify the entered OTP
        if (Forget_PassWord_otp != tokenInfo) {
            return res.status(400).json({
                status: 400,
                message: "Incorrect OTP. Please enter the correct OTP.",
            });
        }

        // Clear the OTP from the user's tokens array
        // user.tokens.otp = [];
        user.is_veerify = true;

        // Save the user without the OTP
        await user.save();

        return res.status(200).json({
            status: 200,
            message: "OTP verified successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Server Side error during OTP verification",
        });
    }
};
module.exports = {VerifyOTP,Forget_Password_Verify_OTP}