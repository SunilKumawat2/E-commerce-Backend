const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const SendOTP = require("../middleWare/SendOTP")
const SendOTP = require("../utils/SendOTP")


// ,<------------- Rigister Controller------------->
const CreateUser = async (req, res) => {
    try {
        const { name, email, phone, password, conf_password } = req.body;

        if (password !== conf_password) {
            return res.status(400).json({
                status: 400,
                message: "Passwords do not match",
            });
        }

        const exitsEmail = await User.findOne({ email });
        if (exitsEmail) {
            return res.status(400).json({ status: 400, message: "Email is already in Use" });
        }

        if (phone.length < 10) {
            return res.status(400).json({
                status: 400,
                message: "Phone Number must be 10 digits",
            });
        }

        if (phone.length > 12) {
            return res.status(400).json({
                status: 400,
                message: "Phone Number must not exceed 12 digits",
            });
        }

        // Send OTP and save it to the user's tokens array
        const otp = await SendOTP(email);

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            conf_password,
        });

        // Generate a Token
        const token = jwt.sign({ userId: newUser._id }, 'your_secret_key');

        newUser.tokens.push({
            otp,
            token,
        });

        // Save the user data
        await newUser.save();

        return res.status(201).json({
            status: 201,
            message: "Successfully Sign Up The User",
            data: {
                user: newUser,
                token,
                otp,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Server Side error Sign Up The User",
        });
    }
};
const CreateUser1 = async (req, res) => {
    try {
        const { name, email, phone, password, conf_password } = req.body;

        if (password !== conf_password) {
            return res.status(400).json({
                status: 400,
                message: "Passwords do not match",
            });
        }

        const exitsEmail = await User.findOne({ email });
        if (exitsEmail) {
            return res.status(400).json({ status: 400, message: "Email is already in Use" });
        }

        if (phone.length < 10) {
            return res.status(400).json({
                status: 400,
                message: "Phone Number must be 10 digits",
            });
        }

        if (phone.length > 12) {
            return res.status(400).json({
                status: 400,
                message: "Phone Number must not exceed 12 digits",
            });
        }

        // Send OTP and save it to the user's tokens array
        const otp = await SendOTP(email);

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            conf_password,
        });

        // Generate a Token
        const token = jwt.sign({ userId: newUser._id }, 'your_secret_key');

        newUser.tokens.push({
            otp,
            token,
        });

        // Save the user data
        await newUser.save();

        return res.status(201).json({
            status: 201,
            message: "Successfully Sign Up The User",
            data: {
                user: newUser,
                token,
                otp,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Server Side error Sign Up The User",
        });
    }
};

// <------------ Authenticate UserLogin Token------------>
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    console.log("Authorization", token)
    if (!token) {
        return res.status(401).json({
            status: 401,
            message: 'Access denied. No token provided.',
        });
    }

    jwt.verify(token, 'your_secret_key', async (err, userData) => {
        if (err) {
            return res.status(403).json({
                status: 403,
                message: 'Invalid token.',
            });
        }

        try {
            // Fetch the user from the database using the ID from the token
            const user = await User.findById(userData.userId);

            if (!user) {
                return res.status(401).json({
                    status: 401,
                    message: 'User not found.',
                });
            }

            // Attach the user instance to the request
            req.userData = user;
            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: 500,
                message: 'Server Side error fetching user details',
                error: error.message,
            });
        }
    });
};
// ,<------------- Login Controller------------->
const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email, 'is_veerify': true })

        if (!userData) {
            return res.status(400).json({
                status: 400,
                message: "User not found"
            })
        }
        const isMatchPassword = await bcrypt.compare(password, userData.password)
        if (!isMatchPassword) {
            return res.status(401).json({
                status: 401,
                message: "Invalid password"
            })
        }
        // Include additional user information in the token payload
        const tokenPayload = {
            userId: userData._id,
            name: userData.name, // Add the user's name
            email: userData.email, // Add the user's email
            phone: userData.phone, // Add the user's email
            // Add other properties as needed
        };

        // Generate a Token with the additional information
        const token = jwt.sign(tokenPayload, 'your_secret_key', { expiresIn: '24h' });
        // Generate a Token

        return res.status(201).json({
            status: 201, message: "Login successful", data: {
                userData,
                token,
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Server Side error during login',
        });
    }
}
// ,<------------- Get Details Login Controller------------->
const GetUserDetails = async (req, res) => {
    try {
        // Assuming you have middleware to verify the token and attach user details to the request object
        const { userData } = req;

        if (!userData) {
            return res.status(401).json({
                status: 401,
                message: "User not authenticated",
            });
        }

        // Return user details
        return res.status(200).json({
            status: 200,
            message: "User details fetched successfully",
            data: {
                userData,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: 500,
            message: 'Server Side error fetching user details',
            error: error.message,
        });
    }
};
// <--------- EditUserDetails---------->
const EditUserDetails = async (req, res) => {
    try {
        // Extract relevant information from the request body
        const { name, email, phone, last_Name, dob } = req.body;
        const images = req.file ? req.file.filename : null;
        const { userData } = req;

        if (!userData) {
            return res.status(401).json({
                status: 401,
                message: "User not authenticated123",
            });
        }

        // Update the user details in the database
        userData.name = name;
        userData.email = email;
        userData.phone = phone;
        userData.last_Name = last_Name;
        userData.dob = dob;
        userData.images = images;

        await userData.save();

        // Return updated user details
        return res.status(200).json({
            status: 200,
            message: "User details updated successfully",
            data: {
                userData,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: 500,
            message: 'Server Side error updating user details',
            error: error.message,
        });
    }
};
// ,<------------- Logout Controller------------->
const LogoutUser = async (req, res) => {
    try {
        const { user } = req; // Assuming you have middleware to get the authenticated user

        // Remove the token from the tokens array (assuming you have a token property in your schema)
        user.tokens = user.tokens.filter(tokenObj => tokenObj.token !== req.token);

        await user.save();

        return res.status(200).json({
            status: 200,
            message: 'Logout successful',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Server Side error during logout',
        });
    }
};

const GetUserList = async (req, res) => {
    try {
        const UserList = await User.find();
        if (UserList.length > 0) {
            const UserListdata = UserList.map((UserListResult) => ({
                _id: UserListResult._id,
                name: UserListResult.name,
                email: UserListResult.email,
                phone: UserListResult.phone,
                password: UserListResult.password,
                conf_password: UserListResult.conf_password,
                is_veerify: UserListResult.is_veerify,
                tokens: UserListResult.tokens,
                otp: UserListResult.otp,
                dob: UserListResult.dob,
                last_Name: UserListResult.last_Name,
                images: UserListResult.images,
            }))
            return res.status(200).json({
                status: 200, message: 'Successfully fetch the UserList'
                , data: UserListdata
            })
        }
        return res.status(400).json({ status: 400, message: 'Data Not Found fetch the UserList' })
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Server side error fetch the UserList' })

    }
}

const SendOtpForgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Generate OTP
        const Forget_PassWord_otp = await SendOTP(email);

        // Update the user's document with the OTP
        const user = await User.findOneAndUpdate({ email },
            { $set: { Forget_PassWord_otp } }, { new: true });

        if (!user) {
            return res.status(404).json({ status: 404, message: "User Not Found" })
        }

        return res.status(201).json({
            status: 201,
            message: "Successfully updated the user's OTP",
            data: {
                user,
                Forget_PassWord_otp,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Server Side error updating the user's OTP",
        });
    }
};

const ForgetPassWord = async (req,res)=>{
    try{
      const {email,password,conf_password} = req.body;

      const user = await User.findOneAndUpdate({email},{password,conf_password},{new:true});
      if(!user){
        return res.status(400).json({status:209,message:"User Not Found"})
      }
      if(password !== conf_password){
        return res.status(209).json({status:209,message:"PassWord Do Not Match"})
      }
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Update the user's password
      user.password = hashedPassword;

      // Save the updated user document
      await user.save();
      return res.status(201).json({status:201,message:"Password Reset successfully",data: user})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'Server Side Error updating password' });
    }
}

module.exports = {
    CreateUser, LoginUser, LogoutUser, GetUserList, GetUserDetails,
    authenticateToken, EditUserDetails, SendOtpForgetPassword,ForgetPassWord
};
