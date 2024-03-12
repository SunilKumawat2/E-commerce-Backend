const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    console.log('Authorization', token);

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
                message: 'Invalid token.Please Provid the Valid Token',
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

            // Call next to proceed to the next middleware or route handler
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

module.exports = authenticateToken;
