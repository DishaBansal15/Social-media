import React, { useContext, useEffect, useState } from 'react';
import Message from './Message';
import { GeneralContext } from '../../context/GeneralContextProvider';

const Messages = () => {
  const { socket, chatData } = useContext(GeneralContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!chatData.chatId) return;

    const handleMessagesUpdated = ({ chat }) => {
      if (chat) {
        setMessages(chat.messages);
      }
    };

    const handleNewMessage = async () => {
      socket.emit('update-messages', { chatId: chatData.chatId });
    };

    socket.on('messages-updated', handleMessagesUpdated);
    socket.on('message-from-user', handleNewMessage);

    // Fetch initial messages when chat is selected
    socket.emit('update-messages', { chatId: chatData.chatId });

    return () => {
      socket.off('messages-updated', handleMessagesUpdated);
      socket.off('message-from-user', handleNewMessage);
    };
  }, [socket, chatData.chatId]); // Only run when chatId changes

  // If no messages are fetched, load some predefined messages
  const predefinedMessages = [
    { id: 1, user: 'Admin', text: 'Hello! How can I assist you today?', timestamp: '2024-11-30T09:00:00' },
    { id: 2, user: 'You', text: 'I need help with the account setup.', timestamp: '2024-11-30T09:05:00' },
    { id: 3, user: 'Admin', text: 'Sure! Let me guide you through it.', timestamp: '2024-11-30T09:06:00' },
  ];

  // If no messages are received from the socket, show the predefined ones
  const displayMessages = messages.length === 0 ? predefinedMessages : messages;

  return (
    <div className="messages">
      {displayMessages.length === 0 ? (
        <div className="noMessages">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        displayMessages.map((message) => (
          <Message message={message} key={message.id} />
        ))
      )}
    </div>
  );
};

export default Messages;
