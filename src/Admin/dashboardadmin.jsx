import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/dashboardadmin.css";

const STUDENTS_COUNT = 8;

const recentActivity = [
  { name: "Ehron Regodo", action: "Complete Enrollment - BSIT 2nd year", time: "2m ago" },
  { name: "Yanzie Suson", action: "uploaded requirements - pending review", time: "14m ago" },
  { name: "Admin", action: 'published bulletin "Enrollment deadline extended"', time: "1hr ago" },
  { name: "Requirements rejected", action: "for ONLS-2025-00098 - incomplete docs", time: "2hr ago" },
  { name: "Walk-in appointment", action: "assigned to Clyde Casipong - Apr 18, 9AM", time: "3hr ago" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    { label: "Total Students", value: STUDENTS_COUNT },
    { label: "Enrolled", value: 0 },
    { label: "Pending Applications", value: 0 },
    { label: "Appointments Today", value: 0 },
  ]);
  const [pendingReview, setPendingReview] = useState([]);

  useEffect(() => {
    const submissions = JSON.parse(localStorage.getItem("onlium_submissions") || "[]");
    const appointments = JSON.parse(localStorage.getItem("onlium_appointments") || "[]");
    const today = new Date().toISOString().split("T")[0];
    const enrolled = submissions.filter(s => s.approved === true).length;
    const pending = submissions.filter(s => !s.approved && s.status !== "Rejected");
    const apptToday = appointments.filter(a => a.date === today).length;
    setStats([
      { label: "Total Students", value: STUDENTS_COUNT },
      { label: "Enrolled", value: enrolled },
      { label: "Pending Applications", value: pending.length },
      { label: "Appointments Today", value: apptToday },
    ]);
    setPendingReview(pending.map(s => ({
      email: s.email,
      name: s.studentName || s.email,
      program: s.summary?.find(r => r.label === "Program")?.value || "—",
      initials: (s.studentName || "?").split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase(),
    })));
  }, []);

  return (
    <div className="dashboard">

      {/* Banner */}
      <div style={{
        background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
        borderRadius: 16,
        padding: "28px 32px",
        marginBottom: 24,
        color: "#fff",
      }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 6px" }}>Admin Dashboard</h1>
        <p style={{ fontSize: 13, opacity: 0.85, margin: 0 }}>Welcome back, Admin · Manage students, enrollment, and system activity</p>
      </div>
      <div className="stats-row">
        {stats.map(s => (
          <div key={s.label} className="card stat-card">
            <p className="stat-label">{s.label}</p>
            <p className="stat-value">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="dash-grid">
        <div className="card activity-card">
          <p className="section-title">Recent Activity</p>
          <div className="activity-list">
            {recentActivity.map((a, i) => (
              <div key={i} className="activity-item">
                <div>
                  <span className="activity-name">{a.name}</span>{" "}
                  <span className="activity-action">{a.action}</span>
                </div>
                <span className="activity-time">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-right">
          <div className="card review-card">
            <p className="section-title">Pending for Review</p>
            <div className="review-list">
              {pendingReview.length === 0 ? (
                <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", padding: "20px 0" }}>No pending applications.</p>
              ) : (
                pendingReview.map((r, i) => (
                  <div key={i} className="review-item">
                    <div className="review-avatar" style={{ background: ["#f97316","#eab308","#8b5cf6","#3b82f6"][i % 4] }}>{r.initials}</div>
                    <div className="review-info">
                      <p className="review-name">{r.name}</p>
                      <p className="review-sub">{r.program}</p>
                    </div>
                    <button className="btn btn-outline btn-sm" onClick={() => navigate("/admin/students", { state: { tab: "application", email: r.email } })}>Review</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}