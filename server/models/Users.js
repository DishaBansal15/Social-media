import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profilePic: { type: String },
        about: { type: String },
        posts: [
            {
                content: { type: String, required: true },
                image: { type: String },
                createdAt: { type: Date, default: Date.now },
            },
        ],
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
