import Stories from '../models/storySchema.js';  // Adjust the path as needed

// Create a new story
export const createStory = async (req, res) => {
    const { userId, username, userPic, fileType, file, text } = req.body;

    try {
        const newStory = new Stories({
            userId,
            username,
            userPic,
            fileType,
            file,
            text
        });
        await newStory.save();
        res.status(200).json(newStory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating story' });
    }
};

// Fetch all stories
export const fetchAllStories = async (req, res) => {
    try {
        const stories = await Stories.find();
        res.status(200).json(stories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching stories' });
    }
};

// Fetch stories for a specific user (optional)
export const fetchAllUserStories = async (req, res) => {
    const { userId } = req.params;
    try {
        const stories = await Stories.find({ userId });
        res.status(200).json(stories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user stories' });
    }
};
