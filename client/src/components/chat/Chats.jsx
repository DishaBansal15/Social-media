import React, { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';

const Chats = () => {
  const { socket, chatFirends, setChatFriends, dispatch, chatData } = useContext(GeneralContext);
  const userId = localStorage.getItem('userId');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = () => {
      socket.emit('fetch-friends', { userId });

      socket.on("friends-data-fetched", ({ friendsData }) => {
        setChatFriends(friendsData);
        setIsLoading(false); // Set loading to false once data is fetched
      });

      socket.on('error', (err) => {
        console.error('Error fetching friends:', err);
        setIsLoading(false); // Stop loading in case of an error
      });
    };

    fetchFriends();

    // Cleanup socket listeners when component unmounts
    return () => {
      socket.off("friends-data-fetched");
      socket.off('error');
    };
  }, [socket, userId, setChatFriends]);

  const handleSelect = (data) => {
    dispatch({ type: "CHANGE_USER", payload: data });
    console.log(chatData);
  };

  useEffect(() => {
    if (chatData.chatId !== null) {
      socket.emit('fetch-messages', { chatId: chatData.chatId });
    }
  }, [chatData, socket]);

  return (
    <div className='chats'>
      {isLoading ? (
        <p>Loading friends...</p> // Show loading state
      ) : chatFirends.length === 0 ? (
        <p>No friends available</p> // Empty state handling
      ) : (
        chatFirends.map((data) => {
          return (
            <div className="userInfo" key={data._id} onClick={() => handleSelect(data)}>
              <img src={data.profilePic} alt="" />
              <div className="userChatInfo">
                <span>{data.username}</span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Chats;
