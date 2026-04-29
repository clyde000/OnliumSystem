import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { adminService } from "../services/adminService";
import "./dashboardadmin.css";

// Remove hardcoded data - will be fetched from API
const stats = [];
const recentActivity = [];
const pendingReview = [];
const appointments = [];

const initials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    stats: [],
    recentActivity: [],
    pendingReview: [],
    appointments: [],
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result = await adminService.getDashboard();
        if (result.success) {
          setDashboardData(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("Failed to load dashboard");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboard();
    }
  }, [user]);

  if (loading)
    return (
      <div className="dashboard">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="dashboard">
        <p>Error: {error}</p>
      </div>
    );
  return (
    <div className="dashboard">
      <div className="page-banner">
        <h1>Dashboard</h1>
        <span className="banner-sub">SY 2026</span>
      </div>

      <div className="stats-row">
        {dashboardData.stats.map((s) => (
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
            {dashboardData.recentActivity.map((a, i) => (
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
              {dashboardData.pendingReview.map((r, i) => (
                <div key={i} className="review-item">
                  <div
                    className="review-avatar"
                    style={{ background: r.color }}
                  >
                    {r.initials}
                  </div>
                  <div className="review-info">
                    <p className="review-name">{r.name}</p>
                    <p className="review-sub">{r.program}</p>
                  </div>
                  <button className="btn btn-outline btn-sm">Review</button>
                </div>
              ))}
            </div>
          </div>

          <div className="card appt-card">
            <p className="section-title">Upcoming Appointments</p>
            <div className="appt-list">
              {dashboardData.appointments.map((a, i) => (
                <div key={i} className="appt-item">
                  <div className="appt-date">
                    <span className="appt-day">{a.date}</span>
                    <span className="appt-month">{a.month}</span>
                  </div>
                  <div className="appt-info">
                    <p className="appt-name">
                      {a.name} • {a.type}
                    </p>
                    <p className="appt-sub">
                      {a.mode} · {a.location}
                    </p>
                    <p className="appt-id">{a.id}</p>
                  </div>
                  <button
                    className={`btn btn-sm ${a.status === "urgent" ? "btn-urgent" : "btn-primary"}`}
                  >
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
