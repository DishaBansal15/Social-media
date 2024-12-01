import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../models/Users.js';

// Generate JWT token
const generateToken = (id) => {
    const jwtSecret = 'thisIsTheSecretCodeForTheJWTToken';
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: '30d',
    });
};

export const register = async (req, res) => {
    try {
        const { username, email, password, profilePic } = req.body;

        // Check if email already exists
        const existingUser = await Users.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: "Email already in use" });

        // Hash password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new Users({
            username,
            email,
            password: passwordHash,
            profilePic,
        });

        const user = await newUser.save();

        // Generate JWT token
        const token = generateToken(user._id);

        const userData = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            about: user.about,
            posts: user.posts,
            followers: user.followers,
            following: user.following,
        };

        res.status(200).json({ token, user: userData });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User does not exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        // Generate JWT token
        const token = generateToken(user._id);
        delete user.password;

        const userData = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            about: user.about,
            posts: user.posts,
            followers: user.followers,
            following: user.following,
        };

        res.status(200).json({ token, user: userData });
        console.log(token, userData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
