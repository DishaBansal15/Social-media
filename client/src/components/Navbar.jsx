import React, { useContext } from "react";
import { BiHomeAlt } from "react-icons/bi";
import { BsChatSquareText } from "react-icons/bs";
import { CgAddR } from "react-icons/cg";
import { TbNotification } from "react-icons/tb";
import navProfile from "../images/VibeZone.jpg"; // Default profile image
import { GeneralContext } from "../context/GeneralContextProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const {
    isCreatPostOpen,
    setIsCreatePostOpen,
    setIsCreateStoryOpen,
    isNotificationsOpen,
    setNotificationsOpen,
  } = useContext(GeneralContext);

  const navigate = useNavigate();
  const profilePic = localStorage.getItem("profilePic") || navProfile;
  const userId = localStorage.getItem("userId");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        bottom: 0,
        zIndex: 1000,
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {/* Home Button */}
      <BiHomeAlt
        aria-label="Home"
        style={{
          fontSize: "1.8rem",
          color: "#333",
          cursor: "pointer",
          transition: "color 0.3s",
        }}
        onClick={() => navigate("/")}
        onMouseOver={(e) => (e.target.style.color = "#007bff")}
        onMouseOut={(e) => (e.target.style.color = "#333")}
      />

      {/* Chat Button */}
      <BsChatSquareText
        aria-label="Chat"
        style={{
          fontSize: "1.8rem",
          color: "#333",
          cursor: "pointer",
          transition: "color 0.3s",
        }}
        onClick={() => navigate("/chat")}
        onMouseOver={(e) => (e.target.style.color = "#007bff")}
        onMouseOut={(e) => (e.target.style.color = "#333")}
      />

      {/* Create Post Button */}
      <CgAddR
        aria-label="Create Post"
        style={{
          fontSize: "2rem",
          color: "#007bff",
          cursor: "pointer",
          transition: "color 0.3s",
        }}
        onClick={() => {
          setIsCreatePostOpen(!isCreatPostOpen);
          setIsCreateStoryOpen(false);
        }}
        onMouseOver={(e) => (e.target.style.color = "#0056b3")}
        onMouseOut={(e) => (e.target.style.color = "#007bff")}
      />

      {/* Notifications Button */}
      <TbNotification
        aria-label="Notifications"
        style={{
          fontSize: "1.8rem",
          color: "#333",
          cursor: "pointer",
          transition: "color 0.3s",
        }}
        onClick={() => setNotificationsOpen(!isNotificationsOpen)}
        onMouseOver={(e) => (e.target.style.color = "#007bff")}
        onMouseOut={(e) => (e.target.style.color = "#333")}
      />

      {/* Profile Picture */}
      <img
        src={profilePic}
        alt="Profile"
        aria-label="Profile"
        style={{
          height: "40px",
          width: "40px",
          borderRadius: "50%",
          objectFit: "cover",
          cursor: "pointer",
          transition: "transform 0.3s",
        }}
        onClick={() => navigate(`/profile/${userId}`)}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
      />
    </div>
  );
};

export default Navbar;
