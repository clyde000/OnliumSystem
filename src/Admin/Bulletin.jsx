import { useState } from "react";
import "./styles/Bulletin.css";

const STUDENTS = [
  { id: "ONLS-2025-00124", name: "Ehron Regodo", program: "BS Computer Science" },
  { id: "ONLS-2025-00098", name: "Yanzie Suson", program: "BS Information Technology" },
  { id: "ONLS-2025-00201", name: "Rheza Parusa", program: "BS Accountancy" },
  { id: "ONLS-2025-00175", name: "Dianne Manteza", program: "BS Information Technology" },
  { id: "ONLS-2025-00111", name: "Jessa Surigao", program: "BS Business Administration" },
  { id: "ONLS-2025-00087", name: "Clyde Casipong", program: "BS Computer Science" },
  { id: "ONLS-2025-00045", name: "Faith Ymbong", program: "BS Information Technology" },
  { id: "ONLS-2025-00033", name: "Ron Regodo", program: "BS Information Technology" },
];

const INITIAL_POSTS = [
  { id: 1, title: "Enrollment Deadline Extended", content: "The enrollment deadline for SY 2026 has been extended to Apr 30, 2026. Please complete all requirements before the deadline.", audience: "All Students", date: "Apr 16, 2026", scheduled: false, link: "" },
  { id: 2, title: "LMS Orientation — New Students", content: "New students are required to attend the LMS orientation on Apr 20, 2026. Details have been sent to your registered email.", audience: "1st Year Students", date: "Apr 15, 2026", scheduled: false, link: "" },
  { id: 3, title: "Scholarship Application Open", content: "Scholarship applications for SY 2026–2027 are now open. Submit your application at the scholarship office.", audience: "All Students", date: "Apr 12, 2026", scheduled: false, link: "" },
];

export default function Bulletin() {
  const [view, setView] = useState("dashboard"); // dashboard | create | publish
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [editPost, setEditPost] = useState(null);

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [errors, setErrors] = useState({});

  // Publish state
  const [publishType, setPublishType] = useState("all"); // all | specific
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentSearch, setStudentSearch] = useState("");
  const [scheduleType, setScheduleType] = useState("now"); // now | schedule
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function resetForm() {
    setTitle(""); setContent(""); setLink(""); setErrors({}); setEditPost(null);
  }

  function resetPublish() {
    setPublishType("all"); setSelectedStudent(null); setStudentSearch("");
    setScheduleType("now"); setScheduleDate(""); setScheduleTime("");
  }

  function validateForm() {
    const errs = {};
    if (!title.trim()) errs.title = "Title is required.";
    if (!content.trim()) errs.content = "Content is required.";
    return errs;
  }

  function handleNext() {
    const errs = validateForm();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setView("publish");
  }

  function handlePublish() {
    if (publishType === "specific" && !selectedStudent) {
      showToast("Please select a student.", "error"); return;
    }
    if (scheduleType === "schedule" && (!scheduleDate || !scheduleTime)) {
      showToast("Please set a schedule date and time.", "error"); return;
    }

    const audience = publishType === "all" ? "All Students" : selectedStudent.name;
    const dateStr = scheduleType === "now"
      ? new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : `${scheduleDate} ${scheduleTime} (Scheduled)`;

    if (editPost) {
      setPosts(posts.map(p => p.id === editPost.id ? { ...p, title, content, link, audience, date: dateStr, scheduled: scheduleType === "schedule" } : p));
      showToast("Bulletin updated successfully!");
    } else {
      const newPost = { id: Date.now(), title, content, link, audience, date: dateStr, scheduled: scheduleType === "schedule" };
      setPosts([newPost, ...posts]);

      // Save to student notifications
      const notification = {
        id: Date.now(),
        title,
        description: content,
        date: dateStr,
        badge: "Bulletin",
        badgeType: "lms",
        group: "Today",
        link: link || null,
      };
      const existing = JSON.parse(localStorage.getItem("onlium_notifications") || "[]");
      localStorage.setItem("onlium_notifications", JSON.stringify([notification, ...existing]));

      showToast(publishType === "all"
        ? `Published to all students${scheduleType === "schedule" ? " (scheduled)" : ""}!`
        : `Sent to ${selectedStudent.name}${scheduleType === "schedule" ? " (scheduled)" : ""}!`
      );
    }

    setView("dashboard");
    resetForm();
    resetPublish();
  }

  function handleEdit(post) {
    setTitle(post.title);
    setContent(post.content);
    setLink(post.link || "");
    setEditPost(post);
    setErrors({});
    setView("create");
  }

  function handleDelete(id) {
    setPosts(posts.filter(p => p.id !== id));
    setDeleteConfirm(null);
    showToast("Post deleted.", "error");
  }

  const filteredStudents = STUDENTS.filter(s =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.id.toLowerCase().includes(studentSearch.toLowerCase())
  );

  // ── DASHBOARD ──
  if (view === "dashboard") return (
    <div className="bulletin">
      {toast && (
        <div style={{ position: "fixed", top: 24, right: 24, zIndex: 9999, padding: "14px 20px", borderRadius: 10, background: toast.type === "error" ? "#fef2f2" : "#f0fdf4", border: `1px solid ${toast.type === "error" ? "#fca5a5" : "#86efac"}`, color: toast.type === "error" ? "#dc2626" : "#16a34a", fontSize: 13, fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
          {toast.type === "error" ? "✕" : "✓"} {toast.msg}
        </div>
      )}

      <div style={{ background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)", borderRadius: 16, padding: "24px 32px", marginBottom: 24, color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 6px" }}>Bulletin</h1>
          <p style={{ fontSize: 13, opacity: 0.85, margin: 0 }}>Create and manage announcements for students</p>
        </div>
        <button onClick={() => { resetForm(); setView("create"); }} style={{ padding: "10px 20px", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>+ Create Post</button>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Posts", value: posts.length, color: "#3b82f6" },
          { label: "Published", value: posts.filter(p => !p.scheduled).length, color: "#16a34a" },
          { label: "Scheduled", value: posts.filter(p => p.scheduled).length, color: "#d97706" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px 24px", flex: 1 }}>
            <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Posts */}
      <div className="posts-list">
        {posts.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "#94a3b8", background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0" }}>No posts yet. Click "Create Post" to get started.</div>}
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <h3 style={{ margin: 0 }}>{post.title}</h3>
                  {post.scheduled && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: "#fffbeb", color: "#d97706", border: "1px solid #fcd34d" }}>Scheduled</span>}
                </div>
                <p className="post-meta">Posted {post.date} · <strong>{post.audience}</strong></p>
              </div>
              <div className="post-actions">
                <button className="edit-btn" onClick={() => handleEdit(post)}>Edit</button>
                <button className="delete-btn" onClick={() => setDeleteConfirm(post.id)}>Delete</button>
              </div>
            </div>
            <p className="post-content">{post.content}</p>
            {post.link && <a href={post.link} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "#2563eb", display: "inline-flex", alignItems: "center", gap: 4, marginTop: 8 }}>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Attached Link
            </a>}
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, width: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 8px" }}>Delete Post</h3>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 24 }}>Are you sure you want to delete this post?</p>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ flex: 1, padding: 12, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ flex: 1, padding: 12, background: "#dc2626", border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ── CREATE POST ──
  if (view === "create") return (
    <div className="bulletin">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>{editPost ? "Edit Post" : "Create Post"}</h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, opacity: 0.85 }}>Step 1 of 2 — Write your bulletin</p>
        </div>
        <button onClick={() => { setView("dashboard"); resetForm(); }} style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>← Back</button>
      </div>

      <div className="create-post-card" style={{ maxWidth: 700 }}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#475569", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Title *</label>
          <input className="post-input" placeholder="e.g. Enrollment Deadline Extended" value={title} onChange={e => setTitle(e.target.value)} style={{ borderColor: errors.title ? "#ef4444" : undefined }} />
          {errors.title && <span style={{ fontSize: 11, color: "#ef4444" }}>{errors.title}</span>}
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#475569", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Content / Message *</label>
          <textarea className="post-textarea" placeholder="Write your announcement here..." value={content} onChange={e => setContent(e.target.value)} style={{ borderColor: errors.content ? "#ef4444" : undefined, minHeight: 160 }} />
          {errors.content && <span style={{ fontSize: 11, color: "#ef4444" }}>{errors.content}</span>}
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#475569", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Attachment Link <span style={{ fontWeight: 400, color: "#94a3b8", textTransform: "none" }}>(optional)</span></label>
          <input className="post-input" placeholder="https://drive.google.com/..." value={link} onChange={e => setLink(e.target.value)} />
          <span style={{ fontSize: 11, color: "#94a3b8", marginTop: 4, display: "block" }}>Paste a Google Drive, LMS, or any external link</span>
        </div>

        <button className="publish-btn" onClick={handleNext}>
          Next: Choose Audience →
        </button>
      </div>
    </div>
  );

  // ── PUBLISH OPTIONS ──
  if (view === "publish") return (
    <div className="bulletin">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Publish Post</h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, opacity: 0.85 }}>Step 2 of 2 — Choose audience and schedule</p>
        </div>
        <button onClick={() => setView("create")} style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>← Back</button>
      </div>

      {/* Post Preview */}
      <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px 20px", marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Post Preview</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{content}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 800 }}>
        {/* Audience */}
        <div className="create-post-card">
          <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", marginBottom: 16 }}>Who receives this post?</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { val: "all", label: "Publish to All Students", desc: "All enrolled students will be notified", icon: "👥" },
              { val: "specific", label: "Send to Specific Student", desc: "Select one student from the list", icon: "👤" },
            ].map(opt => (
              <button key={opt.val} onClick={() => setPublishType(opt.val)} style={{ padding: "14px 16px", borderRadius: 10, cursor: "pointer", textAlign: "left", border: publishType === opt.val ? "2px solid #2563eb" : "1.5px solid #e2e8f0", background: publishType === opt.val ? "#eff6ff" : "#fff", outline: "none", transition: "all .15s" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: publishType === opt.val ? "#2563eb" : "#1e293b", marginBottom: 2 }}>{opt.icon} {opt.label}</div>
                <div style={{ fontSize: 11.5, color: "#94a3b8" }}>{opt.desc}</div>
              </button>
            ))}
          </div>

          {/* Student Selector */}
          {publishType === "specific" && (
            <div style={{ marginTop: 16 }}>
              <input className="post-input" placeholder="Search student name or ID..." value={studentSearch} onChange={e => setStudentSearch(e.target.value)} style={{ marginBottom: 8 }} />
              <div style={{ maxHeight: 200, overflowY: "auto", border: "1px solid #e2e8f0", borderRadius: 8 }}>
                {filteredStudents.map(s => (
                  <div key={s.id} onClick={() => setSelectedStudent(s)} style={{ padding: "10px 14px", cursor: "pointer", background: selectedStudent?.id === s.id ? "#eff6ff" : "#fff", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>{s.id} · {s.program}</div>
                    </div>
                    {selectedStudent?.id === s.id && <span style={{ fontSize: 12, color: "#2563eb", fontWeight: 700 }}>✓</span>}
                  </div>
                ))}
              </div>
              {selectedStudent && <div style={{ marginTop: 8, fontSize: 12, color: "#16a34a", fontWeight: 600 }}>✓ Selected: {selectedStudent.name}</div>}
            </div>
          )}
        </div>

        {/* Schedule */}
        <div className="create-post-card">
          <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", marginBottom: 16 }}>When to send?</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {[
              { val: "now", label: "Send Immediately", desc: "Notify students right now" },
              { val: "schedule", label: "Schedule for Later", desc: "Set a specific date and time" },
            ].map(opt => (
              <button key={opt.val} onClick={() => setScheduleType(opt.val)} style={{ padding: "14px 16px", borderRadius: 10, cursor: "pointer", textAlign: "left", border: scheduleType === opt.val ? "2px solid #2563eb" : "1.5px solid #e2e8f0", background: scheduleType === opt.val ? "#eff6ff" : "#fff", outline: "none", transition: "all .15s" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: scheduleType === opt.val ? "#2563eb" : "#1e293b", marginBottom: 2 }}>{opt.label}</div>
                <div style={{ fontSize: 11.5, color: "#94a3b8" }}>{opt.desc}</div>
              </button>
            ))}
          </div>

          {scheduleType === "schedule" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#475569", display: "block", marginBottom: 4 }}>Date</label>
                <input type="date" className="post-input" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#475569", display: "block", marginBottom: 4 }}>Time</label>
                <input type="time" className="post-input" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} />
              </div>
            </div>
          )}

          <button className="publish-btn" style={{ width: "100%", marginTop: 20 }} onClick={handlePublish}>
            {scheduleType === "now"
              ? publishType === "all" ? "🔔 Publish to All Students" : `🔔 Send to ${selectedStudent?.name || "Student"}`
              : "📅 Schedule Post"
            }
          </button>
        </div>
      </div>
    </div>
  );
}
