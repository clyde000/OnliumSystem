import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./styles/StudentManagement.css";

const STUDENTS = [
  { id: "ONLS-2025-00124", firstName: "Ehron", lastName: "Regodo", dob: "March 12, 2004", gender: "Male", contact: "+63 917 123 4567", email: "ehron.regodo@onlium.edu", address: "Lapu-Lapu City, Cebu", department: "BS Computer Science", program: "BS Computer Science", year: "2nd Year", gpa: "1.75", status: "Active", docs: ["Report Card", "PSA Birth Certificate", "Good Moral"] },
  { id: "ONLS-2025-00098", firstName: "Yanzie", lastName: "Suson", dob: "February 5, 2006", gender: "Female", contact: "+63 589 987 1259", email: "yanzie.suson@onlium.edu", address: "Mandaue City, Cebu", department: "BS Information Technology", program: "BS Information Technology", year: "1st Year", gpa: "1.50", status: "Active", docs: ["Report Card", "PSA Birth Certificate"] },
  { id: "ONLS-2025-00201", firstName: "Rheza", lastName: "Parusa", dob: "July 20, 2003", gender: "Female", contact: "+63 912 345 6789", email: "rheza.parusa@onlium.edu", address: "Cebu City, Cebu", department: "BS Accountancy", program: "BS Accountancy", year: "3rd Year", gpa: "2.00", status: "Pending", docs: ["Clearance"] },
  { id: "ONLS-2025-00175", firstName: "Dianne", lastName: "Manteza", dob: "April 14, 2005", gender: "Female", contact: "+63 923 456 7890", email: "dianne.manteza@onlium.edu", address: "Talisay City, Cebu", department: "BS Information Technology", program: "BS Information Technology", year: "2nd Year", gpa: "1.85", status: "Pending", docs: ["Clearance", "Good Moral"] },
  { id: "ONLS-2025-00111", firstName: "Jessa", lastName: "Surigao", dob: "November 3, 2005", gender: "Female", contact: "+63 934 567 8901", email: "jessa.surigao@onlium.edu", address: "Consolacion, Cebu", department: "BS Business Administration", program: "BS Business Administration", year: "1st Year", gpa: "2.25", status: "Inactive", docs: ["Report Card"] },
  { id: "ONLS-2025-00087", firstName: "Clyde", lastName: "Casipong", dob: "January 8, 2005", gender: "Male", contact: "+63 945 678 9012", email: "clyde.casipong@onlium.edu", address: "Mandaue City, Cebu", department: "BS Computer Science", program: "BS Computer Science", year: "1st Year", gpa: "1.60", status: "Active", docs: ["Report Card", "PSA Birth Certificate", "Good Moral"] },
  { id: "ONLS-2025-00045", firstName: "Faith", lastName: "Ymbong", dob: "September 22, 2004", gender: "Female", contact: "+63 956 789 0123", email: "faith.ymbong@onlium.edu", address: "Cebu City, Cebu", department: "BS Hospitality Management", program: "BS Hospitality Management", year: "2nd Year", gpa: "1.90", status: "Pending", docs: ["Clearance"] },
  { id: "ONLS-2025-00033", firstName: "Ron", lastName: "Regodo", dob: "May 17, 2004", gender: "Male", contact: "+63 967 890 1234", email: "ron.regodo@onlium.edu", address: "Lapu-Lapu City, Cebu", department: "BS Information Technology", program: "BS Information Technology", year: "1st Year", gpa: "1.45", status: "Active", docs: ["Report Card", "PSA Birth Certificate"] },
];

const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case "active": return "status-active";
    case "pending": return "status-pending";
    case "inactive": return "status-inactive";
    default: return "status-default";
  }
};

const BAR_COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4"];

function BarChart({ data, color }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {data.map((d, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 110, fontSize: 12, color: "#475569", textAlign: "right", flexShrink: 0 }}>{d.label}</div>
          <div style={{ flex: 1, background: "#f1f5f9", borderRadius: 6, height: 22, overflow: "hidden" }}>
            <div style={{ width: `${(d.value / max) * 100}%`, background: color || BAR_COLORS[i % BAR_COLORS.length], height: "100%", borderRadius: 6, transition: "width .4s", display: "flex", alignItems: "center", paddingLeft: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{d.value}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function StudentManagement() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || "list");
  const [highlightEmail, setHighlightEmail] = useState(location.state?.email || null);
  const [submissions, setSubmissions] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [search, setSearch] = useState("");
  const [filterGender, setFilterGender] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [filterDept, setFilterDept] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("onlium_submissions");
    if (raw) setSubmissions(JSON.parse(raw));
  }, [activeTab]);

  function handleApprove(email) {
    const updated = submissions.map(s => s.email === email ? { ...s, approved: true, status: "Approved" } : s);
    setSubmissions(updated);
    localStorage.setItem("onlium_submissions", JSON.stringify(updated));
    const enrollment = updated.find(s => s.email === email);
    if (enrollment) localStorage.setItem("onlium_enrollment", JSON.stringify({ ...enrollment, approved: true }));
    const allUsers = JSON.parse(localStorage.getItem("onlium_users") || "[]");
    const idx = allUsers.findIndex(u => u.email === email);
    if (idx >= 0) { allUsers[idx] = { ...allUsers[idx], studentId: "ONLS-2025-00124", yearLevel: "2nd Year", program: "BS Information Technology", approved: true }; localStorage.setItem("onlium_users", JSON.stringify(allUsers)); }
    const cur = JSON.parse(localStorage.getItem("onlium_current_user") || "{}");
    if (cur.email === email) localStorage.setItem("onlium_current_user", JSON.stringify({ ...cur, studentId: "ONLS-2025-00124", yearLevel: "2nd Year", program: "BS Information Technology", approved: true }));
  }

  function handleReject(email) {
    const updated = submissions.map(s => s.email === email ? { ...s, approved: false, status: "Rejected", rejectReason } : s);
    setSubmissions(updated);
    localStorage.setItem("onlium_submissions", JSON.stringify(updated));
    const enrollment = updated.find(s => s.email === email);
    if (enrollment) localStorage.setItem("onlium_enrollment", JSON.stringify({ ...enrollment, approved: false, status: "Rejected" }));
    setShowRejectModal(null);
    setRejectReason("");
  }

  const pendingCount = submissions.filter(s => !s.approved && s.status !== "Rejected").length;

  const filteredStudents = STUDENTS.filter(s => {
    const q = search.toLowerCase();
    return (
      (s.firstName + " " + s.lastName).toLowerCase().includes(q) || s.id.toLowerCase().includes(q) &&
      (filterGender === "All" || s.gender === filterGender) &&
      (filterYear === "All" || s.year === filterYear) &&
      (filterDept === "All" || s.department === filterDept) &&
      (filterStatus === "All" || s.status === filterStatus)
    );
  }).filter(s =>
    (filterGender === "All" || s.gender === filterGender) &&
    (filterYear === "All" || s.year === filterYear) &&
    (filterDept === "All" || s.department === filterDept) &&
    (filterStatus === "All" || s.status === filterStatus)
  );

  // Demographics data
  const genderData = [
    { label: "Male", value: STUDENTS.filter(s => s.gender === "Male").length },
    { label: "Female", value: STUDENTS.filter(s => s.gender === "Female").length },
  ];
  const yearData = ["1st Year","2nd Year","3rd Year","4th Year"].map(y => ({ label: y, value: STUDENTS.filter(s => s.year === y).length }));
  const deptData = [...new Set(STUDENTS.map(s => s.department))].map(d => ({ label: d.replace("College of ", ""), value: STUDENTS.filter(s => s.department === d).length }));
  const statusData = ["Active","Pending","Inactive"].map(st => ({ label: st, value: STUDENTS.filter(s => s.status === st).length }));

  return (
    <div className="student-management">
      <div style={{ background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)", borderRadius: 16, padding: "24px 32px", marginBottom: 24, color: "#fff" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 6px" }}>Student Management</h1>
        <p style={{ fontSize: 13, opacity: 0.85, margin: 0 }}>View and manage all student records, demographics, and applications</p>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === "list" ? "active" : ""}`} onClick={() => { setActiveTab("list"); setSelectedStudent(null); }}>Students List</button>
        <button className={`tab ${activeTab === "demographics" ? "active" : ""}`} onClick={() => { setActiveTab("demographics"); setSelectedStudent(null); }}>Demographics</button>
        <button className={`tab ${activeTab === "application" ? "active" : ""}`} onClick={() => { setActiveTab("application"); setSelectedStudent(null); }}>
          View Student Application
          {pendingCount > 0 && <span style={{ marginLeft: 8, background: "#ef4444", color: "#fff", borderRadius: 20, fontSize: 11, fontWeight: 700, padding: "2px 8px" }}>{pendingCount} new</span>}
        </button>
        {selectedStudent && (
          <button className={`tab ${activeTab === "detail" ? "active" : ""}`} onClick={() => setActiveTab("detail")}>
            {selectedStudent.firstName} {selectedStudent.lastName}
          </button>
        )}
      </div>

      {/* ── STUDENTS LIST ── */}
      {activeTab === "list" && (
        <>
          <div className="filters">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search by name or ID..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="filter-dropdowns">
              <select className="filter-select" value={filterGender} onChange={e => setFilterGender(e.target.value)}>
                <option value="All">All Gender</option>
                <option>Male</option><option>Female</option>
              </select>
              <select className="filter-select" value={filterYear} onChange={e => setFilterYear(e.target.value)}>
                <option value="All">All Year Levels</option>
                <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option>
              </select>
              <select className="filter-select" value={filterDept} onChange={e => setFilterDept(e.target.value)}>
                <option value="All">All Departments</option>
                <option>BS Accountancy</option>
                <option>BS Business Administration</option>
                <option>BS Hospitality Management</option>
                <option>BS Computer Science</option>
                <option>BS Information Technology</option>
              </select>
              <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="All">All Status</option>
                <option>Active</option><option>Pending</option><option>Inactive</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            <table className="students-table">
              <thead>
                <tr>
                  <th>STUDENT ID</th><th>NAME</th><th>DEPARTMENT</th>
                  <th>YEAR</th><th>GENDER</th><th>STATUS</th><th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0
                  ? <tr><td colSpan={7} style={{ textAlign: "center", color: "#94a3b8", padding: 32 }}>No students found.</td></tr>
                  : filteredStudents.map(s => (
                    <tr key={s.id}>
                      <td style={{ fontWeight: 600, color: "#2563eb" }}>{s.id}</td>
                      <td>{s.firstName} {s.lastName}</td>
                      <td style={{ fontSize: 12, color: "#64748b" }}>{s.department.replace("College of ", "")}</td>
                      <td>{s.year}</td>
                      <td>{s.gender}</td>
                      <td><span className={`status-badge ${getStatusClass(s.status)}`}>{s.status}</span></td>
                      <td><button className="view-btn" onClick={() => { setSelectedStudent(s); setActiveTab("detail"); }}>View</button></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: "#94a3b8" }}>Showing {filteredStudents.length} of {STUDENTS.length} students</div>
        </>
      )}

      {/* ── DEMOGRAPHICS ── */}
      {activeTab === "demographics" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Summary Cards */}
          <div style={{ gridColumn: "1/-1", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {[
              { label: "Total Students", value: STUDENTS.length, color: "#3b82f6", bg: "#eff6ff" },
              { label: "Active", value: STUDENTS.filter(s => s.status === "Active").length, color: "#16a34a", bg: "#f0fdf4" },
              { label: "Pending", value: STUDENTS.filter(s => s.status === "Pending").length, color: "#d97706", bg: "#fffbeb" },
              { label: "Inactive", value: STUDENTS.filter(s => s.status === "Inactive").length, color: "#dc2626", bg: "#fef2f2" },
            ].map((c, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "20px 24px" }}>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>{c.label}</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: c.color }}>{c.value}</div>
              </div>
            ))}
          </div>

          {/* Gender */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 16 }}>Gender Distribution</div>
            <BarChart data={genderData} />
          </div>

          {/* Year Level */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 16 }}>Year Level Distribution</div>
            <BarChart data={yearData} color="#22c55e" />
          </div>

          {/* Department */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 16 }}>Department Distribution</div>
            <BarChart data={deptData} color="#8b5cf6" />
          </div>

          {/* Enrollment Status */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 16 }}>Enrollment Status</div>
            <BarChart data={statusData} color="#f59e0b" />
          </div>
        </div>
      )}

      {/* ── STUDENT PERSONAL INFO ── */}
      {activeTab === "detail" && selectedStudent && (
        <div>
          <button className="view-btn" style={{ marginBottom: 16 }} onClick={() => { setActiveTab("list"); setSelectedStudent(null); }}>← Back to List</button>

          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20 }}>
            {/* Left — Profile Card */}
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 24, textAlign: "center" }}>
              <div className="student-avatar" style={{ width: 72, height: 72, fontSize: 24, margin: "0 auto 16px" }}>
                {selectedStudent.firstName[0]}{selectedStudent.lastName[0]}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#1e293b" }}>{selectedStudent.firstName} {selectedStudent.lastName}</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{selectedStudent.id}</div>
              <div style={{ marginTop: 12 }}>
                <span className={`status-badge ${getStatusClass(selectedStudent.status)}`}>{selectedStudent.status}</span>
              </div>
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10, textAlign: "left" }}>
                {[
                  { label: "Program", value: selectedStudent.program },
                  { label: "Year Level", value: selectedStudent.year },
                  { label: "GPA", value: selectedStudent.gpa },
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, borderBottom: "1px solid #f1f5f9", paddingBottom: 8 }}>
                    <span style={{ color: "#64748b" }}>{r.label}</span>
                    <span style={{ fontWeight: 600, color: "#1e293b" }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Personal Info */}
              <div className="student-card">
                <div className="card-section">
                  <h4>PERSONAL INFORMATION</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                    {[
                      { label: "Full Name", value: `${selectedStudent.firstName} ${selectedStudent.lastName}` },
                      { label: "Date of Birth", value: selectedStudent.dob },
                      { label: "Gender", value: selectedStudent.gender },
                      { label: "Contact Number", value: selectedStudent.contact },
                      { label: "Email", value: selectedStudent.email },
                      { label: "Address", value: selectedStudent.address },
                    ].map((r, i) => (
                      <div key={i} className="info-row"><span>{r.label}</span><span>{r.value}</span></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Academic Info */}
              <div className="student-card">
                <div className="card-section">
                  <h4>ACADEMIC INFORMATION</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                    {[
                      { label: "Department", value: selectedStudent.department },
                      { label: "Program", value: selectedStudent.program },
                      { label: "Year Level", value: selectedStudent.year },
                      { label: "GPA", value: selectedStudent.gpa },
                      { label: "Student ID", value: selectedStudent.id },
                      { label: "Enrollment Status", value: selectedStudent.status },
                    ].map((r, i) => (
                      <div key={i} className="info-row"><span>{r.label}</span><span>{r.value}</span></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="student-card">
                <div className="card-section" style={{ borderBottom: "none", paddingBottom: 0 }}>
                  <h4>SUBMITTED DOCUMENTS</h4>
                  <div className="requirements">
                    {selectedStudent.docs.map((doc, i) => (
                      <button key={i} className="req-btn">{doc}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── VIEW STUDENT APPLICATION ── */}
      {activeTab === "application" && (
        <>
          {submissions.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
              <svg width="48" height="48" fill="none" stroke="#cbd5e1" strokeWidth="1.5" viewBox="0 0 24 24" style={{ margin: "0 auto 16px", display: "block" }}>
                <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#64748b" }}>No submissions yet</p>
              <p style={{ fontSize: 13 }}>Student applications will appear here once submitted.</p>
            </div>
          ) : (
            <div className="application-cards">
              {submissions.map((sub, i) => {
                const isApproved = sub.approved === true;
                const isRejected = sub.status === "Rejected";
                const isPending = !isApproved && !isRejected;
                const initials = sub.studentName?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "??";
                const submittedDate = sub.submittedAt ? new Date(sub.submittedAt).toLocaleString("en-PH", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";
                return (
                  <div key={i} className="student-card" style={{ border: highlightEmail && sub.email === highlightEmail ? "2px solid #3b82f6" : undefined }}>
                    <div className="student-card-header">
                      <div className="student-avatar">{initials}</div>
                      <div className="student-info">
                        <h3>{sub.studentName}</h3>
                        <p className="year">{sub.studentType === "continuing" ? "Continuing" : sub.studentType === "new" ? "New Student" : "Transferee"}</p>
                        <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: isApproved ? "#f0fdf4" : isRejected ? "#fef2f2" : "#fffbeb", color: isApproved ? "#16a34a" : isRejected ? "#dc2626" : "#d97706", border: `1px solid ${isApproved ? "#86efac" : isRejected ? "#fca5a5" : "#fcd34d"}` }}>
                          {isApproved ? "Approved" : isRejected ? "Rejected" : "Pending Review"}
                        </span>
                      </div>
                    </div>
                    <div style={{ fontSize: 11.5, color: "#94a3b8", marginBottom: 12 }}>Submitted: {submittedDate}</div>
                    <div className="card-section">
                      <h4>ENROLLMENT SUMMARY</h4>
                      {(sub.summary || []).map((row, j) => <div className="info-row" key={j}><span>{row.label}</span><span>{row.value}</span></div>)}
                    </div>
                    <div className="card-section">
                      <h4>CONTACT</h4>
                      <div className="info-row"><span>Email</span><span>{sub.email || "—"}</span></div>
                    </div>
                    {isRejected && sub.rejectReason && (
                      <div className="card-section">
                        <h4>REJECTION REASON</h4>
                        <p style={{ fontSize: 13, color: "#dc2626", margin: 0 }}>{sub.rejectReason}</p>
                      </div>
                    )}
                    {isPending && (
                      <div className="card-actions">
                        <button className="approve-btn" onClick={() => handleApprove(sub.email)}>✓ Approve</button>
                        <button className="reject-btn" onClick={() => setShowRejectModal(sub.email)}>✕ Reject</button>
                      </div>
                    )}
                    {isApproved && <div style={{ padding: "12px 16px", background: "#f0fdf4", borderRadius: 8, textAlign: "center", fontSize: 13, fontWeight: 600, color: "#16a34a" }}>✓ Enrollment Approved — Walk-in payment schedule assigned</div>}
                    {isRejected && <div style={{ padding: "12px 16px", background: "#fef2f2", borderRadius: 8, textAlign: "center", fontSize: 13, fontWeight: 600, color: "#dc2626" }}>✕ Enrollment Rejected — Notification sent to student</div>}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, width: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", margin: "0 0 8px" }}>Reject Application</h3>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>Select a reason. This will be sent to the student.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              {["Photo is blurred or unclear", "Unrelated files submitted", "Incomplete requirements", "Failing grades on submitted documents", "Other"].map(r => (
                <label key={r} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, cursor: "pointer" }}>
                  <input type="radio" name="reason" checked={rejectReason === r} onChange={() => setRejectReason(r)} />
                  {r}
                </label>
              ))}
            </div>
            <textarea placeholder="Additional notes (optional)..." value={rejectReason} onChange={e => setRejectReason(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none", resize: "none", height: 72, boxSizing: "border-box", marginBottom: 16 }} />
            <div className="card-actions" style={{ marginTop: 0 }}>
              <button className="view-btn" style={{ flex: 1, padding: 12 }} onClick={() => { setShowRejectModal(null); setRejectReason(""); }}>Cancel</button>
              <button className="reject-btn" style={{ flex: 1 }} disabled={!rejectReason} onClick={() => handleReject(showRejectModal)}>Send Rejection</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
