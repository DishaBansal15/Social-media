import React, { useState } from 'react';
import '../styles/Profile.css'; // Create this file for styling
import { TbEdit } from 'react-icons/tb';

const Profile = ({ user }) => {
    const [posts] = useState([
        {
            id: 1,
            content: 'Had a great day exploring new places and meeting new people!',
            image: 'https://via.placeholder.com/400x200?text=Exploring',
        },
        {
            id: 2,
            content: 'Just finished an amazing book, "Atomic Habits". Highly recommended for anyone looking to improve their productivity.',
            image: 'https://via.placeholder.com/400x200?text=Book+Review',
        },
        {
            id: 3,
            content: 'Celebrating the weekend with friends and good food. Cheers!',
            image: 'https://via.placeholder.com/400x200?text=Weekend+Vibes',
        },
        {
            id: 4,
            content: 'A new project is underway! Excited to share more details soon.',
            image: 'https://via.placeholder.com/400x200?text=Project+Sneak+Peek',
        },
        {
            id: 5,
            content: 'Loving the weather today! Perfect for a walk in the park.',
            image: 'https://via.placeholder.com/400x200?text=Nature+Walk',
        },
        {
            id: 6,
            content: 'Finally learned how to cook! Here’s my first attempt at making lasagna.',
            image: 'https://via.placeholder.com/400x200?text=Cooking+Success',
        },
        {
            id: 7,
            content: 'A weekend getaway to the mountains for some fresh air and peace of mind.',
            image: 'https://via.placeholder.com/400x200?text=Mountain+Getaway',
        },
        {
            id: 8,
            content: 'Just finished an intense workout session. Feeling strong!',
            image: 'https://via.placeholder.com/400x200?text=Workout+Motivation',
        },
        {
            id: 9,
            content: 'My latest art project! Can’t wait to see how it turns out.',
            image: 'https://via.placeholder.com/400x200?text=Art+Project',
        },
        {
            id: 10,
            content: 'Coffee time! Ready to tackle the day ahead.',
            image: 'https://via.placeholder.com/400x200?text=Coffee+Time',
        },
    ]);

    return (
        <div className="profileContainer">
            {/* Profile Header */}
            <div className="profileHeader">
                <div className="profileInfo">
                    <img
                        src={user.profilePic || 'https://via.placeholder.com/150'}
                        alt="User Profile"
                        className="profilePic"
                    />
                    <div className="profileDetails">
                        <h2>{user.username}</h2>
                        <p>{user.bio || 'This is a sample bio'}</p>
                        <button className="editProfileButton">
                            <TbEdit /> Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Posts Section */}
            <div className="postsSection">
                <h3>Posts</h3>
                <div className="postsContainer">
                    {posts.map((post) => (
                        <div key={post.id} className="postCard">
                            <img src={post.image} alt="Post" className="postImage" />
                            <p>{post.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
