import { useState } from "react";
import "./NotificationsStudent.css";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

const notifications = [
  {
    id: 1,
    title: "Document rejected — action required",
    description: "Your clearance form was returned by the admin. Please resubmit a clearer, higher-quality image of your document.",
    date: "Today, 8:14 AM",
    badge: "Document",
    badgeType: "document",
    group: "Today"
  },
  {
    id: 2,
    title: "Enrollment deadline — April 15, 2025",
    description: "Complete your enrollment before the deadline to avoid late fees. You still have 2 steps remaining.",
    date: "Yesterday, 3:00 PM",
    badge: "Deadline",
    badgeType: "deadline",
    group: "Yesterday"
  },
  {
    id: 3,
    title: "Registration form received",
    description: "Your registration form was successfully uploaded and verified by the system.",
    date: "Apr 1, 11:22 AM",
    badge: "Successful",
    badgeType: "successful",
    group: "Earlier"
  },
  {
    id: 4,
    title: "LMS notification set",
    description: "You'll receive a desktop in-app notification the moment the Moodle LMS is activated by the school.",
    date: "Mar 30, 9:00 AM",
    badge: "LMS",
    badgeType: "lms",
    group: "Earlier",
    action: "Resources"
  }
];

export default function NotificationsStudent() {
  const [activeNav, setActiveNav] = useState("Notifications");

  const handleMarkAllRead = () => {
    console.log("Mark all as read");
  };

  const handleClearAll = () => {
    console.log("Clear all");
  };

  const handleView = (id) => {
    console.log("View notification", id);
  };

  const getBadgeStyle = (type) => {
    switch (type) {
      case "document":
        return { color: "#dc2626", bg: "#fef2f2", border: "#fecaca" };
      case "deadline":
        return { color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" };
      case "successful":
        return { color: "#16a34a", bg: "#f0fdf4", border: "#86efac" };
      case "lms":
        return { color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" };
      default:
        return { color: "#64748b", bg: "#f8fafc", border: "#e2e8f0" };
    }
  };

  const groups = ["Today", "Yesterday", "Earlier"];

  return (
    <div className="portal">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
      <div className="main">
        <Topbar />
        <div className="content">
          <div style={{ padding: "28px 32px", flex: 1, maxWidth: 900, margin: "0 auto" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 24, fontWeight: 700, color: "#1e293b", margin: 0 }}>
                  Notifications
                </h1>
                <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
                  Stay updated with your enrollment status
                </p>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button 
                  onClick={handleMarkAllRead}
                  style={{
                    padding: "10px 18px",
                    background: "#fff",
                    color: "#475569",
                    border: "1px solid #e2e8f0",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  Mark all as read
                </button>
                <button 
                  onClick={handleClearAll}
                  style={{
                    padding: "10px 18px",
                    background: "#fff",
                    color: "#64748b",
                    border: "1px solid #e2e8f0",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  Clear all
                </button>
              </div>
            </div>

            {/* Notifications Card */}
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 28 }}>
              {groups.map((group, groupIndex) => {
                const groupNotifications = notifications.filter(n => n.group === group);
                if (groupNotifications.length === 0) return null;

                return (
                  <div key={group} style={{ marginBottom: groupIndex < groups.length - 1 ? 28 : 0 }}>
                    <h3 style={{ 
                      fontSize: 12, 
                      fontWeight: 700, 
                      letterSpacing: 1, 
                      textTransform: "uppercase", 
                      color: "#2563eb", 
                      margin: "0 0 16px 0",
                      paddingBottom: 8,
                      borderBottom: "1px solid #eff6ff"
                    }}>
                      {group}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {groupNotifications.map((notification) => {
                        const badgeStyle = getBadgeStyle(notification.badgeType);
                        return (
                          <div 
                            key={notification.id} 
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              gap: 16,
                              padding: 20,
                              borderRadius: 12,
                              border: "1px solid #e2e8f0",
                              background: "#fff",
                              transition: "all 0.2s",
                              cursor: "pointer"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = "#bfdbfe";
                              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = "#e2e8f0";
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              <h4 style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", margin: "0 0 8px 0" }}>
                                {notification.title}
                              </h4>
                              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5, margin: "0 0 12px 0" }}>
                                {notification.description}
                              </p>
                              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <span style={{ fontSize: 12, color: "#94a3b8" }}>{notification.date}</span>
                                <span style={{ 
                                  padding: "3px 10px", 
                                  borderRadius: 12, 
                                  fontSize: 11, 
                                  fontWeight: 600, 
                                  color: badgeStyle.color,
                                  background: badgeStyle.bg,
                                  border: `1px solid ${badgeStyle.border}`
                                }}>
                                  {notification.badge}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleView(notification.id)}
                              style={{
                                padding: "8px 20px",
                                background: "#fff",
                                color: "#475569",
                                border: "1px solid #e2e8f0",
                                borderRadius: 8,
                                fontSize: 13,
                                fontWeight: 500,
                                cursor: "pointer",
                                transition: "all 0.2s",
                                flexShrink: 0
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "#3b82f6";
                                e.currentTarget.style.color = "#3b82f6";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "#e2e8f0";
                                e.currentTarget.style.color = "#475569";
                              }}
                            >
                              {notification.action || "View"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
