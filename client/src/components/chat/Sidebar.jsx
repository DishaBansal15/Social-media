import React from 'react';
import Search from './Search';
import Chats from './Chats';
// import Navbar from './Navbar'; // Uncomment if you want to include a Navbar component

const Sidebar = () => {
  const userId = localStorage.getItem('userId'); // Check if the user is logged in

  return (
    <div className='sidebar'>
      {/* Optional Navbar */}
      {/* {userId && <Navbar />} */}

      {/* Conditional rendering of Sidebar content */}
      {userId ? (
        <>
          <Search />
          <Chats />
        </>
      ) : (
        <div className="welcomeMessage">
          <h3>Welcome! Please log in to start chatting.</h3>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
