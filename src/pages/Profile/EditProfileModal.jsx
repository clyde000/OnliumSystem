import { useEffect, useRef, useState } from "react";
import "./styles/EditProfileModal.css";

export default function EditProfileModal({ isOpen, onClose, currentUser }) {
  const modalRef = useRef(null);
  const fileRef = useRef(null);
  const [enrollment, setEnrollment] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", studentId: "" });
  const [saved, setSaved] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const load = () => {
      const raw = localStorage.getItem("onlium_enrollment");
      if (raw) {
        const data = JSON.parse(raw);
        setEnrollment(data);
        setIsApproved(!!data.approved);
      }
      const userJson = localStorage.getItem("onlium_current_user");
      if (userJson) {
        const user = JSON.parse(userJson);
        setForm({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          studentId: user.studentId || "",
        });
        setPhoto(user.photo || null);
      }
    };
    load();
    const interval = setInterval(load, 300);
    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
        setEditing(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const getInitials = () => {
    const first = form.firstName?.charAt(0)?.toUpperCase() || "";
    const last = form.lastName?.charAt(0)?.toUpperCase() || "";
    return first + last || "??";
  };

  const getFullName = () => {
    if (form.firstName && form.lastName) return `${form.firstName} ${form.lastName}`;
    return form.firstName || form.lastName || "Guest";
  };

  const getStudentId = () => {
    if (!enrollment) return "Not enrolled yet";
    return isApproved ? (form.studentId || currentUser?.studentId || "ONLS-2025-00124") : "Pending";
  };

  const getYearLevel = () => {
    if (!enrollment) return "Not enrolled yet";
    return isApproved ? (currentUser?.yearLevel || "2nd Year") : "Pending approval";
  };

  const getProgram = () => {
    if (!enrollment) return "Not enrolled yet";
    return isApproved ? (currentUser?.program || "BS Information Technology") : "Pending approval";
  };

  const handleSave = () => {
    const updated = { ...currentUser, firstName: form.firstName, lastName: form.lastName, email: form.email, studentId: form.studentId, photo };
    localStorage.setItem("onlium_current_user", JSON.stringify(updated));

    const users = JSON.parse(localStorage.getItem("onlium_users") || "[]");
    const idx = users.findIndex(u => u.email === currentUser.email);
    if (idx >= 0) {
      users[idx] = { ...users[idx], firstName: form.firstName, lastName: form.lastName, studentId: form.studentId, photo };
      localStorage.setItem("onlium_users", JSON.stringify(users));
    }

    setSaved(true);
    window.dispatchEvent(new Event("onlium_profile_updated"));
    setTimeout(() => { setSaved(false); setEditing(false); }, 1500);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhoto(ev.target.result);
      // Save photo immediately to localStorage and update topbar
      const updated = { ...currentUser, photo: ev.target.result };
      localStorage.setItem("onlium_current_user", JSON.stringify(updated));
      window.dispatchEvent(new Event("onlium_profile_updated"));
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.removeItem("onlium_current_user");
    window.location.href = "/register/login";
  };

  if (!isOpen) return null;

  return (
    <div className="profile-info-dropdown" ref={modalRef}>
      <div className="profile-info-header">
        <div style={{ position: "relative", flexShrink: 0 }}>
          {photo
            ? <img src={photo} alt="avatar" style={{ width: 50, height: 50, borderRadius: "50%", objectFit: "cover", border: "2px solid #e5e9f0" }} />
            : <div className="profile-info-avatar">{getInitials()}</div>
          }
          <button
            onClick={() => fileRef.current.click()}
            style={{ position: "absolute", bottom: 0, right: 0, width: 18, height: 18, borderRadius: "50%", background: "#2563eb", border: "2px solid #fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
          >
            <svg width="9" height="9" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </button>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoChange} />
        </div>
        <div className="profile-info-name">
          <div className="profile-info-fullname">{getFullName()}</div>
          <button className="profile-info-edit-link" onClick={() => setEditing(!editing)}>
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Edit Form */}
      {editing && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <label style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 0.5 }}>First Name</label>
              <input
                value={form.firstName}
                onChange={e => setForm({ ...form, firstName: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box", marginTop: 4 }}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 0.5 }}>Last Name</label>
              <input
                value={form.lastName}
                onChange={e => setForm({ ...form, lastName: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box", marginTop: 4 }}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 0.5 }}>Email</label>
              <input
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box", marginTop: 4 }}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 0.5 }}>Student ID</label>
              <input
                value={form.studentId}
                onChange={e => setForm({ ...form, studentId: e.target.value })}
                placeholder="e.g. ONLS-2025-00124"
                style={{ width: "100%", padding: "8px 10px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box", marginTop: 4 }}
              />
            </div>
            <button
              onClick={handleSave}
              style={{ padding: "9px", borderRadius: 8, background: saved ? "#16a34a" : "#2563eb", color: "#fff", border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "background .2s" }}
            >
              {saved ? "✓ Saved!" : "Save Changes"}
            </button>
          </div>
          <div className="profile-info-divider" />
        </div>
      )}

      <div className="profile-info-divider" style={{ marginTop: editing ? 0 : undefined }} />

      <div className="profile-info-list">
        {/* Student ID — read only */}
        <div className="profile-info-item">
          <svg className="profile-info-icon" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <rect x="3" y="5" width="18" height="14" rx="2" ry="2"/>
            <line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="12" y2="13"/>
          </svg>
          <div className="profile-info-content">
            <div className="profile-info-label">Student ID</div>
            <div className="profile-info-value" style={{ color: !isApproved && enrollment ? "#ea580c" : undefined }}>{getStudentId()}</div>
          </div>
        </div>

        <div className="profile-info-item">
          <svg className="profile-info-icon" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M12 14l9-5-9-5-9 5 9 5z"/>
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
          </svg>
          <div className="profile-info-content">
            <div className="profile-info-label">Year Level</div>
            <div className="profile-info-value" style={{ color: !isApproved && enrollment ? "#ea580c" : undefined }}>{getYearLevel()}</div>
          </div>
        </div>

        <div className="profile-info-item">
          <svg className="profile-info-icon" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
          </svg>
          <div className="profile-info-content">
            <div className="profile-info-label">Program</div>
            <div className="profile-info-value" style={{ color: !isApproved && enrollment ? "#ea580c" : undefined }}>{getProgram()}</div>
          </div>
        </div>
      </div>

      <div className="profile-info-divider"></div>

      <button className="profile-info-logout" onClick={handleLogout}>
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
        </svg>
        Logout
      </button>
    </div>
  );
}
