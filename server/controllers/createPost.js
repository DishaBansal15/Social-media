import Post from '../models/Post.js';

export const createPost = async (req, res) => {
    try {
        // Create a new post using the data from the request body
        const newPost = new Post(req.body);

        // Save the post to the database
        const post = await newPost.save();

        // Return the saved post to the client
        res.status(201).json(post);  // 201 indicates that the post was created successfully
    } catch (e) {
        res.status(500).json({ error: e.message });  // Sending the error message if an error occurs
    }
};
