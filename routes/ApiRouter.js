const ProductController = require("../controller/ProductController");
const ProductDetailsController = require("../controller/ProductDetailsController");
const BlogController = require("../controller/BlogController");
const AboutController = require("../controller/AboutController");
const ContactController = require("../controller/ContactController");
const UserController = require("../controller/UserController");
const AdminController = require("../controller/AdminController");
const ProductAddToCartController = require("../controller/ProductAddToCartController");
const AddWishListController = require("../controller/AddWishListController");
const AddAddressController = require("../controller/AddAddressController");
const ShpingAddressController = require("../controller/ShpingAddressController");
const PaymentController = require("../controller/PaymentController");
const authenticateToken = require("../middleWare/MiddleWare");
const OTPVerifyUitls = require("../utils/OTPVerify");
const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const stoarge = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/photos")
    },filename:(req,file,cb)=>{
       cb(null, file.fieldname + "-" + Date.now() + path.extname (file.originalname))
    }
})

const upload = multer({
    storage:stoarge
})
// Product Section
router.post("/Product/post",ProductController.CreateProduct)
router.get("/Product/get",ProductController.GetProduct)
router.delete("/Product/delete/:_id",ProductController.DeleteProduct)
router.get("/Product/getById/:_id",ProductController.GetProductById)
router.put("/Product/update/:_id",ProductController.EditProduct)

// <---------- Product Details ------------------>
router.post("/ProductDetails/post",upload.single("images"),ProductDetailsController.CreateProductDetails)
router.get("/ProductDetails/get",ProductDetailsController.GetProductDetails)
router.get("/ProductDetails/getById/:_id",ProductDetailsController.GetProductDetailsListById)
router.get("/ProductDetails1/getById/:_id",ProductDetailsController.GetProductDetailsListById1)
router.delete("/ProductDetails/delete/:_id",ProductDetailsController.DeleteProductDetails)
router.put("/ProductDetails/update/:_id",upload.single("images"),ProductDetailsController.EditProductDetails)

// <---- Product Add To Cart Details -------------------->
router.post("/ProductAddToCart/post",ProductAddToCartController.CreateProductAddToCart)
router.get("/ProductAddToCart/get",authenticateToken,ProductAddToCartController.GetProductAddToCart)
router.get("/ProductAddToCart/getById/:_id",authenticateToken,ProductAddToCartController.GetProductAddToCartById)
router.get("/ProductAddToCart/GetAll",ProductAddToCartController.GetAllProductAddToCart)
router.delete("/ProductAddToCart/delete/:_id1",ProductAddToCartController.DeleteProductAddToCart)
router.put("/ProductAddToCart/edit/:_id1",ProductAddToCartController.EditProductAddToCart)

// <-------------- Product Add To WishLsit---------------->
router.post("/ProductAddWishList/post",AddWishListController.CreateProductAddWishList)
router.get("/ProductAddWishList/get",authenticateToken,AddWishListController.GetProductAddWishList)

// <------------------- Address-------------------------->
router.post("/AddAddress/post",AddAddressController.CreateAddAddress)
router.get("/AddAddress/get",authenticateToken,AddAddressController.GetAddress)
router.delete("/AddAddress/delete/:_id",AddAddressController.DeleteAddress)

// <---------------- Shping Address ----------------->
router.post("/ShipingAddres/post",ShpingAddressController.CreateShipingAddres)
router.get("/ShipingAddres/get",authenticateToken,ShpingAddressController.GetShipingAddress)
router.put("/ShipingAddres/update",authenticateToken,ShpingAddressController.EditShipingAddress)
router.get("/ShipingAddres/getById/:_id",ShpingAddressController.GetShipingAddressById)

// <---------------- Payment GateWay------------>
router.post("/Payment/post",PaymentController.CreatePayment);

//  Blog Section
router.post("/Blog/post",upload.single("images"),BlogController.CreateBlog)
router.get("/Blog/get",BlogController.GetBlog)
router.delete("/Blog/delete/:_id",BlogController.DeleteBlog)
router.get("/Blog/getById/:_id",BlogController.GetBlogById)
router.put("/Blog/update/:_id",upload.single("images"),BlogController.EditBlog)

// About Section
router.post("/About/post",upload.single("images"),AboutController.CreateAboutPage)
router.get("/About/get",AboutController.GetAboutPage)
router.get("/About/getById/:_id",AboutController.GetAboutPageById)
router.delete("/About/delete/:_id",AboutController.DeleteAboutPage)
router.put("/About/update/:_id",upload.single("images"),AboutController.EditAboutPage);

//  Contact section
router.post("/contact/post",upload.single("images"),ContactController.CreateContact);

//<------------- Authentication Section-------------->
router.post("/user/post",UserController.CreateUser);
router.post("/user/login",UserController.LoginUser);
router.get("/user/get/login", UserController.authenticateToken, UserController.GetUserDetails);
router.post("/user/logout",UserController.LogoutUser);
router.get("/user/get",UserController.GetUserList);
router.put("/user/Forget_PassWord",UserController.ForgetPassWord);
router.put("/Send-Otp-Forget-Password/put",UserController.SendOtpForgetPassword);
router.post("/user/otp-verify",OTPVerifyUitls.VerifyOTP);
router.post("/user/Forget_Password_Verify_OTP",OTPVerifyUitls.Forget_Password_Verify_OTP);
router.put("/user/edit/login",upload.single("images"),UserController.authenticateToken, UserController.EditUserDetails);

// <------------ Admin Login ---------------->
router.post("/admin/register",AdminController.CreateAdmin);
router.post("/admin/login",AdminController.AdminLogin);

// dskfhkjdg


module.exports = router