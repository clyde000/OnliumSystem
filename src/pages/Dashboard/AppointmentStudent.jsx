import { useState } from "react";
import "./styles/AppointmentStudent.css";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

const slots = [
  {
    id: 1,
    day: "Mon",
    date: "Apr 7",
    time: "8:00 AM - 12:00 PM",
    status: "Available",
  },
  {
    id: 2,
    day: "Tue",
    date: "Apr 8",
    time: "1:00 PM - 5:00 PM",
    status: "Available",
  },
  {
    id: 3,
    day: "Wed",
    date: "Apr 9",
    time: "8:00 AM - 12:00 PM",
    status: "Almost full",
  },
  {
    id: 4,
    day: "Thu",
    date: "Apr 10",
    time: "-",
    status: "Full",
  },
];

export default function AppointmentStudent() {
  const [activeNav, setActiveNav] = useState("Appointments");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleBookSlot = () => {
    if (selectedSlot) {
      alert(`Appointment booked for ${selectedSlot.day}, ${selectedSlot.date}`);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Available":
        return { color: "#16a34a", bg: "#f0fdf4", border: "#86efac" };
      case "Almost full":
        return { color: "#d97706", bg: "#fffbeb", border: "#fcd34d" };
      case "Full":
        return { color: "#dc2626", bg: "#fef2f2", border: "#fecaca" };
      default:
        return { color: "#64748b", bg: "#f8fafc", border: "#e2e8f0" };
    }
  };

  return (
    <div className="portal">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} hideLogout />
      <div className="main">
        <Topbar onMenuToggle={() => setMobileOpen(!mobileOpen)} />
        <div className="content">
          <div style={{ padding: "28px 32px", flex: 1 }}>
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 24, fontWeight: 700, color: "#1e293b", margin: 0 }}>
                Appointment
              </h1>
              <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
                BS Information Technology — 2nd Year · Payment Scheduling
              </p>
            </div>

            {/* Info Banner - Enrolled Notice */}
            <div style={{ 
              background: "#f0fdf4", 
              border: "1px solid #86efac", 
              borderRadius: 12, 
              padding: 16, 
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 12
            }}>
              <svg width="20" height="20" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p style={{ fontSize: 14, color: "#15803d", margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
                You are now officially enrolled. Your study load can now be released.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24 }}>
              {/* Left - Appointment Status */}
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 24 }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#2563eb", margin: "0 0 20px 0" }}>
                  Appointment Status
                </h2>

                <div style={{ marginBottom: 16 }}>
                  <span style={{ padding: "6px 14px", background: "#f0fdf4", color: "#16a34a", borderRadius: 20, fontSize: 12, fontWeight: 700, border: "1px solid #86efac" }}>
                    Appointment available
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", gap: 8, fontSize: 13 }}>
                    <span style={{ color: "#94a3b8", minWidth: 90 }}>Signed in as</span>
                    <span style={{ fontWeight: 600, color: "#1e293b" }}>Ron Regodo</span>
                  </div>
                  <div style={{ display: "flex", gap: 8, fontSize: 13 }}>
                    <span style={{ color: "#94a3b8", minWidth: 90 }}>Email</span>
                    <span style={{ fontWeight: 500, color: "#2563eb" }}>ehron22@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* Right - Scheduled Appointment */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 20 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#2563eb", margin: "0 0 16px 0" }}>
                    Scheduled Appointment
                  </h3>

                  <div style={{ marginBottom: 14 }}>
                    <span style={{ padding: "5px 12px", background: "#f0fdf4", color: "#16a34a", borderRadius: 20, fontSize: 12, fontWeight: 700, border: "1px solid #86efac" }}>
                      Enrollment Completed
                    </span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "#94a3b8" }}>Date & Time</span>
                      <span style={{ fontWeight: 600, color: "#1e293b" }}>2026-04-30 11:27 PM</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "#94a3b8" }}>Location</span>
                      <span style={{ fontWeight: 600, color: "#1e293b", textAlign: "right", maxWidth: 160 }}>Aclc College of Mandaue</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "#94a3b8" }}>Status</span>
                      <span style={{ fontWeight: 600, color: "#16a34a" }}>Enrollment Completed</span>
                    </div>
                  </div>

                  <div style={{ marginTop: 16, padding: 12, background: "#f8fafc", borderRadius: 10, border: "1px solid #e2e8f0" }}>
                    <p style={{ fontSize: 12, color: "#64748b", margin: 0, lineHeight: 1.6 }}>
                      <span style={{ fontWeight: 600, color: "#1e293b" }}>Notes: </span>
                      Please proceed to the school cashier to pay your required downpayment for this semester and complete your enrollment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
