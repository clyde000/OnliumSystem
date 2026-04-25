import "./topbar.css";
import { useNavigate } from "react-router-dom";

export default function TopBar({ title, subtitle }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/register/moderator");
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">{title}</h1>
        {subtitle && <span className="topbar-subtitle">{subtitle}</span>}
      </div>
      <div className="topbar-right">
        <div className="topbar-search">
          <span className="search-icon">🔍</span>
          <input type="text" className="search-input" placeholder="Search..." />
        </div>
        <div className="topbar-notification">
          <span className="notification-icon">🔔</span>
        </div>
        <div className="topbar-avatar">
          <span>AA</span>
        </div>
      </div>
    </header>
  );
}
