const Admin = require("../models/Admin");
const bcrypt = require("bcrypt")
const saltRounds = 10
const CreateAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, saltRounds)
        const newAdmin = new Admin({
            email,
            password: hashPassword
        })
        const ExitEmail = await Admin.findOne({ email })
        if (ExitEmail) {
            return res.status(402).json({ status: 402, message: "Email Already Exits" })
        }
        await newAdmin.save();
        return res.status(201).json({
            status: 201,
            message: "Successfully Add The Admin Login",
            data: newAdmin
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server side error Add The Admin Login"
        })

    }
}
const AdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const LoginAdmin = await Admin.findOne({ email });

        if (!LoginAdmin) {
            return res.status(400).json({ status: 400, message: "Invalid Admin" })
        }
        else {
            const IsPassWordVaild = await bcrypt.compare(password, LoginAdmin.password)
            if (IsPassWordVaild) {
                return res.status(201).json({ status: 201, message: "Admin Login Successfully" })
            }
            else {
                return res.status(401).json({ status: 401, message: "Password Not Match" })
            }
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Server Side error Admin Login Successfully" })

    }
}
module.exports = { CreateAdmin, AdminLogin }