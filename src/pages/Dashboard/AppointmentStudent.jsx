import { useState } from "react";
import "./AppointmentStudent.css";
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
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
      <div className="main">
        <Topbar />
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

            {/* Info Banner */}
            <div style={{ 
              background: "#eff6ff", 
              border: "1px solid #bfdbfe", 
              borderRadius: 12, 
              padding: 16, 
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 12
            }}>
              <svg width="20" height="20" fill="none" stroke="#2563eb" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
              <p style={{ fontSize: 14, color: "#1d4ed8", margin: 0, lineHeight: 1.5 }}>
                Appointment on hold — will be scheduled after admin approves your requirements.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24 }}>
              {/* Left - Available Slots */}
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 24 }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#2563eb", margin: "0 0 20px 0" }}>
                  Available Slots
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {slots.map((slot) => {
                    const statusStyle = getStatusStyle(slot.status);
                    const isSelected = selectedSlot?.id === slot.id;
                    const isDisabled = slot.status === "Full";
                    
                    return (
                      <div
                        key={slot.id}
                        onClick={() => !isDisabled && setSelectedSlot(slot)}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: 16,
                          borderRadius: 12,
                          border: isSelected ? "2px solid #2563eb" : `1px solid ${statusStyle.border}`,
                          background: isSelected ? "#eff6ff" : statusStyle.bg,
                          cursor: isDisabled ? "not-allowed" : "pointer",
                          opacity: isDisabled ? 0.6 : 1,
                          transition: "all 0.2s"
                        }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>
                            {slot.day}, {slot.date}
                          </span>
                          <span style={{ fontSize: 13, color: "#64748b" }}>
                            {slot.time}
                          </span>
                        </div>
                        <span style={{ 
                          padding: "4px 12px", 
                          borderRadius: 20, 
                          fontSize: 12, 
                          fontWeight: 600, 
                          color: statusStyle.color,
                          background: "#fff",
                          border: `1px solid ${statusStyle.border}`
                        }}>
                          {slot.status}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={handleBookSlot}
                  disabled={!selectedSlot}
                  style={{
                    width: "100%",
                    marginTop: 20,
                    padding: "14px 24px",
                    background: selectedSlot ? "#2563eb" : "#94a3b8",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: selectedSlot ? "pointer" : "not-allowed",
                    transition: "all 0.2s"
                  }}
                >
                  Book a slot
                </button>
              </div>

              {/* Right - Status & Payment */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Current Status */}
                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 20 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#2563eb", margin: "0 0 16px 0" }}>
                    Current Status
                  </h3>
                  
                  <div style={{ 
                    padding: 12, 
                    background: "#fffbeb", 
                    border: "1px solid #fcd34d", 
                    borderRadius: 8,
                    marginBottom: 12
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#d97706" }}>
                      Waiting for admin approval
                    </span>
                  </div>
                  
                  <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.6 }}>
                    Your payment appointment will be scheduled once your requirements are approved. You'll receive an email/SMS notification.
                  </p>
                </div>

                {/* Appointment Payment */}
                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 20 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#2563eb", margin: "0 0 16px 0" }}>
                    Appointment Payment
                  </h3>
                  
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    padding: "12px 16px",
                    background: "#f8fafc",
                    borderRadius: 10,
                    border: "1px solid #e2e8f0"
                  }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", margin: "0 0 2px 0" }}>
                        Tuition walk-in
                      </p>
                      <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>
                        Payment pending
                      </p>
                    </div>
                    <span style={{ 
                      padding: "4px 12px", 
                      background: "#f0fdf4", 
                      color: "#16a34a", 
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 600,
                      border: "1px solid #86efac"
                    }}>
                      Pending
                    </span>
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
