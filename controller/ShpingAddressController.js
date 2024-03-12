const ShipingAddres = require("../models/ShipingAddress");
const authenticateToken = require('../middleware/MiddleWare');
const CreateShipingAddres = async (req, res) => {
    try {
        // Verify the token using the authenticateToken middleware
        authenticateToken(req, res, async () => {
            // If authentication is successful, proceed to add the product to the cart
            const userData = req.userData;

            // Destructure the requestData object
            if (userData) {
                const requestData = req.body.requestData; // Access the requestData object
                const {
                    pincode,
                    state,
                    city,
                    Appartment,
                    AddtionalAddress,
                    Address,
                    company } = requestData;
                // Include additional user information in the token payload
                const tokenPayload = {
                    userId: userData._id,
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                };
                // Check if the email already exists in the database
                const exitsEamil = await ShipingAddres.findOne({ "tokenPayload.email": tokenPayload.email })
                if (exitsEamil) {
                    return res.status(409).json({ status: 409, message: 'Already Shping Address Created' })
                }
                const NewProductAddToCart = new ShipingAddres({
                    tokenPayload,
                    pincode,
                    state,
                    city,
                    Appartment,
                    AddtionalAddress,
                    Address,
                    company
                });

                // Save the product to the cart
                await NewProductAddToCart.save();
                // Send a success response
                return res.status(201).json({
                    status: 201,
                    message: 'Successfully Added To The Cart',
                    data: {
                        NewProductAddToCart,
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

const GetShipingAddress = async (req, res) => {
    try {
        const userEmail = req.userData.email;
        const ShpingAddressList = await ShipingAddres.find({ 'tokenPayload.email': userEmail })
        if (ShpingAddressList.length > 0) {
            const ShpingAddressListData = ShpingAddressList?.map((ShpingAddressListResult) => ({
                _id: ShpingAddressListResult._id,
                company: ShpingAddressListResult.company,
                AddtionalAddress: ShpingAddressListResult.AddtionalAddress,
                Address: ShpingAddressListResult.Address,
                Appartment: ShpingAddressListResult.Appartment,
                city: ShpingAddressListResult.city,
                state: ShpingAddressListResult.state,
                pincode: ShpingAddressListResult.pincode,
                email: ShpingAddressListResult.tokenPayload.email,
                name: ShpingAddressListResult.tokenPayload.name,
                phone: ShpingAddressListResult.tokenPayload.phone,
            }))
            return res.status(200).json({
                status: 200,
                message: "Successfully Fetch the ShpingAddressListData",
                data: ShpingAddressListData
            })
        }
        return res.status(400).json({
            status: 400,
            message: "data not  Found the ShpingAddressListData"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            message: "Server Side error Fetching the ShpingAddressListData"
        })
    }
}

const GetShipingAddressById = async (req, res) => {
    try {
        const { _id } = req.params;
        const Get_Shiping_Address_By_Id = await ShipingAddres.findById(_id);
        if (!Get_Shiping_Address_By_Id) {
            return res.status(400).json({
                status: 400,
                message: "Data Not Found"
            })
        }
        return res.status(200).json({
            status: 200,
            message: "Successfully Get Shiping Address By Id",
            data: Get_Shiping_Address_By_Id
        })
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server Side error"
        })
    }
}

const EditShipingAddress = async (req, res) => {
    try {
        // Verify the token using the authenticateToken middleware
        authenticateToken(req, res, async () => {
            // If authentication is successful, proceed to edit the shipping address
            const userEmail = req.userData.email;
            console.log("User Email for Editing Shipping Address:", userEmail);

            // Extract the new address and phone number from the request body
            const { Address, phone } = req.body;
            console.log("EditShipingAddress phone", phone);

            // Update the shipping address for the user with the provided email
            const editedShippingAddress = await ShipingAddres.findOneAndUpdate(
                { 'tokenPayload.email': userEmail },
                { Address, 'tokenPayload.phone': phone }, // Corrected this line
                { new: true }
            );
            console.log("editedShippingAddress", editedShippingAddress);

            // If no matching shipping address is found, return an error
            if (!editedShippingAddress) {
                return res.status(400).json({ status: 400, message: "Data Not Found" });
            }

            // Return success response with the updated shipping address data
            return res.status(200).json({
                status: 200,
                message: "Successfully Edited The Shipping Address",
                data: editedShippingAddress
            });
        });
    } catch (error) {
        // Handle server-side errors
        console.error('Error Editing Shipping Address:', error);
        return res.status(500).json({
            status: 500,
            message: "Server Side error Editing The Shipping Address"
        });
    }
};


module.exports = { CreateShipingAddres, GetShipingAddress, EditShipingAddress,GetShipingAddressById }