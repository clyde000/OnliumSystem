import { useState } from "react";
import "./styles/sidebar.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard",                          icon: "dashboard",    to: "/admin" },
  { label: "Student Management",                 icon: "students",     to: "/admin/students" },
  { label: "Study Load & Curriculum Management", icon: "curriculum",   to: "/admin/curriculum" },
  { label: "Resource Tab",                       icon: "resources",    to: "/admin/resources" },
  { label: "Bulletin",                           icon: "bulletin",     to: "/admin/bulletin" },
  { label: "Appointment",                        icon: "appointments", to: "/admin/appointments" },
];

const getIcon = (name) => {
  const icons = {
    dashboard: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    students: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    curriculum: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    resources: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    bulletin: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
    appointments: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    logout: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
    ),
  };
  return icons[name] || null;
};

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(
    location.pathname.startsWith("/admin/students") ? "Student Management" : null
  );

  const handleLogout = () => {
    localStorage.removeItem("onlium_current_user");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-logo">ONLIUM</span>
        <span className="sidebar-sub">Acad. Data · SY 2026</span>
      </div>

      <nav className="sidebar-nav">
        <p className="sidebar-section">Main Menu</p>
        {navItems.map((item) =>
          item.sub ? (
            <div key={item.to}>
              <button
                className={`nav-item nav-item-btn${location.pathname.startsWith(item.to) ? " active" : ""}`}
                onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
              >
                <span className="nav-icon">{getIcon(item.icon)}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
              </button>
              <div className={`sub-menu${openMenu === item.label ? " open" : ""}`}>
                <div className="sub-menu-header">
                  <span className="nav-icon">{getIcon(item.icon)}</span>
                  {item.label}
                </div>
                {item.sub.map(s => (
                  <NavLink
                    key={s.label}
                    to={s.to}
                    state={{ tab: s.tab }}
                    className={({ isActive }) => `sub-item${isActive ? " active" : ""}`}
                  >
                    {s.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
            >
              <span className="nav-icon">{getIcon(item.icon)}</span>
              {item.label}
            </NavLink>
          )
        )}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <span className="nav-icon">{getIcon("logout")}</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
