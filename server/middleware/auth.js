import jwt from 'jsonwebtoken';
import Users from '../models/Users.js';

export const verifyToken = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const verified = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await Users.findById(verified.id).select("-password");
            next();
        } catch (err) {
            // Token verification failed, return 401 Unauthorized
            return res.status(401).json({ error: "Unauthorized, invalid token." });
        }
    }

    if (!token) {
        // Token missing, return 403 Forbidden
        return res.status(403).json({ error: "Forbidden, no token provided." });
    }
};
