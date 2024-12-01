import React, { useContext, useState } from "react";
import { GeneralContext } from "../context/GeneralContextProvider";
import { RxCross2 } from "react-icons/rx";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.js";
import { v4 as uuidv4 } from "uuid";

const CreateStory = () => {
    const { socket, isCreateStoryOpen, setIsCreateStoryOpen } =
        useContext(GeneralContext);

    const [storyType, setStoryType] = useState("photo");
    const [storyDescription, setStoryDescription] = useState("");
    const [storyFile, setStoryFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(null);

    const resetForm = () => {
        setStoryDescription("");
        setStoryFile(null);
        setUploadProgress(null);
    };

    const handleStoryUpload = async (e) => {
        e.preventDefault();

        if (!storyFile || !storyDescription) {
            alert("Please provide both a file and a description!");
            return;
        }

        const storageRef = ref(storage, uuidv4());
        const uploadTask = uploadBytesResumable(storageRef, storyFile);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                setUploadProgress(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            (error) => {
                console.error("Upload failed:", error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    try {
                        socket.emit("create-new-story", {
                            userId: localStorage.getItem("userId"),
                            username: localStorage.getItem("username"),
                            userPic: localStorage.getItem("profilePic"),
                            fileType: storyType,
                            file: downloadURL,
                            text: storyDescription,
                        });
                        resetForm();
                        setIsCreateStoryOpen(false);
                    } catch (err) {
                        console.error("Error sending story to socket:", err);
                    }
                });
            }
        );
    };

    return (
        <div
            style={{
                display: isCreateStoryOpen ? "flex" : "none",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                zIndex: 999,
            }}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    width: "90%",
                    maxWidth: "450px",
                    borderRadius: "15px",
                    padding: "20px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                    textAlign: "center",
                }}
            >
                <RxCross2
                    style={{
                        position: "absolute",
                        top: "15px",
                        right: "15px",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                        color: "#333",
                    }}
                    onClick={() => {
                        resetForm();
                        setIsCreateStoryOpen(false);
                    }}
                />

                <h2 style={{ marginBottom: "20px", color: "#333", fontWeight: "700" }}>
                    Add New Story
                </h2>
                <hr
                    style={{
                        border: "none",
                        borderTop: "2px solid #eee",
                        marginBottom: "20px",
                    }}
                />

                <form onSubmit={handleStoryUpload}>
                    <select
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "15px",
                            borderRadius: "8px",
                            border: "1px solid #ddd",
                            fontSize: "1rem",
                        }}
                        onChange={(e) => setStoryType(e.target.value)}
                    >
                        <option value="photo">Photo</option>
                        <option value="video">Video</option>
                    </select>

                    <div
                        style={{
                            marginBottom: "15px",
                            padding: "10px",
                            border: "2px dashed #aaa",
                            borderRadius: "8px",
                            textAlign: "center",
                            color: "#777",
                            cursor: "pointer",
                        }}
                    >
                        <input
                            type="file"
                            style={{
                                display: "block",
                                width: "100%",
                                cursor: "pointer",
                            }}
                            onChange={(e) => setStoryFile(e.target.files[0])}
                        />
                    </div>

                    <textarea
                        placeholder="Add a description..."
                        value={storyDescription}
                        onChange={(e) => setStoryDescription(e.target.value)}
                        style={{
                            width: "100%",
                            height: "80px",
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #ddd",
                            fontSize: "1rem",
                            resize: "none",
                            marginBottom: "15px",
                        }}
                    />

                    {uploadProgress ? (
                        <button
                            style={{
                                width: "100%",
                                padding: "10px",
                                backgroundColor: "#ccc",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "1rem",
                                cursor: "not-allowed",
                            }}
                            disabled
                        >
                            Uploading... {Math.round(uploadProgress)}%
                        </button>
                    ) : (
                        <button
                            type="submit"
                            style={{
                                width: "100%",
                                padding: "10px",
                                backgroundColor: "#1f9bff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "1rem",
                                fontWeight: "600",
                                cursor: "pointer",
                            }}
                        >
                            Upload
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CreateStory;
