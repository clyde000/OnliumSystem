import "./Sidebar.css";
import { NAV_ITEMS } from "../data/navItems";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ activeNav, onNavChange }) {
  const navigate = useNavigate();

  function handleClick(item) {
    if (onNavChange) onNavChange(item.label);
    if (item.to) navigate(item.to);
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-row">
          <div className="brand-icon">ONL</div>
          <div>
            <div className="brand-name">ONLIUM</div>
            <div className="brand-sub">Student Portal</div>
          </div>
        </div>
        <span className="sy-badge">SY 2026</span>
      </div>

      <div className="sidebar-section">Main Menu</div>

      <nav>
        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            role="button"
            tabIndex={0}
            className={`nav-item ${activeNav === item.label ? "active" : ""}`}
            onClick={() => handleClick(item)}
            onKeyDown={(e) => e.key === "Enter" && handleClick(item)}
          >
            <div className="nav-left">
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </div>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </div>
        ))}
      </nav>

      <div className="sidebar-spacer" />
      <div className="logout-btn">Logout</div>
    </aside>
  );
}