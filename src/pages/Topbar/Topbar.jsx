import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import EditProfileModal from "../Profile/EditProfileModal";
import "./styles/Topbar.css";

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

export default function Topbar({ onMenuToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ firstName: "", lastName: "", email: "", yearLevel: "3rd Year", section: "BSIT-3A" });
  const [searchQuery, setSearchQuery] = useState("");
  const [enrollment, setEnrollment] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const userJson = localStorage.getItem('onlium_current_user');
      if (userJson) {
        const user = JSON.parse(userJson);
        setCurrentUser({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          yearLevel: user.yearLevel || "",
          program: user.program || "",
          studentId: user.studentId || "",
          section: user.section || "BSIT-3A",
          photo: user.photo || null,
        });
      }
      const raw = localStorage.getItem("onlium_enrollment");
      if (raw) setEnrollment(JSON.parse(raw));
    };

    loadUser();
    window.addEventListener("onlium_profile_updated", loadUser);
    const interval = setInterval(loadUser, 300);
    return () => {
      window.removeEventListener("onlium_profile_updated", loadUser);
      clearInterval(interval);
    };
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
    const raw = localStorage.getItem("onlium_current_user");
    const u = raw ? JSON.parse(raw) : currentUser;
    const first = u.firstName?.charAt(0)?.toUpperCase() || "";
    const last = u.lastName?.charAt(0)?.toUpperCase() || "";
    return first + last || "??";
  };

  const getFullName = () => {
    const raw = localStorage.getItem("onlium_current_user");
    const u = raw ? JSON.parse(raw) : currentUser;
    if (u.firstName && u.lastName) return `${u.firstName} ${u.lastName}`;
    return u.firstName || u.lastName || "Guest";
  };

  const getPhoto = () => {
    const raw = localStorage.getItem("onlium_current_user");
    const u = raw ? JSON.parse(raw) : currentUser;
    return u.photo || null;
  };

  const getStudentId = () => {
    if (!enrollment) return "Not enrolled";
    return enrollment.approved ? (currentUser?.studentId || "ONLS-2025-00124") : "Pending";
  };

  const handleNotificationClick = (id) => {
    setIsOpen(false);
    navigate("/student/notifications");
  };

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleProfileClose = () => {
    setIsProfileOpen(false);
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="hamburger-btn" onClick={onMenuToggle} aria-label="Toggle menu">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>
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
        <input
          placeholder="Search subjects, resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchQuery.trim()) {
              navigate(`/student/resources?search=${encodeURIComponent(searchQuery.trim())}`);
              setSearchQuery("");
            }
          }}
        />
      </div>

      <div className="topbar-right">
        <div className="notification-dropdown-container" ref={dropdownRef}>
          <button
            className="notification-btn"
            aria-label="Notifications"
            onClick={() => setIsOpen(!isOpen)}
          >
            <IoNotificationsOutline size={22} />
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

        <div className="profile-chip" onClick={handleProfileToggle} style={{ cursor: 'pointer' }}>
          <div className="avatar-container">
            {getPhoto()
              ? <img src={getPhoto()} alt="avatar" style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid #e5e9f0" }} />
              : <div className="avatar">{getInitials()}</div>
            }
            <div className="avatar-arrow">
              <IoIosArrowDown size={10} />
            </div>
          </div>
          <div>
            <div className="profile-name">{getFullName()}</div>
            <div className="profile-id" style={{ color: !enrollment?.approved && enrollment ? "#ea580c" : undefined }}>{getStudentId()}</div>
          </div>
        </div>

        <EditProfileModal
          isOpen={isProfileOpen}
          onClose={handleProfileClose}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}