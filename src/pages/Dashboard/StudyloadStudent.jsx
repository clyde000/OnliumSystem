import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

const subjects = [
  {
    code: "CC 101",
    description: "Introduction to Computing",
    units: 3,
    schedule: "Mon / Wed",
    time: "7:30 - 9:00 AM",
    room: "IT Lab 1",
    instructor: "Prof. Santos"
  },
  {
    code: "CC 102",
    description: "Programming Fundamentals",
    units: 3,
    schedule: "Mon / Wed / Fri",
    time: "9:00 - 10:30 AM",
    room: "IT Lab 2",
    instructor: "Prof. Villanueva"
  },
  {
    code: "MATH 201",
    description: "Discrete Mathematics",
    units: 3,
    schedule: "Mon / Wed",
    time: "1:00 - 2:30 PM",
    room: "Room 301",
    instructor: "Prof. Cruz"
  },
  {
    code: "ENG 101",
    description: "Technical Writing",
    units: 3,
    schedule: "Tue / Thu",
    time: "7:30 - 9:00 AM",
    room: "Room 106",
    instructor: "Prof. Garcia"
  },
  {
    code: "PE 101",
    description: "Physical Education 1",
    units: 2,
    schedule: "Tue",
    time: "3:00 - 5:00 PM",
    room: "Room 109",
    instructor: "Prof. Manteza"
  },
  {
    code: "NSTP 101",
    description: "National Service Training Program",
    units: 3,
    schedule: "Sat",
    time: "7:00 - 10:00 AM",
    room: "AVR",
    instructor: "Prof. Mendoza"
  }
];

export default function StudyloadStudent() {
  const [activeNav, setActiveNav] = useState("Study Load");

  const totalUnits = subjects.reduce((sum, s) => sum + s.units, 0);

  return (
    <div className="portal">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
      <div className="main">
        <Topbar />
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

            {/* Enrolled Study Load Card */}
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 28 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 4px 0" }}>
                Enrolled Study Load
              </h2>
              <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 24px 0" }}>
                {totalUnits} units · {subjects.length} subjects · SY 2026
              </p>

              {/* Table */}
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: "12px 16px", fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #e2e8f0" }}>
                        Subject Code
                      </th>
                      <th style={{ textAlign: "left", padding: "12px 16px", fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #e2e8f0" }}>
                        Description
                      </th>
                      <th style={{ textAlign: "center", padding: "12px 16px", fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #e2e8f0" }}>
                        Units
                      </th>
                      <th style={{ textAlign: "left", padding: "12px 16px", fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #e2e8f0" }}>
                        Schedule
                      </th>
                      <th style={{ textAlign: "left", padding: "12px 16px", fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #e2e8f0" }}>
                        Time
                      </th>
                      <th style={{ textAlign: "left", padding: "12px 16px", fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #e2e8f0" }}>
                        Room
                      </th>
                      <th style={{ textAlign: "left", padding: "12px 16px", fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #e2e8f0" }}>
                        Instructor
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject, index) => (
                      <tr key={subject.code} style={{ background: index % 2 === 0 ? "#fff" : "#f8fafc" }}>
                        <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 600, color: "#1e293b", borderBottom: "1px solid #f1f5f9" }}>
                          {subject.code}
                        </td>
                        <td style={{ padding: "14px 16px", fontSize: 14, color: "#475569", borderBottom: "1px solid #f1f5f9" }}>
                          {subject.description}
                        </td>
                        <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 600, color: "#1e293b", borderBottom: "1px solid #f1f5f9", textAlign: "center" }}>
                          {subject.units}
                        </td>
                        <td style={{ padding: "14px 16px", fontSize: 14, color: "#475569", borderBottom: "1px solid #f1f5f9" }}>
                          {subject.schedule}
                        </td>
                        <td style={{ padding: "14px 16px", fontSize: 14, color: "#475569", borderBottom: "1px solid #f1f5f9" }}>
                          {subject.time}
                        </td>
                        <td style={{ padding: "14px 16px", fontSize: 14, color: "#475569", borderBottom: "1px solid #f1f5f9" }}>
                          {subject.room}
                        </td>
                        <td style={{ padding: "14px 16px", fontSize: 14, color: "#475569", borderBottom: "1px solid #f1f5f9" }}>
                          {subject.instructor}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
