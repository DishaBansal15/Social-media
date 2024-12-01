import jwt from 'jsonwebtoken';
import Users from '../models/Users.js';

export const verifyToken = async (req, res, next) => {
    let token;

    // Check if token is provided in the authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const verified = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token
            req.user = await Users.findById(verified.id).select("-password");
            next();
        } catch (err) {
            return res.status(401).json({ error: "Unauthorized, invalid token." });
        }
    }

    // If token is not provided
    if (!token) {
        return res.status(403).json({ error: "Forbidden, no token provided." });
    }
};
