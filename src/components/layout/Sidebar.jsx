import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside style={{ padding: 16, borderRight: "1px solid #eee", minWidth: 200 }}>
      <h3>Sidebar</h3>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <NavLink to="/" end style={({ isActive }) => ({ color: isActive ? "#2544d4" : undefined })}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/enrollment" style={({ isActive }) => ({ color: isActive ? "#2544d4" : undefined })}>
              Enrollment
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" style={({ isActive }) => ({ color: isActive ? "#2544d4" : undefined })}>
              Dashboard
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
