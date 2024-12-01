import React, { useContext, useEffect, useState } from 'react';
import '../styles/Stories.css';
import { BiPlusCircle } from 'react-icons/bi';
import { GeneralContext } from '../context/GeneralContextProvider';
import axios from 'axios';
import { RxCross2 } from 'react-icons/rx';

const Stories = () => {
    const { socket, setIsCreateStoryOpen } = useContext(GeneralContext);
    const [stories, setStories] = useState([]);
    const [isStoryPlaying, setIsStoryPlaying] = useState(false);
    const [story, setStory] = useState();
    const [error, setError] = useState('');
    const [following, setFollowing] = useState([]);
    const [userId, setUserId] = useState(localStorage.getItem('userId'));

    // Fetch following and userId once to optimize performance
    useEffect(() => {
        setFollowing(localStorage.getItem('following')?.split(',') || []);
        setUserId(localStorage.getItem('userId'));
    }, []);

    // Fetch stories from the backend
    const fetchStories = async () => {
        try {
            const response = await axios.get('http://localhost:6001/fetchAllStories');
            setStories(response.data);
            setError('');
        } catch (err) {
            console.error(err);
            setError('Failed to load stories, please try again.');
        }
    };

    useEffect(() => {
        fetchStories();
    }, []);

    // Add a new story
    const addStory = () => {
        setIsCreateStoryOpen(true);
    };

    // Open and play the clicked story
    const handleOpenStory = async (story) => {
        setStory(story);
        await socket.emit('story-played', { storyId: story._id, userId });
        setIsStoryPlaying(true);
    };

    // Filter stories based on conditions
    const filterStories = (stories) => {
        return stories.filter((story) => {
            const isFollowing = following.includes(story.userId) || story.userId === userId;
            const isWithin24Hours = Math.abs(Math.round((new Date().getTime() - new Date(story.createdAt).getTime()) / (1000 * 60 * 60))) < 24;
            return isFollowing && isWithin24Hours;
        });
    };

    // Custom stories for testing
    const customStories = [
        {
            _id: '1',
            userId: 'user123',
            username: 'John Doe',
            userPic: 'https://randomuser.me/api/portraits/men/1.jpg',
            fileType: 'photo',
            file: 'https://via.placeholder.com/600x400',
            text: 'A beautiful sunrise!',
            viewers: ['user123', 'user456'],
            createdAt: new Date().toISOString()
        },
        {
            _id: '2',
            userId: 'user456',
            username: 'Jane Smith',
            userPic: 'https://randomuser.me/api/portraits/women/1.jpg',
            fileType: 'video',
            file: 'https://www.w3schools.com/html/mov_bbb.mp4',
            text: 'Chilling at the beach.',
            viewers: ['user123'],
            createdAt: new Date().toISOString()
        },
    ];

    // If no stories are fetched from the server, show custom stories
    const displayStories = stories.length === 0 ? customStories : stories;

    // Clean up socket on component unmount
    useEffect(() => {
        return () => {
            socket.off('story-played');
        };
    }, [socket]);

    return (
        <div className="storiesContainer">
            <div className="storiesTitle">
                <h3>Stories</h3>
            </div>

            <div className="storiesBody" style={isStoryPlaying ? { display: 'none' } : {}}>
                <div className="stories">
                    <div className="story self-story" onClick={addStory}>
                        <img src={localStorage.getItem('profilePic')} alt="Profile" />
                        <p>Add story</p>
                        <span><BiPlusCircle /></span>
                    </div>

                    {displayStories.length === 0 ? (
                        <p>No stories available</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        filterStories(displayStories).map((story) => (
                            <div
                                className="story user-story"
                                key={story._id}
                                onClick={() => handleOpenStory(story)}
                                style={
                                    story.viewers.includes(userId)
                                        ? { border: '3px solid #a5a7a995' }
                                        : { border: '3px solid #569bdfc9' }
                                }
                            >
                                <img src={story.userPic} alt="Story user" />
                                <p>{story.username}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {story && (
                <div className="storyPlayContainer" style={isStoryPlaying ? {} : { display: 'none' }}>
                    <div className="storyPlayBodyTop">
                        <p>{story.username}</p>
                        <span onClick={() => setIsStoryPlaying(false)}><RxCross2 /></span>
                    </div>
                    <div className="storyPlayBodyContent">
                        {story.fileType === 'photo' ? (
                            <img src={story.file} alt="Story content" />
                        ) : (
                            <video id="videoPlayer" className="postimg" controls autoPlay muted>
                                <source src={story.file} />
                            </video>
                        )}
                        <p>{story.text}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Stories;
