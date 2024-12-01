import express from 'express';
import { login, register } from '../controllers/Auth.js';
import { createPost } from '../controllers/createPost.js';
import { fetchAllPosts, fetchAllStories, fetchUserImg, fetchUserName } from '../controllers/Posts.js';
import { createStory, fetchAllUserStories } from '../controllers/Stories.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Authentication Routes
router.post('/register', register);
router.post('/login', login);

// Post Routes
router.post('/createPost', verifyToken, createPost); // Protected route
router.get('/fetchAllPosts', fetchAllPosts);

// User Info Routes
router.get('/fetchUserName', fetchUserName);
router.get('/fetchUserImg', fetchUserImg);

// Story Routes
router.post('/createStory', verifyToken, createStory);  // Protected route
router.get('/fetchAllStories', fetchAllStories);  // Fetch all stories
router.get('/fetchUserStories/:userId', fetchAllUserStories);  // Fetch stories for a specific user (optional)

export default router;
