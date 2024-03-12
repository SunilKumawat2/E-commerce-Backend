const AddWishList = require('../models/AddWishList');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/MiddleWare');

const CreateProductAddWishList = async (req, res) => {
    try {
        // Verify the token using the authenticateToken middleware
        authenticateToken(req, res, async () => {
            // If authentication is successful, proceed to add the product to the Wish List
            const userData = req.userData;
            if (userData) {
                const { ProductDetailsList } = req.body;
                // Include additional user information in the token payload
                const tokenPayload = {
                    userId: userData._id,
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                };
                // Check if the Wish List already exists in the cart
                const existingProduct = await AddWishList.findOne({
                     "ProductDetailsList._id": ProductDetailsList._id ,
                     "tokenPayload.email":userData.email,
                     
                    });
                if (existingProduct) {
                    // If the product already exists in the Wish List, return a conflict response
                    return res.status(409).json({
                        status: 409,
                        message: 'Product already exists in the Wish List.',
                    });
                }
                // Create a new instance of ProductAddWishList model
                const NewProductAddToCart = new AddWishList({
                    ProductDetailsList,
                    tokenPayload,
                });
                // Generate a Token with the additional information
                // const token = jwt.sign(tokenPayload, 'your_secret_key', { expiresIn: '24h' });
                // Save the product to the cart
                await NewProductAddToCart.save();
                // Send a success response
                return res.status(201).json({
                    status: 201,
                    message: 'Successfully Added To The Cart',
                    data: {
                        ProductDetailsList,
                        // token,
                        tokenPayload,
                    },
                });
            } else {
                // If authentication fails, return an unauthorized response
                return res.status(401).json({
                    status: 401,
                    message: 'Unauthorized. Token verification failed.',
                });
            }
        });
    } catch (error) {
        // Handle any errors
        console.error('Error:', error);
        return res.status(500).json({
            status: 500,
            message: 'Server Side Error Adding To The Cart',
        });
    }
};

const GetProductAddWishList = async (req, res) => {
    try {
        // Get the user's email from the request
        const userEmail = req.userData.email;
        console.log("userEmail",userEmail)

        // Find cart items associated with the user's email
        const GetAddToWishList = await AddWishList.find({ 'tokenPayload.email': userEmail });

        if (GetAddToWishList.length > 0) {
            const GetAddToWishListData = GetAddToWishList.map((GetAddToWishListResult) => ({
                _id1: GetAddToWishListResult._id,
                _id: GetAddToWishListResult.ProductDetailsList._id,
                After_Price: GetAddToWishListResult.ProductDetailsList.After_Price,
                Before_Price: GetAddToWishListResult.ProductDetailsList.Before_Price,
                Description: GetAddToWishListResult.ProductDetailsList.Description,
                Discount_Percentage: GetAddToWishListResult.ProductDetailsList.Discount_Percentage,
                by_Created: GetAddToWishListResult.ProductDetailsList.by_Created,
                title: GetAddToWishListResult.ProductDetailsList.title,
                images: GetAddToWishListResult.ProductDetailsList.images,
                name: GetAddToWishListResult.tokenPayload.name,
                email: GetAddToWishListResult.tokenPayload.email,
                phone: GetAddToWishListResult.tokenPayload.phone,
            }));

            return res.status(200).json({
                status: 200,
                message: "Fetch the Add To Wish List data Successfully",
                data: GetAddToWishListData
            });
        }

        return res.status(400).json({ status: 400, message: "No items found in the Wish List" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: 500, message: "Server Side error Get Product Add To Wish List" });
    }
};
module.exports = { CreateProductAddWishList,GetProductAddWishList }