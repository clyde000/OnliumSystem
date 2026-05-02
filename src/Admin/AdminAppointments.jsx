import { useState } from "react";
import "./styles/dashboardadmin.css";

const INITIAL_APPOINTMENTS = [
  { id: 1, studentId: "ONLS-2025-00124", name: "Casipong, Clyde", date: "2026-04-18", time: "09:00" },
  { id: 2, studentId: "ONLS-2026-00087", name: "Ymbong, Hope", date: "2026-04-18", time: "11:00" },
  { id: 3, studentId: "ONLS-2025-00211", name: "Manteza, Carlo John", date: "2026-04-19", time: "10:00" },
  { id: 4, studentId: "ONLS-2025-00098", name: "Suson, Yanzie", date: "2026-04-20", time: "14:00" },
  { id: 5, studentId: "ONLS-2025-00201", name: "Parusa, Rheza", date: "2026-04-21", time: "09:30" },
];

function formatTime(t) {
  if (!t) return "";
  const [h, m] = t.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ studentId: "", name: "", date: "", time: "" });

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function handleAdd() {
    if (!form.studentId || !form.name || !form.date || !form.time) {
      showToast("Please fill in all required fields.", "error"); return;
    }
    setAppointments([...appointments, { ...form, id: Date.now() }]);
    setShowForm(false);
    setForm({ studentId: "", name: "", date: "", time: "" });
    showToast("Appointment added!");
  }

  function handleDelete(id) {
    setAppointments(appointments.filter(a => a.id !== id));
    showToast("Appointment removed.", "error");
  }

  const filtered = appointments.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) || a.studentId.toLowerCase().includes(search.toLowerCase())
  );

  const counts = {
    All: appointments.length,
  };

  return (
    <div className="dashboard">

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", top: 24, right: 24, zIndex: 9999, padding: "14px 20px", borderRadius: 10, background: toast.type === "error" ? "#fef2f2" : "#f0fdf4", border: `1px solid ${toast.type === "error" ? "#fca5a5" : "#86efac"}`, color: toast.type === "error" ? "#dc2626" : "#16a34a", fontSize: 13, fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
          {toast.type === "error" ? "✕" : "✓"} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)", borderRadius: 16, padding: "24px 32px", marginBottom: 24, color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Appointment</h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, opacity: 0.85 }}>Walk-In · Cashier Office · Tuition Payment</p>
        </div>
        <button onClick={() => setShowForm(true)} style={{ padding: "10px 20px", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
          + Add Appointment
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginBottom: 24, maxWidth: 200 }}>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px 20px" }}>
          <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Total</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#3b82f6" }}>{counts.All}</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "8px 14px", flex: 1, maxWidth: 300 }}>
          <svg width="14" height="14" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input placeholder="Search by name or ID..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: "none", outline: "none", fontSize: 13, width: "100%", background: "transparent" }} />
        </div>
        <span style={{ fontSize: 12, color: "#94a3b8", marginLeft: "auto" }}>{filtered.length} appointment{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f8fafc" }}>
              <tr>
                {["DATE", "TIME", "STUDENT", "STUDENT ID", "LOCATION", "ACTIONS"].map(h => (
                  <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #e2e8f0", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0
                ? <tr><td colSpan={7} style={{ textAlign: "center", color: "#94a3b8", padding: 40 }}>No appointments found.</td></tr>
                : filtered.map((a, i) => {
                  return (
                    <tr key={a.id} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", borderRadius: 8, padding: "6px 10px", textAlign: "center", display: "inline-block", color: "#fff", minWidth: 44 }}>
                          <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1 }}>{a.date.split("-")[2]}</div>
                          <div style={{ fontSize: 9, fontWeight: 600, opacity: 0.9 }}>{new Date(a.date).toLocaleString("en", { month: "short" }).toUpperCase()}</div>
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "#475569", fontWeight: 600 }}>{formatTime(a.time)}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{a.name}</td>
                      <td style={{ padding: "14px 16px", fontSize: 12, color: "#94a3b8" }}>{a.studentId}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "#475569" }}>Cashier Office</td>
                      <td style={{ padding: "14px 16px" }}>
                        <button onClick={() => handleDelete(a.id)} style={{ padding: "5px 10px", background: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 600 }}>✕</button>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, width: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", margin: "0 0 6px" }}>Add Walk-In Appointment</h3>
            <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 20 }}>Walk-In · Cashier Office · Tuition Payment</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Student ID *", field: "studentId", placeholder: "e.g. ONLS-2025-00124" },
                { label: "Student Name *", field: "name", placeholder: "e.g. Casipong, Clyde" },
              ].map(({ label, field, placeholder }) => (
                <div key={field}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#475569", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</label>
                  <input value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} placeholder={placeholder} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#475569", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Date *</label>
                  <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#475569", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Time *</label>
                  <input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>


            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: 12, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Cancel</button>
              <button onClick={handleAdd} style={{ flex: 1, padding: 12, background: "#3b82f6", border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Add Appointment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
