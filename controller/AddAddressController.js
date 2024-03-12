const AddAddress = require("../models/AddAddress");
const authenticateToken = require("../middleWare/MiddleWare")
const CreateAddAddress = async (req, res) => {
    try {
        // Verify the token using the authenticateToken middleware
        authenticateToken(req, res, async () => {
            // If authentication is successful, proceed to add the product to the cart
            const userData = req.userData;
            if (userData) {
                const { place, description } = req.body;
                // Include additional user information in the token payload
                const tokenPayload = {
                    userId: userData._id,
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                };

                // Create a new instance of ProductAddToCart model
                const NewProductAddToCart = new AddAddress({
                    description,
                    place,
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
                        place,
                        description,
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

const GetAddress = async (req, res) => {
    try {
        const userEmail = req.userData.email;
        const AddressList = await AddAddress.find({ "tokenPayload.email": userEmail });
        if (AddressList.length > 0) {
            const AddressListData = AddressList?.map((AddressListResult) => ({
                _id: AddressListResult._id,
                place: AddressListResult.place,
                description: AddressListResult.description,
            }))
            return res.status(200).json({
                status: 200,
                message: "Successfully fetch the Address",
                data: AddressListData
            })
        }
        return res.status(400).json({
            status: 400,
            message: "Data Not Found fetch the Address"
        })

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server Side error fetch the Address"
        })

    }
}

const DeleteAddress = async (req, res) => {
    try {
        const { _id } = req.params
        const AddressDelete = await AddAddress.findByIdAndDelete(_id);
        if (!AddressDelete) {
            return res.status(400).json({ status: 400, message: "data Not Found Address delete" })
        }
        return res.status(202).json({ status: 202, message: "Sucessfully deleted  Address" })
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Server Side error deleted  Address" })

    }
}

module.exports = { CreateAddAddress, GetAddress, DeleteAddress }