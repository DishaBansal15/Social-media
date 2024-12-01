import React, { useContext, useEffect, useState } from "react";
import logoimg from "../images/vibe.jpg"; // Update this to your new logo file
import { TbSearch } from "react-icons/tb";
import { GeneralContext } from "../context/GeneralContextProvider";
import Search from "./Search";
import { useNavigate } from "react-router-dom"; // Added for navigation

const HomeLogo = () => {
  const { socket } = useContext(GeneralContext);
  const [search, setSearch] = useState("");
  const [searchedUser, setSearchedUser] = useState();
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (search.trim() === "") {
      alert("Please enter a valid search query.");
      return;
    }
    await socket.emit("user-search", { username: search.trim() });
    setSearch("");
  };

  useEffect(() => {
    const handleSearchedUser = ({ user }) => setSearchedUser(user);

    socket.on("searched-user", handleSearchedUser);
    return () => {
      socket.off("searched-user", handleSearchedUser); // Clean up listener
    };
  }, [socket]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: "white",
        borderBottom: "1px solid #f0f0f0",
        position: "sticky",
        top: "0",
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <img
        src={logoimg}
        alt="VibeZone Logo"
        style={{
          height: "40px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")} // Navigate to home page on click
      />

      {/* Search Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "#fff",
          padding: "5px 15px",
          borderRadius: "20px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <input
          type="text"
          placeholder="Search for users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            fontSize: "1rem",
            padding: "5px 0",
          }}
          aria-label="Search for users"
        />
        <TbSearch
          style={{
            fontSize: "1.5rem",
            color: "#333",
            cursor: "pointer",
            marginLeft: "10px",
          }}
          onClick={handleSearch}
          aria-label="Search"
        />
      </div>

      {/* Search Results */}
      <Search searchedUser={searchedUser} setSearchedUser={setSearchedUser} />
    </div>
  );
};

export default HomeLogo;
