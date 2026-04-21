import "./Topbar.css";

export default function Topbar() {
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

      <div className="profile-chip">
        <div className="avatar">RR</div>
        <div>
          <div className="profile-name">Ron Regodo</div>
          <div className="profile-id">ONLS-2025-00124</div>
        </div>
      </div>
    </div>
  );
}