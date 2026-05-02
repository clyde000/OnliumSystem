import { useState } from "react";
import "./styles/Resources.css";

const LINK_TYPES = ["Quiz", "Exam"];
const PROGRAMS = [
  "BS Accountancy",
  "BS Business Administration",
  "BS Hospitality Management",
  "BS Computer Science",
  "BS Information Technology",
];

const INITIAL_LINKS = [
  { id: 1, courseCode: "IT 101", courseTitle: "Introduction to Computing", type: "Quiz", url: "https://lms.onlium.edu/quiz/it101", program: "BS Information Technology", description: "Quiz 1 — Chapter 1 to 3", deadline: "2026-04-30", notified: true, createdAt: "Apr 10, 2026" },
  { id: 2, courseCode: "IT 201", courseTitle: "Data Structures & Algorithms", type: "Exam", url: "https://lms.onlium.edu/exam/it201", program: "BS Information Technology", description: "Midterm Exam", deadline: "2026-05-05", notified: true, createdAt: "Apr 12, 2026" },
  { id: 3, courseCode: "CS 101", courseTitle: "Introduction to Computer Science", type: "Quiz", url: "https://lms.onlium.edu/quiz/cs101", program: "BS Computer Science", description: "Quiz 2 — Algorithms", deadline: "2026-04-28", notified: true, createdAt: "Apr 14, 2026" },
];

const emptyForm = { courseCode: "", courseTitle: "", type: "Quiz", url: "", program: "", description: "", deadline: "" };

function isValidUrl(str) {
  try { new URL(str); return true; } catch { return false; }
}

export default function ResourcesAdmin() {
  const [links, setLinks] = useState(INITIAL_LINKS);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [filterType, setFilterType] = useState("All");
  const [filterProgram, setFilterProgram] = useState("All");
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function validate() {
    const errs = {};
    if (!form.courseCode.trim()) errs.courseCode = "Course code is required.";
    if (!form.courseTitle.trim()) errs.courseTitle = "Course title is required.";
    if (!form.program) errs.program = "Program is required.";
    if (!form.url.trim()) errs.url = "URL is required.";
    else if (!isValidUrl(form.url.trim())) errs.url = "Please enter a valid URL (e.g. https://...).";
    // Duplicate check
    const dup = links.find(l =>
      l.id !== editId &&
      l.courseCode.toLowerCase() === form.courseCode.trim().toLowerCase() &&
      l.type === form.type &&
      l.program === form.program
    );
    if (dup) errs.duplicate = `A ${form.type} link for "${form.courseCode}" in ${form.program} already exists.`;
    return errs;
  }

  function handleSubmit() {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    // Save to student notifications in localStorage
    const notification = {
      id: Date.now(),
      title: `${form.type} Available — ${form.courseCode}`,
      description: `${form.courseTitle}${form.description ? ": " + form.description : ""}. Access the link below.`,
      link: form.url,
      type: form.type.toLowerCase(),
      deadline: form.deadline || null,
      date: new Date().toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" }),
      badge: form.type,
      badgeType: form.type === "Exam" ? "deadline" : "lms",
      group: "Today",
    };
    const existing = JSON.parse(localStorage.getItem("onlium_notifications") || "[]");
    localStorage.setItem("onlium_notifications", JSON.stringify([notification, ...existing]));

    if (editId) {
      setLinks(links.map(l => l.id === editId ? { ...l, ...form, courseCode: form.courseCode.trim(), courseTitle: form.courseTitle.trim(), url: form.url.trim(), notified: true } : l));
      showToast("Link updated and students notified!");
    } else {
      const newLink = { id: Date.now(), ...form, courseCode: form.courseCode.trim(), courseTitle: form.courseTitle.trim(), url: form.url.trim(), notified: true, createdAt: new Date().toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" }) };
      setLinks([newLink, ...links]);
      showToast(`${form.type} link posted! Students have been notified.`);
    }
    setShowForm(false);
    setEditId(null);
    setForm({ ...emptyForm });
    setErrors({});
  }

  function handleEdit(link) {
    setForm({ courseCode: link.courseCode, courseTitle: link.courseTitle, type: link.type, url: link.url, program: link.program, description: link.description || "", deadline: link.deadline || "" });
    setEditId(link.id);
    setShowForm(true);
    setErrors({});
  }

  function handleDelete(id) {
    setLinks(links.filter(l => l.id !== id));
    setDeleteConfirm(null);
    showToast("Link deleted.", "error");
  }

  function handleSort(col) {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  }

  const filtered = links.filter(l =>
    (filterType === "All" || l.type === filterType) &&
    (filterProgram === "All" || l.program === filterProgram)
  ).sort((a, b) => {
    if (!sortCol) return 0;
    return sortDir === "asc" ? String(a[sortCol]).localeCompare(String(b[sortCol])) : String(b[sortCol]).localeCompare(String(a[sortCol]));
  });

  return (
    <div className="resources-admin">

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", top: 24, right: 24, zIndex: 9999, padding: "14px 20px", borderRadius: 10, background: toast.type === "error" ? "#fef2f2" : "#f0fdf4", border: `1px solid ${toast.type === "error" ? "#fca5a5" : "#86efac"}`, color: toast.type === "error" ? "#dc2626" : "#16a34a", fontSize: 13, fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: 8 }}>
          {toast.type === "error" ? "✕" : "✓"} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="resources-header">
        <div className="header-left">
          <h1>Resources</h1>
          <p>Upload and manage LMS links — students are notified automatically</p>
        </div>
        {!showForm && (
          <button className="post-link-btn" onClick={() => { setShowForm(true); setEditId(null); setForm({ ...emptyForm }); setErrors({}); }}>
            + Upload LMS Link
          </button>
        )}
      </div>

      {/* Stats */}
      {!showForm && (
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Total Links", value: links.length, color: "#3b82f6", bg: "#eff6ff" },
            { label: "Quiz Links", value: links.filter(l => l.type === "Quiz").length, color: "#8b5cf6", bg: "#f5f3ff" },
            { label: "Exam Links", value: links.filter(l => l.type === "Exam").length, color: "#ef4444", bg: "#fef2f2" },
            { label: "Notified", value: links.filter(l => l.notified).length, color: "#16a34a", bg: "#f0fdf4" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px 20px", flex: 1 }}>
              <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Form */}
      {showForm && (
        <div className="resources-form-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ margin: 0 }}>{editId ? "Edit LMS Link" : "Upload New LMS Link"}</h2>
            <button className="cancel-btn" onClick={() => { setShowForm(false); setEditId(null); setErrors({}); }}>Cancel</button>
          </div>

          {errors.duplicate && (
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#dc2626" }}>
              ⚠ {errors.duplicate}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label>Course Code *</label>
              <input className="form-input" placeholder="e.g. IT 101" value={form.courseCode} onChange={e => setForm({ ...form, courseCode: e.target.value })} style={{ borderColor: errors.courseCode ? "#ef4444" : undefined }} />
              {errors.courseCode && <span style={{ fontSize: 11, color: "#ef4444" }}>{errors.courseCode}</span>}
            </div>
            <div className="form-group large">
              <label>Course Title *</label>
              <input className="form-input" placeholder="e.g. Introduction to Computing" value={form.courseTitle} onChange={e => setForm({ ...form, courseTitle: e.target.value })} style={{ borderColor: errors.courseTitle ? "#ef4444" : undefined }} />
              {errors.courseTitle && <span style={{ fontSize: 11, color: "#ef4444" }}>{errors.courseTitle}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Link Type *</label>
              <div className="category-buttons">
                {LINK_TYPES.map(t => (
                  <button key={t} className={`category-btn ${form.type === t ? "active" : ""}`} onClick={() => setForm({ ...form, type: t })}>{t}</button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Program *</label>
              <select className="form-select" value={form.program} onChange={e => setForm({ ...form, program: e.target.value })} style={{ borderColor: errors.program ? "#ef4444" : undefined }}>
                <option value="">Select program...</option>
                {PROGRAMS.map(p => <option key={p}>{p}</option>)}
              </select>
              {errors.program && <span style={{ fontSize: 11, color: "#ef4444" }}>{errors.program}</span>}
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 20 }}>
            <label>LMS URL *</label>
            <input className="form-input" placeholder="https://lms.onlium.edu/quiz/123" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} style={{ borderColor: errors.url ? "#ef4444" : undefined }} />
            {errors.url ? <span style={{ fontSize: 11, color: "#ef4444" }}>{errors.url}</span> : <span className="helper-text">Paste the full link from your LMS platform</span>}
          </div>

          <div className="form-row">
            <div className="form-group large">
              <label>Description / Instructions <span className="optional">(optional)</span></label>
              <input className="form-input" placeholder="e.g. Quiz 1 — Chapters 1 to 3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Deadline <span className="optional">(optional)</span></label>
              <input type="date" className="form-input" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} />
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#92400e", display: "flex", gap: 8, alignItems: "center" }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            Students enrolled in this program will be automatically notified once you post this link.
          </div>

          <div className="form-actions">
            <button className="submit-btn" onClick={handleSubmit}>
              {editId ? "Update & Notify Students" : `Post ${form.type} Link & Notify Students`}
            </button>
          </div>
        </div>
      )}

      {/* Filters + Table */}
      {!showForm && (
        <>
          <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center" }}>
            <select className="form-select" style={{ width: "auto" }} value={filterType} onChange={e => setFilterType(e.target.value)}>
              <option value="All">All Types</option>
              {LINK_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
            <select className="form-select" style={{ width: "auto" }} value={filterProgram} onChange={e => setFilterProgram(e.target.value)}>
              <option value="All">All Programs</option>
              {PROGRAMS.map(p => <option key={p}>{p}</option>)}
            </select>
            {(filterType !== "All" || filterProgram !== "All") && (
              <button onClick={() => { setFilterType("All"); setFilterProgram("All"); }} style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Clear</button>
            )}
            <span style={{ marginLeft: "auto", fontSize: 12, color: "#94a3b8" }}>{filtered.length} link{filtered.length !== 1 ? "s" : ""}</span>
          </div>

          {filtered.length === 0 ? (
            <div className="resources-list">
              <p className="empty-state">No links found. Click "Upload LMS Link" to add one.</p>
            </div>
          ) : (
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead style={{ background: "#f8fafc" }}>
                    <tr>
                      {[["courseCode","CODE"],["courseTitle","COURSE TITLE"],["type","TYPE"],["program","PROGRAM"],["url","LINK"],["deadline","DEADLINE"],["createdAt","POSTED"],["notified","STATUS"]].map(([col, label]) => (
                        <th key={col} onClick={() => handleSort(col)} style={{ padding: "14px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #e2e8f0", cursor: "pointer", userSelect: "none", whiteSpace: "nowrap" }}>
                          {label} {sortCol === col ? (sortDir === "asc" ? "↑" : "↓") : ""}
                        </th>
                      ))}
                      <th style={{ padding: "14px 16px", borderBottom: "1px solid #e2e8f0" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((l, i) => (
                      <tr key={l.id} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "14px 16px", fontWeight: 700, color: "#2563eb", fontSize: 13 }}>{l.courseCode}</td>
                        <td style={{ padding: "14px 16px", fontSize: 13, color: "#1e293b" }}>{l.courseTitle}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: l.type === "Exam" ? "#fef2f2" : "#f5f3ff", color: l.type === "Exam" ? "#dc2626" : "#7c3aed", border: `1px solid ${l.type === "Exam" ? "#fca5a5" : "#ddd6fe"}` }}>
                            {l.type}
                          </span>
                        </td>
                        <td style={{ padding: "14px 16px", fontSize: 12, color: "#64748b" }}>{l.program}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <a href={l.url} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "#2563eb", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            Open Link
                          </a>
                        </td>
                        <td style={{ padding: "14px 16px", fontSize: 12, color: "#64748b" }}>{l.deadline || "—"}</td>
                        <td style={{ padding: "14px 16px", fontSize: 12, color: "#64748b" }}>{l.createdAt}</td>
                        <td style={{ padding: "14px 16px" }}>
                          {l.notified
                            ? <span style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", background: "#f0fdf4", padding: "3px 10px", borderRadius: 20, border: "1px solid #86efac" }}>✓ Notified</span>
                            : <span style={{ fontSize: 11, color: "#94a3b8" }}>Pending</span>
                          }
                        </td>
                        <td style={{ padding: "14px 16px" }}>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button onClick={() => handleEdit(l)} style={{ padding: "6px 12px", background: "#eff6ff", border: "1px solid #bfdbfe", color: "#2563eb", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Edit</button>
                            <button onClick={() => setDeleteConfirm(l.id)} style={{ padding: "6px 12px", background: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, width: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", margin: "0 0 8px" }}>Delete Link</h3>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 24 }}>Are you sure you want to delete this link? This action cannot be undone.</p>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ flex: 1, padding: 12, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ flex: 1, padding: 12, background: "#dc2626", border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
