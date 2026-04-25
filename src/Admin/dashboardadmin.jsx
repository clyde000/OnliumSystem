import "./dashboardadmin.css";

const stats = [
  { label: "Total Students", value: "1,248" },
  { label: "Enrolled", value: "873" },
  { label: "Pending Applications", value: "127" },
  { label: "Appointments Today", value: "18" },
];

const recentActivity = [
  { name: "Ehron Regodo", action: "Complete Enrollment - BSIT 2nd year", time: "2m ago" },
  { name: "Yanzie Suson", action: "uploaded requirements - pending review", time: "14m ago" },
  { name: "Admin", action: 'published bulletin "Enrollment deadline extended"', time: "1hr ago" },
  { name: "Requirements rejected", action: "for ONLS-2025-00098 - incomplete docs", time: "2hr ago" },
  { name: "Walk-in appointment", action: "assigned to Clyde Casipong - Apr 18, 9AM", time: "3hr ago" },
];

const pendingReview = [
  { initials: "MD", color: "#f97316", name: "Manteza, Dianne", program: "BSIT - Requirements upload" },
  { initials: "SJ", color: "#eab308", name: "Surigao, Jessa", program: "BSCS - Requirements upload" },
  { initials: "PR", color: "#8b5cf6", name: "Parusa, Rheza", program: "BSECE - Requirements upload" },
  { initials: "YF", color: "#3b82f6", name: "Ymbong, Faith", program: "BSIT - Requirements upload" },
];

const appointments = [
  { date: "18", month: "APR", name: "Casipong, Clyde", type: "Tuition", mode: "Walk-In", location: "Cashier Office", id: "ONLS-2025-00124", status: "review" },
  { date: "18", month: "APR", name: "Ymbong, Hope", type: "Registrar", mode: "Pickup", location: "Registrar Office", id: "ONLS-2026-00087", status: "urgent" },
  { date: "19", month: "APR", name: "Manteza, Carlo John", type: "Tuition", mode: "Walk-In", location: "Cashier Office", id: "ONLS-2025-00211", status: "review" },
];

const initials = (name) => name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase();

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="page-banner">
        <h1>Dashboard</h1>
        <span className="banner-sub">SY 2026</span>
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
              {pendingReview.map((r, i) => (
                <div key={i} className="review-item">
                  <div className="review-avatar" style={{ background: r.color }}>{r.initials}</div>
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
              {appointments.map((a, i) => (
                <div key={i} className="appt-item">
                  <div className="appt-date">
                    <span className="appt-day">{a.date}</span>
                    <span className="appt-month">{a.month}</span>
                  </div>
                  <div className="appt-info">
                    <p className="appt-name">{a.name} • {a.type}</p>
                    <p className="appt-sub">{a.mode} · {a.location}</p>
                    <p className="appt-id">{a.id}</p>
                  </div>
                  <button className={`btn btn-sm ${a.status === "urgent" ? "btn-urgent" : "btn-primary"}`}>
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