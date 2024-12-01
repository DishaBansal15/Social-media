import mongoose from 'mongoose';

// Define the Story schema
const storySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // This links to the User model, assuming you have a User model
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    userPic: {
        type: String,
        required: true,  // Assuming the user's profile picture URL is stored
    },
    text: {
        type: String,
        default: '',
    },
    file: {
        type: String,  // The URL or path to the file (image/video)
        required: true,
    },
    fileType: {
        type: String,  // 'photo' or 'video'
        required: true,
    },
    viewers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',  // Tracks who viewed the story
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the Story model from the schema
const Story = mongoose.model('Story', storySchema);

export default Story;
