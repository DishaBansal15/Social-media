import React, { useContext, useEffect, useState } from 'react'
import '../styles/ProfilePage.css'
import '../styles/Posts.css';
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { FaGlobeAmericas } from "react-icons/fa";
import { IoIosPersonAdd } from 'react-icons/io'
import HomeLogo from '../components/HomeLogo'
import Navbar from '../components/Navbar'
import { AuthenticationContext } from '../context/AuthenticationContextProvider'
import { GeneralContext } from '../context/GeneralContextProvider'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { logout } = useContext(AuthenticationContext);
  const { socket } = useContext(GeneralContext);
  const { id } = useParams();
  const userId = localStorage.getItem("userId");

  const [userProfile, setUserProfile] = useState([]);
  const [updateProfilePic, setUpdateProfilePic] = useState('');
  const [updateProfileUsername, setUpdateProfileUsername] = useState('');
  const [updateProfileAbout, setUpdateProfileAbout] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    socket.emit("fetch-profile", { _id: id });

    socket.on("profile-fetched", async ({ profile }) => {
      setUserProfile(profile);
      setUpdateProfilePic(profile.profilePic);
      setUpdateProfileUsername(profile.username);
      setUpdateProfileAbout(profile.about);
    });

    // Predefined posts
    const predefinedPosts = [
      {
        _id: '1',
        userPic: 'https://via.placeholder.com/150',
        userName: 'John Doe',
        description: 'Enjoying a sunny day in the park!',
        file: 'https://via.placeholder.com/400x200?text=Sunny+Day',
        fileType: 'photo',
        location: 'Central Park, NYC',
        likes: ['1', '2'],
        comments: [['Alice', 'Great photo!'], ['Bob', 'Wish I was there!']],
      },
      {
        _id: '2',
        userPic: 'https://via.placeholder.com/150',
        userName: 'Jane Smith',
        description: 'Just finished an amazing book!',
        file: 'https://via.placeholder.com/400x200?text=Book+Review',
        fileType: 'photo',
        location: 'Home',
        likes: ['1'],
        comments: [['Charlie', 'What book was it?']],
      },
      {
        _id: '3',
        userPic: 'https://via.placeholder.com/150',
        userName: 'Alex Johnson',
        description: 'Exploring the mountains this weekend.',
        file: 'https://via.placeholder.com/400x200?text=Mountain+Adventure',
        fileType: 'photo',
        location: 'Rocky Mountains',
        likes: ['2'],
        comments: [['Dave', 'Looks amazing!'],
        ['Eve', 'Where is this?']],
      }
    ];
    setPosts(predefinedPosts);

  }, [socket]);

  const handleUpdate = async () => {
    socket.emit('updateProfile', { userId: userProfile._id, profilePic: updateProfilePic, username: updateProfileUsername, about: updateProfileAbout });
    setIsUpdating(false);
  };

  const handleLike = (userId, postId) => {
    socket.emit('postLiked', { userId, postId });
  };

  const handleUnLike = (userId, postId) => {
    socket.emit('postUnLiked', { userId, postId });
  };

  const handleFollow = async (userId) => {
    socket.emit('followUser', { ownId: localStorage.getItem('userId'), followingUserId: userId });
  };

  const handleUnFollow = async (userId) => {
    socket.emit('unFollowUser', { ownId: localStorage.getItem('userId'), followingUserId: userId });
  };

  useEffect(() => {
    socket.on('userFollowed', ({ following }) => {
      localStorage.setItem('following', following);
    });

    socket.on('userUnFollowed', ({ following }) => {
      localStorage.setItem('following', following);
    });
  }, [socket]);

  const [comment, setComment] = useState('');

  const handleComment = (postId, username) => {
    socket.emit('makeComment', { postId, username, comment });
    setComment('');
  };

  const handleDeletePost = async (postId) => {
    await socket.emit('delete-post', { postId });
  };

  useEffect(() => {
    socket.on('post-deleted', async ({ posts }) => {
      setPosts(posts);
    });
  }, [socket]);

  return (
    <div className='profilePage'>
      <HomeLogo />
      <Navbar />

      <div className="profileCard" style={isUpdating ? { display: 'none' } : { display: "flex" }}>
        <img src={userProfile.profilePic} alt="" />
        <h4>{userProfile.username}</h4>
        <p>{userProfile.about} </p>

        <div className="profileDetailCounts">
          <div className="followersCount">
            <p>Followers</p>
            <p>{userProfile.followers ? userProfile.followers.length : 0}</p>
          </div>
          <div className="followingCounts">
            <p>Following</p>
            <p>{userProfile.following ? userProfile.following.length : 0}</p>
          </div>
        </div>

        <div className="profileControls">
          {userProfile._id === userId ?
            <div className="profileControlBtns">
              <button onClick={async () => { await logout() }}>Logout</button>
              <button type="button" className="btn btn-primary" onClick={() => setIsUpdating(true)}>Edit</button>
            </div>
            :
            <div className="profileControlBtns">
              {
                localStorage.getItem('following').includes(userProfile._id) ?
                  <>
                    <button onClick={() => handleUnFollow(userProfile._id)} style={{ backgroundColor: 'rgb(224, 42, 42)' }}>Unfollow</button>
                    <button >Message</button>
                  </>
                  :
                  <button onClick={() => handleFollow(userProfile._id)}>Follow</button>
              }
            </div>
          }
        </div>
      </div>

      <div className='profileEditCard' style={!isUpdating ? { display: 'none' } : { display: "flex" }}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Profile Image</label>
          <input type="text" class="form-control" id="exampleInputEmail1" onChange={(e) => setUpdateProfilePic(e.target.value)} value={updateProfilePic} />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Username</label>
          <input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setUpdateProfileUsername(e.target.value)} value={updateProfileUsername} />
        </div>
        <div class="mb-3">
          <label for="editAbout" class="form-label">About</label>
          <input type="text" class="form-control" id="editAbout" onChange={(e) => setUpdateProfileAbout(e.target.value)} value={updateProfileAbout} />
        </div>
        <button className='btn btn-primary' onClick={handleUpdate}>Update</button>
      </div>

      <div className="profilePostsContainer">
        {posts.filter(post => post.userId === userProfile._id).map((post) => (
          <div className="Post" key={post._id}>
            <div className="postTop">
              <div className="postTopDetails">
                <img src={post.userPic} alt="" className="userpic" />
                <h3 className="usernameTop">{post.userName}</h3>
              </div>
              <button className='btn btn-danger deletePost' onClick={() => handleDeletePost(post._id)}>Delete</button>
            </div>

            {post.fileType === 'photo' ?
              <img src={post.file} className='postimg' alt="" />
              :
              <video id="videoPlayer" className='postimg' controls autoPlay muted>
                <source src={post.file} />
              </video>
            }

            <div className="postReact">
              <div className="supliconcol">
                {post.likes.includes(localStorage.getItem('userId')) ?
                  <AiTwotoneHeart className='support reactbtn' onClick={() => handleUnLike(localStorage.getItem('userId'), post._id)} />
                  :
                  <AiOutlineHeart className='support reactbtn' onClick={() => handleLike(localStorage.getItem('userId'), post._id)} />}
                <BiCommentDetail className='comment reactbtn' />
              </div>

              <p className='likecount'>{post.likes.length} Likes</p>
              <p className='commentcount'>{post.comments.length} Comments</p>
            </div>

            <div className="commentsSection">
              <div className="userComment">
                <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
                <button className="submitBtn" onClick={() => handleComment(post._id, userProfile.username)}>Comment</button>
              </div>

              <div className="postComments">
                {post.comments.map((comment, index) => (
                  <div className="postComment" key={index}>
                    <img src="https://via.placeholder.com/50" className="userpic" alt="" />
                    <div>
                      <p className="commentUsername">{comment[0]}</p>
                      <p className="commentContent">{comment[1]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile;
