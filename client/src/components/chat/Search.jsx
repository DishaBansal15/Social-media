import React, { useContext, useEffect, useState } from 'react';
import { TbSearch } from 'react-icons/tb';
import { GeneralContext } from '../../context/GeneralContextProvider';

const Search = () => {
  const { dispatch, socket } = useContext(GeneralContext);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState();
  const [err, setErr] = useState(false);
  const userId = localStorage.getItem('userId');
  let typingTimer;

  const handleSearch = async (e) => {
    e.preventDefault();
    setErr(false);
    setUser(null); // Clear previous user search
    clearTimeout(typingTimer); // Prevent sending multiple requests
    typingTimer = setTimeout(() => {
      socket.emit('chat-user-searched', { ownId: userId, username: search });
    }, 500); // Debounce the search input by 500ms
  };

  useEffect(() => {
    socket.on('searched-chat-user', async ({ user }) => {
      setUser(user);
    });

    socket.on('no-searched-chat-user', () => {
      setErr(true);
    });

    return () => {
      clearTimeout(typingTimer); // Clean up the timer
    };
  }, [socket]);

  const handleSelect = async (selectedUser) => {
    await dispatch({ type: "CHANGE_USER", payload: selectedUser });
    setUser(null); // Clear the selected user after selection
    setSearch(''); // Clear the search input
  };

  return (
    <div className='search'>
      <div className="searchform">
        <input
          type="text"
          placeholder='Search'
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <div className="s-icon" onClick={handleSearch}>
          <TbSearch />
        </div>
      </div>

      {err && <span className="error">No User Found!</span>} {/* Style the error message */}

      {user && (
        <div className="userInfo" onClick={() => handleSelect(user)}>
          <img src={user.profilePic} alt="" />
          <div className="userChatInfo">
            <span>{user.username}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
