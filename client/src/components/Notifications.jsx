import React, { useContext } from "react";
import "../styles/Notifications.css";
import { RxCross2 } from "react-icons/rx";
import { GeneralContext } from "../context/GeneralContextProvider";

const Notifications = () => {
    const { isNotificationsOpen, setNotificationsOpen } = useContext(GeneralContext);

    return (
        <>
            <div
                className={`notificationsModalBg ${isNotificationsOpen ? 'show' : 'hide'}`}
            >
                <div className="notificationsContainer">
                    <RxCross2
                        className="closeNotifications"
                        onClick={() => setNotificationsOpen(false)}
                        style={{
                            fontSize: "1.5rem",
                            color: "#333",
                            cursor: "pointer",
                            position: "absolute",
                            top: "15px",
                            right: "15px",
                        }}
                    />
                    <h2 className="notificationsTitle">Notifications</h2>
                    <hr className="notificationsHr" />

                    <div className="notificationsBody">
                        {/* Dynamic rendering of notifications */}
                        <p style={{ fontSize: "1rem", textAlign: "center", color: "#888" }}>
                            No new notifications
                        </p>
                        {/* Example notifications */}
                        {<ul>
                            <li>New message from John</li>
                            <li>New like on your post</li>
                        </ul>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notifications;
