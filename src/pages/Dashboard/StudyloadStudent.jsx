import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

const subjects = [
  { code: "CC 101", description: "Introduction to Computing", units: 3, schedule: "Mon / Wed", time: "7:30 - 9:00 AM", room: "IT Lab 1", instructor: "Prof. Santos" },
  { code: "CC 102", description: "Programming Fundamentals", units: 3, schedule: "Mon / Wed / Fri", time: "9:00 - 10:30 AM", room: "IT Lab 2", instructor: "Prof. Villanueva" },
  { code: "MATH 201", description: "Discrete Mathematics", units: 3, schedule: "Mon / Wed", time: "1:00 - 2:30 PM", room: "Room 301", instructor: "Prof. Cruz" },
  { code: "ENG 101", description: "Technical Writing", units: 3, schedule: "Tue / Thu", time: "7:30 - 9:00 AM", room: "Room 106", instructor: "Prof. Garcia" },
  { code: "PE 101", description: "Physical Education 1", units: 2, schedule: "Tue", time: "3:00 - 5:00 PM", room: "Room 109", instructor: "Prof. Manteza" },
  { code: "NSTP 101", description: "National Service Training Program", units: 3, schedule: "Sat", time: "7:00 - 10:00 AM", room: "AVR", instructor: "Prof. Mendoza" }
];

export default function StudyloadStudent() {
  const [activeNav, setActiveNav] = useState("Study Load");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isIrregular, setIsIrregular] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("onlium_enrollment");
    if (raw) {
      const data = JSON.parse(raw);
      setIsIrregular(data.irregular === "yes");
    }
  }, []);

  const totalUnits = subjects.reduce((sum, s) => sum + s.units, 0);

  return (
    <div className="portal">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} hideLogout />
      <div className="main">
        <Topbar onMenuToggle={() => setMobileOpen(!mobileOpen)} />
        <div className="content">
          <div style={{ padding: "28px 32px", flex: 1 }}>
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 24, fontWeight: 700, color: "#1e293b", margin: 0 }}>
                Study Load
              </h1>
              <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
                BS Information Technology — 2nd Year
              </p>
            </div>

            {isIrregular ? (
              /* Irregular Student — Pending State */
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 40, textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#fff7ed", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <svg width="28" height="28" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 8v4M12 16h.01"/>
                  </svg>
                </div>
                <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 20, background: "#fff7ed", color: "#ea580c", fontSize: 12, fontWeight: 700, border: "1px solid #fed7aa", marginBottom: 16 }}>
                  Pending Assignment
                </span>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 10px" }}>
                  Study Load Not Yet Available
                </h2>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 24px" }}>
                  As an <strong>irregular student</strong>, your subjects will be manually assigned by the Registrar based on your remaining requirements. You will be notified once your study load is ready.
                </p>
                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px 24px", display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <svg width="16" height="16" fill="none" stroke="#2563eb" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                  </svg>
                  <span style={{ fontSize: 13, color: "#475569" }}>Contact the Registrar's Office for updates on your subject assignment.</span>
                </div>
              </div>
            ) : (
              /* Regular Student — Full Study Load Table */
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 28 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 4px 0" }}>Enrolled Study Load</h2>
                <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 24px 0" }}>
                  {totalUnits} units · {subjects.length} subjects · SY 2026
                </p>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        {["Subject Code", "Description", "Units", "Schedule", "Time", "Room", "Instructor"].map(h => (
                          <th key={h} style={{ textAlign: h === "Units" ? "center" : "left", padding: "12px 16px", fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #e2e8f0" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((subject, index) => (
                        <tr key={subject.code} style={{ background: index % 2 === 0 ? "#fff" : "#f8fafc" }}>
                          <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 600, color: "#1e293b", borderBottom: "1px solid #f1f5f9" }}>{subject.code}</td>
                          <td style={{ padding: "14px 16px", fontSize: 14, color: "#475569", borderBottom: "1px solid #f1f5f9" }}>{subject.description}</td>
                          <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 600, color: "#1e293b", borderBottom: "1px solid #f1f5f9", textAlign: "center" }}>{subject.units}</td>
                          <td style={{ padding: "14px 16px", fontSize: 14, color: "#475569", borderBottom: "1px solid #f1f5f9" }}>{subject.schedule}</td>
                          <td style={{ padding: "14px 16px", fontSize: 14, color: "#475569", borderBottom: "1px solid #f1f5f9" }}>{subject.time}</td>
                          <td style={{ padding: "14px 16px", fontSize: 14, color: "#475569", borderBottom: "1px solid #f1f5f9" }}>{subject.room}</td>
                          <td style={{ padding: "14px 16px", fontSize: 14, color: "#475569", borderBottom: "1px solid #f1f5f9" }}>{subject.instructor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}