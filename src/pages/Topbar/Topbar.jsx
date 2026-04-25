import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Topbar.css";

const notifications = [
  {
    id: 1,
    title: "Document rejected — action required",
    message: "Your clearance form was returned by the admin.",
    time: "Today, 8:14 AM",
    type: "urgent"
  },
  {
    id: 2,
    title: "Enrollment deadline approaching",
    message: "Complete your enrollment before April 15, 2025.",
    time: "Yesterday, 3:00 PM",
    type: "warning"
  },
  {
    id: 3,
    title: "Registration form received",
    message: "Your registration was successfully verified.",
    time: "Apr 1, 11:22 AM",
    type: "success"
  }
];

export default function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ firstName: "", lastName: "", email: "" });
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userJson = localStorage.getItem('onlium_current_user');
    if (userJson) {
      const user = JSON.parse(userJson);
      setCurrentUser({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || ""
      });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = () => {
    const first = currentUser.firstName?.charAt(0)?.toUpperCase() || "";
    const last = currentUser.lastName?.charAt(0)?.toUpperCase() || "";
    return first + last || "??";
  };

  const getFullName = () => {
    if (currentUser.firstName && currentUser.lastName) {
      return `${currentUser.firstName} ${currentUser.lastName}`;
    }
    return currentUser.firstName || currentUser.lastName || "Guest";
  };

  const getStudentId = () => {
    // Generate a student ID from email or use stored one if available
    return "ONLS-2025-00124";
  };

  const handleNotificationClick = (id) => {
    setIsOpen(false);
    navigate("/student/notifications");
  };

  return (
    <div className="topbar">
      <div className="search-bar">
        <svg
          className="search-icon"
          width="15"
          height="15"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8" strokeWidth="2" />
          <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input placeholder="Search subjects, resources..." />
      </div>

      <div className="notification-dropdown-container" ref={dropdownRef}>
        <button 
          className="notification-btn" 
          aria-label="Notifications"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h16a1 1 0 00.707-1.707L20 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
          <span className="notification-badge"></span>
        </button>

        {isOpen && (
          <div className="notification-dropdown">
            <div className="notification-dropdown-header">
              <span>Notifications</span>
              <button className="view-all-btn" onClick={() => handleNotificationClick()}>
                View all
              </button>
            </div>
            <div className="notification-dropdown-list">
              {notifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`notification-dropdown-item ${notif.type}`}
                  onClick={() => handleNotificationClick(notif.id)}
                >
                  <div className="notification-dot"></div>
                  <div className="notification-content">
                    <p className="notification-title">{notif.title}</p>
                    <p className="notification-message">{notif.message}</p>
                    <span className="notification-time">{notif.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="profile-chip">
        <div className="avatar">{getInitials()}</div>
        <div>
          <div className="profile-name">{getFullName()}</div>
          <div className="profile-id">{getStudentId()}</div>
        </div>
      </div>
    </div>
  );
}