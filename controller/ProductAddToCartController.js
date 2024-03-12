const ProductAddToCart = require('../models/ProductAddToCart');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/MiddleWare');

// Controller to add a product to the cart
const CreateProductAddToCart = async (req, res) => {
    try {
        // Verify the token using the authenticateToken middleware
        authenticateToken(req, res, async () => {
            // If authentication is successful, proceed to add the product to the cart
            const userData = req.userData;
            if (userData) {
                const { ProductDetailsList, selectedSize, AddQuntity, TotalPrice } = req.body;
                // Include additional user information in the token payload
                const tokenPayload = {
                    userId: userData._id,
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                };
                // Check if the product already exists in the cart
                const existingProduct = await ProductAddToCart.findOne({
                    "ProductDetailsList._id": ProductDetailsList._id,
                    "tokenPayload.email": userData.email,
                    "selectedSize": selectedSize
                });
                if (existingProduct) {
                    // If the product already exists in the cart, return a conflict response
                    return res.status(409).json({
                        status: 409,
                        message: 'Product already exists in the cart.',
                    });
                }
                // Create a new instance of ProductAddToCart model
                const NewProductAddToCart = new ProductAddToCart({
                    ProductDetailsList,
                    tokenPayload,
                    selectedSize,
                    AddQuntity,
                    TotalPrice
                });
                // Generate a Token with the additional information
                const token = jwt.sign(tokenPayload, 'your_secret_key', { expiresIn: '24h' });
                // Save the product to the cart
                await NewProductAddToCart.save();
                // Send a success response
                return res.status(201).json({
                    status: 201,
                    message: 'Successfully Added To The Cart',
                    data: {
                        ProductDetailsList,
                        token,
                        tokenPayload,
                        selectedSize,
                        AddQuntity,
                        TotalPrice
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

// < ------------- Get Product Add To Cart ------------------>
const GetProductAddToCart = async (req, res) => {
    try {
        // Get the user's email from the request
        const userEmail = req.userData.email;
        // Find cart items associated with the user's email
        const GetAddToCart = await ProductAddToCart.find({ 'tokenPayload.email': userEmail });

        if (GetAddToCart.length > 0) {
            const GetAddToCartData = GetAddToCart?.map((GetAddToCartResult) => ({
                _id1: GetAddToCartResult._id,
                _id: GetAddToCartResult.ProductDetailsList._id,
                After_Price: GetAddToCartResult.ProductDetailsList.After_Price,
                Before_Price: GetAddToCartResult.ProductDetailsList.Before_Price,
                Description: GetAddToCartResult.ProductDetailsList.Description,
                Discount_Percentage: GetAddToCartResult.ProductDetailsList.Discount_Percentage,
                by_Created: GetAddToCartResult.ProductDetailsList.by_Created,
                title: GetAddToCartResult.ProductDetailsList.title,
                images: GetAddToCartResult.ProductDetailsList.images,
                name: GetAddToCartResult.tokenPayload.name,
                email: GetAddToCartResult.tokenPayload.email,
                phone: GetAddToCartResult.tokenPayload.phone,
                selectedSize: GetAddToCartResult.selectedSize,
                AddQuntity: GetAddToCartResult.AddQuntity,
            }));

            return res.status(200).json({
                status: 200,
                message: "Fetch the Add To Cart data Successfully",
                data: GetAddToCartData
            });
        }

        return res.status(400).json({ status: 400, message: "No items found in the cart" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: 500, message: "Server Side error Get Product Add To Cart" });
    }
};

// <--------------- Get All Product Add To Cart ----------------->
const GetAllProductAddToCart = async (req, res) => {
    try {
        const AllProductAddToCart = await ProductAddToCart.find();
        if (AllProductAddToCart.length > 0) {
            const AllProductAddToCartData = AllProductAddToCart?.map((AllProductAddToCartResult) => ({
                _id1: AllProductAddToCartResult._id,
                _id: AllProductAddToCartResult.ProductDetailsList._id,
                After_Price: AllProductAddToCartResult.ProductDetailsList.After_Price,
                Before_Price: AllProductAddToCartResult.ProductDetailsList.Before_Price,
                Description: AllProductAddToCartResult.ProductDetailsList.Description,
                Discount_Percentage: AllProductAddToCartResult.ProductDetailsList.Discount_Percentage,
                by_Created: AllProductAddToCartResult.ProductDetailsList.by_Created,
                title: AllProductAddToCartResult.ProductDetailsList.title,
                images: AllProductAddToCartResult.ProductDetailsList.images,
                name: AllProductAddToCartResult.tokenPayload.name,
                email: AllProductAddToCartResult.tokenPayload.email,
                phone: AllProductAddToCartResult.tokenPayload.phone,
                selectedSize: AllProductAddToCartResult.selectedSize,
                AddQuntity: AllProductAddToCartResult.AddQuntity,
            }))
            return res.status(200).json({
                status: 200,
                message: "Successfully Get All Product Add To Cart",
                data: AllProductAddToCartData
            })
        }
        return res.status(400).json({
            status: 400,
            message: "Data Not Found"
        })
    } catch {
        return res.status(500).json({
            status: 500,
            message: "Server Side error Get All Product Add To Cart"
        })
    }
}
// < ------------- Get Product Add To Cart  By Id------------------>

const GetProductAddToCartById = async (req, res) => {
    try {
        // Get the user's email from the request
        const userEmail = req.userData.email;

        // Find cart items associated with the user's _id

        const userId = req.params._id;
        console.log("userId", userId)
        // Find the cart item associated with the user's email and the specified item ID
        const GetAddToCart = await ProductAddToCart.find({
            'tokenPayload.email': userEmail
        });
        console.log("GetAddToCart", GetAddToCart)
        if (GetAddToCart?.length > 0) {
            const GetAddToCartData = GetAddToCart?.map((GetAddToCartResult) => ({
                _id1: GetAddToCartResult._id,
                _id: GetAddToCartResult.ProductDetailsList._id,
                After_Price: GetAddToCartResult.ProductDetailsList.After_Price,
                Before_Price: GetAddToCartResult.ProductDetailsList.Before_Price,
                Description: GetAddToCartResult.ProductDetailsList.Description,
                Discount_Percentage: GetAddToCartResult.ProductDetailsList.Discount_Percentage,
                by_Created: GetAddToCartResult.ProductDetailsList.by_Created,
                title: GetAddToCartResult.ProductDetailsList.title,
                images: GetAddToCartResult.ProductDetailsList.images,
                name: GetAddToCartResult.tokenPayload.name,
                email: GetAddToCartResult.tokenPayload.email,
                userId: GetAddToCartResult.tokenPayload.userId,
                phone: GetAddToCartResult.tokenPayload.phone,
                selectedSize: GetAddToCartResult.selectedSize,
                AddQuntity: GetAddToCartResult.AddQuntity,
            }));

            return res.status(200).json({
                status: 200,
                message: "Fetch the Add To Cart data Successfully",
                data: GetAddToCartData
            });
        }

        return res.status(400).json({ status: 400, message: "No items found in the cart" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: 500, message: "Server Side error Get Product Add To Cart" });
    }
};
// < ------------- Delete Product Add To Cart  By Id------------------>
const DeleteProductAddToCart = async (req, res) => {
    try {
        const { _id1 } = req.params;
        console.log(" id DeleteProductAddToCart", _id1)
        const ProductDelete = await ProductAddToCart.findByIdAndDelete(_id1);
        if (!ProductDelete) {
            return res.status(400).json({
                status: 400,
                message: "Data Not Found Delete Product Add To Cart"
            })
        }
        return res.status(202).json({
            status: 202
            , message: "Data Not Found Delete Product Add To Cart"
            , data: ProductDelete
        })
    }
    catch {
        return res.status(500).json({
            status: 500,
            message: "Server Side error Delete Product Add To Cart"
        })

    }
}


const EditProductAddToCart = async (req, res) => {
    try {
        const { _id1 } = req.params;
        console.log("EditProductAddToCart", _id1)
        const { AddQuntity, TotalPrice, SubTotal } = req.body;
        // Update the product with new quantity
        const ProductEditAddToCart = await ProductAddToCart.findByIdAndUpdate(_id1,
            { AddQuntity, TotalPrice, SubTotal }, { new: true });
        if (!ProductEditAddToCart) {
            return res.status(400).json({
                status: 400,
                message: "Data Not Found For the Edit Product Add To Cart"
            });
        }
        return res.status(201).json({
            status: 201,
            message: "Successfully Edit the Product Add To Cart",
            data: ProductEditAddToCart
        });
        // }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server side For the Edit Product Add To Cart"
        });
    }
};

module.exports = {
    CreateProductAddToCart,
    GetProductAddToCart,
    DeleteProductAddToCart,
    EditProductAddToCart,
    GetProductAddToCartById,
    GetAllProductAddToCart
};
