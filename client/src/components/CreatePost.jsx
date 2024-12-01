import React, { useContext, useState } from "react";
import { GeneralContext } from "../context/GeneralContextProvider";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.js";
import { v4 as uuidv4 } from "uuid";

const CreatePost = () => {
    const { isCreatPostOpen, setIsCreatePostOpen } = useContext(GeneralContext);
    const [postType, setPostType] = useState("photo");
    const [postDescription, setPostDescription] = useState("");
    const [postLocation, setPostLocation] = useState("");
    const [postFile, setPostFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState();

    const handlePostUpload = async (e) => {
        e.preventDefault();
        if (!postFile) return alert("Please select a file to upload!");

        const storageRef = ref(storage, uuidv4());
        const uploadTask = uploadBytesResumable(storageRef, postFile);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            },
            (error) => {
                console.error(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    try {
                        const inputs = {
                            userId: localStorage.getItem("userId"),
                            userName: localStorage.getItem("username"),
                            userPic: localStorage.getItem("profilePic"),
                            fileType: postType,
                            file: downloadURL,
                            description: postDescription,
                            location: postLocation,
                            comments: { "New user": "This is my first comment" },
                        };

                        await axios.post("http://localhost:6001/createPost", inputs);
                        setIsCreatePostOpen(false);
                        resetForm();
                    } catch (err) {
                        console.error(err);
                    }
                });
            }
        );
    };

    const resetForm = () => {
        setPostDescription("");
        setPostLocation("");
        setPostFile(null);
        setUploadProgress(null);
    };

    const handleDragOver = (e) => e.preventDefault();
    const handleDrop = (e) => {
        e.preventDefault();
        setPostFile(e.dataTransfer.files[0]);
    };

    return (
        <>
            {isCreatPostOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(255, 192, 203, 0.8)", // Pink overlay
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: "20px",
                            width: "90%",
                            maxWidth: "500px",
                            padding: "30px",
                            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
                            textAlign: "center",
                            position: "relative",
                        }}
                    >
                        {/* Close Button */}
                        <RxCross2
                            style={{
                                position: "absolute",
                                top: "15px",
                                right: "15px",
                                fontSize: "1.8rem",
                                color: "#FF69B4", // Bright pink
                                cursor: "pointer",
                            }}
                            onClick={() => setIsCreatePostOpen(false)}
                        />

                        {/* Title */}
                        <h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#FF69B4" }}>
                            Create Your Vibe ✨
                        </h2>

                        {/* Form */}
                        <form>
                            {/* Post Type */}
                            <select
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    marginBottom: "15px",
                                    borderRadius: "10px",
                                    border: "1px solid #ddd",
                                    fontSize: "1.1rem",
                                    backgroundColor: "#FFC0CB",
                                    color: "#333",
                                }}
                                onChange={(e) => setPostType(e.target.value)}
                            >
                                <option value="photo">Photo</option>
                                <option value="video">Video</option>
                            </select>

                            {/* File Upload */}
                            <div
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                style={{
                                    border: "2px dashed #FF69B4",
                                    borderRadius: "10px",
                                    padding: "20px",
                                    textAlign: "center",
                                    marginBottom: "15px",
                                    cursor: "pointer",
                                }}
                            >
                                <AiOutlineCloudUpload size={50} color="#FF69B4" />
                                <p style={{ margin: "10px 0", color: "#555" }}>
                                    Drag & drop your file here or click to upload
                                </p>
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={(e) => setPostFile(e.target.files[0])}
                                />
                            </div>
                            {postFile && <p style={{ color: "#555" }}>{postFile.name}</p>}

                            {/* Description */}
                            <textarea
                                placeholder="Add a description..."
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    marginBottom: "15px",
                                    borderRadius: "10px",
                                    border: "1px solid #ddd",
                                    fontSize: "1.1rem",
                                    resize: "none",
                                }}
                                rows={3}
                                value={postDescription}
                                onChange={(e) => setPostDescription(e.target.value)}
                            />

                            {/* Location */}
                            <input
                                type="text"
                                placeholder="Add a location..."
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    marginBottom: "15px",
                                    borderRadius: "10px",
                                    border: "1px solid #ddd",
                                    fontSize: "1.1rem",
                                }}
                                value={postLocation}
                                onChange={(e) => setPostLocation(e.target.value)}
                            />

                            {/* Upload Button */}
                            <button
                                onClick={handlePostUpload}
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    backgroundColor: "#FF69B4",
                                    color: "#fff",
                                    borderRadius: "10px",
                                    fontSize: "1.2rem",
                                    cursor: "pointer",
                                    border: "none",
                                }}
                                disabled={uploadProgress && uploadProgress < 100}
                            >
                                {uploadProgress
                                    ? `Uploading... ${Math.round(uploadProgress)}%`
                                    : "Upload Post"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreatePost;
