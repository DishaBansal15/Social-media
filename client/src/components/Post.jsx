import React, { useContext, useEffect, useState } from 'react';
import '../styles/Posts.css';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { FaGlobeAmericas } from 'react-icons/fa';
import { IoIosPersonAdd } from 'react-icons/io';
import axios from 'axios';
import { GeneralContext } from '../context/GeneralContextProvider';
import { useNavigate } from 'react-router-dom';

const Post = () => {
    const navigate = useNavigate();
    const { socket } = useContext(GeneralContext);
    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        fetchPosts();

        return () => {
            // Cleanup socket listeners on component unmount
            socket.off('likeUpdated');
            socket.off('userFollowed');
        };
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:6001/fetchAllPosts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    // Predefined posts for testing
    const predefinedPosts = [
        {
            _id: '1',
            userId: 'user123',
            userName: 'John Doe',
            userPic: 'https://randomuser.me/api/portraits/men/1.jpg',
            fileType: 'photo',
            file: 'https://tse1.mm.bing.net/th?id=OIP.ioIqKnKDX0OjNQrZtd1upgHaEK&pid=Api&P=0&h=180',
            description: 'Beautiful sunset!',
            location: 'California',
            likes: ['user123', 'user456'],
            comments: [
                ['Jane', 'Wow, that looks amazing!'],
                ['Mike', 'I agree, it’s stunning!']
            ]
        },
        {
            _id: '2',
            userId: 'user456',
            userName: 'Jane Smith',
            userPic: 'https://randomuser.me/api/portraits/women/1.jpg',
            fileType: 'video',
            file: 'https://www.w3schools.com/html/mov_bbb.mp4',
            description: 'Having fun at the beach!',
            location: 'Miami',
            likes: ['user123'],
            comments: [
                ['John', 'Looks like a blast!'],
                ['Emily', 'Wish I was there!']
            ]
        },
    ];

    // If no posts are fetched from the server, show predefined posts
    const displayPosts = posts.length === 0 ? predefinedPosts : posts;

    // Handle Like/Unlike
    const handleLike = (userId, postId) => {
        socket.emit('postLiked', { userId, postId });
    };

    const handleUnLike = (userId, postId) => {
        socket.emit('postUnLiked', { userId, postId });
    };

    useEffect(() => {
        socket.on('likeUpdated', () => {
            // Handle like updates if needed
        });

        socket.on('userFollowed', ({ following }) => {
            localStorage.setItem('following', JSON.stringify(following));
        });
    }, [socket]);

    const handleFollow = async (userId) => {
        socket.emit('followUser', {
            ownId: localStorage.getItem('userId'),
            followingUserId: userId,
        });
    };

    const handleComment = (postId, username) => {
        socket.emit('makeComment', { postId, username, comment });
    };

    return (
        <div className='postsContainer'>
            {displayPosts &&
                displayPosts.map((post) => {
                    const isLiked = Array.isArray(post.likes) && post.likes.includes(localStorage.getItem('userId'));
                    const following = JSON.parse(localStorage.getItem('following') || '[]');

                    return (
                        <div className='Post' key={post._id}>
                            <div className='postTop'>
                                <div className='postTopDetails'>
                                    <img src={post.userPic} alt='' className='userpic' />
                                    <h3
                                        className='usernameTop'
                                        onClick={() => navigate(`/profile/${post.userId}`)}
                                    >
                                        {post.userName}
                                    </h3>
                                </div>

                                {following.includes(post.userId) || localStorage.getItem('userId') === post.userId ? (
                                    <></>
                                ) : (
                                    <IoIosPersonAdd
                                        style={{ cursor: 'pointer' }}
                                        id='addFriendInPost'
                                        onClick={() => handleFollow(post.userId)}
                                    />
                                )}
                            </div>

                            {post.fileType === 'photo' ? (
                                <img src={post.file} className='postimg' alt='' />
                            ) : (
                                <video
                                    id='videoPlayer'
                                    className='postimg'
                                    controls
                                    autoPlay
                                    muted
                                >
                                    <source src={post.file} />
                                </video>
                            )}

                            <div className='postReact'>
                                <div className='supliconcol'>
                                    {isLiked ? (
                                        <AiTwotoneHeart
                                            className={`support reactbtn liked`}
                                            onClick={() =>
                                                handleUnLike(localStorage.getItem('userId'), post._id)
                                            }
                                        />
                                    ) : (
                                        <AiOutlineHeart
                                            className={`support reactbtn`}
                                            onClick={() => handleLike(localStorage.getItem('userId'), post._id)}
                                        />
                                    )}

                                    <label htmlFor='support' className='supportCount'>
                                        {post.likes?.length || 0}
                                    </label>
                                </div>
                                <div className='placeiconcol'>
                                    <FaGlobeAmericas className='placeicon reactbtn' name='place' />
                                    <label htmlFor='place' className='place'>
                                        {post.location}
                                    </label>
                                </div>
                            </div>

                            <div className='detail'>
                                <div className='descdataWithBtn'>
                                    <label htmlFor='username' className='desc labeldata' id='desc'>
                                        <span style={{ fontWeight: 'bold' }}>{post.userName}</span>&nbsp;
                                        {post.description}
                                    </label>
                                </div>
                            </div>

                            <div className='commentsContainer'>
                                <div className='makeComment'>
                                    <input
                                        type='text'
                                        placeholder='type something...'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                    <button
                                        className={`btn btn-primary ${comment.length === 0 ? 'disabled' : ''}`}
                                        disabled={comment.length === 0}
                                        onClick={() => handleComment(post._id, localStorage.getItem('username'))}
                                    >
                                        comment
                                    </button>
                                </div>
                                <div className='commentsBody'>
                                    <div className='comments'>
                                        {post.comments.map((comment, index) => {
                                            return (
                                                <p key={index}>
                                                    <b>{comment[0]}</b> {comment[1]}
                                                </p>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default Post;
