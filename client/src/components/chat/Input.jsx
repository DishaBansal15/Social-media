import React, { useContext, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase';

const Input = () => {
  const { socket, chatData } = useContext(GeneralContext);
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const userId = localStorage.getItem('userId');

  // Check file validity (optional but recommended)
  const validateFile = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB max file size
    const supportedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4']; // Supported types

    if (file.size > maxSize) {
      alert('File is too large. Please select a file under 5MB.');
      return false;
    }

    if (!supportedTypes.includes(file.type)) {
      alert('Invalid file type. Please upload an image or video.');
      return false;
    }

    return true;
  };

  const handleSend = async () => {
    if (text.trim() === '' && !file) return; // Don't send empty messages

    if (file && !validateFile(file)) {
      return; // Exit if the file is invalid
    }

    if (file) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          console.error('File upload error:', error);
          alert('Failed to upload the file.');
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            try {
              const date = new Date();
              await socket.emit('new-message', {
                chatId: chatData.chatId,
                id: uuid(),
                text: text,
                file: downloadURL,
                senderId: userId,
                date: date,
              });
              setUploadProgress(null);
              setText('');
              setFile(null);
            } catch (err) {
              console.error('Message send error:', err);
              alert('Failed to send the message.');
            }
          });
        }
      );
    } else {
      const date = new Date();
      await socket.emit('new-message', {
        chatId: chatData.chatId,
        id: uuid(),
        text: text,
        file: '',
        senderId: userId,
        date: date,
      });
      setText('');
    }
  };

  return (
    <div className='input'>
      <input
        type='text'
        placeholder='Type something...'
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className='send'>
        <input
          type='file'
          style={{ display: 'none' }}
          id='file'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor='file' style={{ display: 'flex' }}>
          <BiImageAdd />
          <p style={{ fontSize: '12px' }}>
            {uploadProgress ? Math.floor(uploadProgress) + '%' : ''}
          </p>
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
