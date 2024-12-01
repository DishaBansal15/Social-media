import React from 'react';
import '../styles/SearchContainer.css';
import { useNavigate } from 'react-router-dom';

const Search = ({ searchedUser, setSearchedUser }) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(`/profile/${searchedUser._id}`);
    setSearchedUser(null); // Reset searched user after click
  };

  return (
    <div className="searchContainer">
      {/* Show user info if search results are available */}
      {searchedUser ? (
        <div className="searchedUserInfo" onClick={handleUserClick}>
          <img
            src={searchedUser.profilePic || 'path/to/default-avatar.png'} // Fallback profile picture
            alt="User Profile"
            className="profilePic"
          />
          <div className="searchedUserChatInfo">
            <span>{searchedUser.username}</span>
          </div>
        </div>
      ) : (
        // Show a message if no user is found
        <div className="noUserFound">No user found</div>
      )}
    </div>
  );
};

export default Search;
