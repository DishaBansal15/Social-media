import React, { useContext, useEffect, useRef } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';

const Message = ({ message }) => {
  const { chatData } = useContext(GeneralContext);
  const ref = useRef();
  const userId = localStorage.getItem('userId');

  // Function to format the date and time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours < 12 ? 'AM' : 'PM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes; // Ensure two digits for minutes
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div ref={ref}>
      <div className={`message ${message.senderId === userId ? 'owner' : ''}`}>
        <div className="messageInfo">
          <img
            src={message.senderId === userId ? localStorage.getItem('profilePic') : chatData.user.profilePic}
            alt="sender"
          />
          <span>{formatTime(message.date)}</span>
        </div>
        <div className="messageContent">
          <p>{message.text}</p>
          {message.file && (
            message.file.endsWith('.mp4') || message.file.endsWith('.webm') ? (
              <video className="messageFile" controls>
                <source src={message.file} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img className="messageFile" src={message.file} alt="message" onError={(e) => e.target.src = '/path/to/placeholder-image.png'} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
