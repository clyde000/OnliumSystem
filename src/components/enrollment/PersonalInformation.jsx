import { useState } from "react";

const s = {
  sectionTitle: {
    fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
    color: "#2563eb", marginBottom: 14, marginTop: 24, paddingBottom: 6,
    borderBottom: "1px solid #eff6ff",
  },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 },
  group: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 12, fontWeight: 600, color: "#475569" },
  input: {
    padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8,
    fontSize: 13.5, fontFamily: "'DM Sans',sans-serif", color: "#1e293b",
    background: "#fff", outline: "none", width: "100%", boxSizing: "border-box",
  },
  inputReadonly: {
    padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8,
    fontSize: 13.5, fontFamily: "'DM Sans',sans-serif", color: "#475569",
    background: "#f8fafc", outline: "none", width: "100%", cursor: "not-allowed", boxSizing: "border-box",
  },
  select: {
    padding: "9px 32px 9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8,
    fontSize: 13.5, fontFamily: "'DM Sans',sans-serif", color: "#1e293b",
    background: "#fff url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\") no-repeat right 12px center",
    outline: "none", width: "100%", appearance: "none", boxSizing: "border-box",
  },
};

const STUDENT_TYPES = [
  {
    key: "new",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "New Student",
    desc: "First-time enrollee, no prior record",
    color: "#16a34a", bg: "#f0fdf4", border: "#86efac",
  },
  {
    key: "transferee",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
        <path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
    title: "Transferee",
    desc: "Coming from another school or program",
    color: "#d97706", bg: "#fffbeb", border: "#fcd34d",
  },
  {
    key: "continuing",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
    title: "Continuing Student",
    desc: "Currently enrolled, re-enrolling for next term",
    color: "#2563eb", bg: "#eff6ff", border: "#93c5fd",
  },
];

const BANNERS = {
  new: {
    bg: "#f0fdf4", border: "#86efac", color: "#15803d",
    text: "You're enrolling as a new student. Fill in your personal details below. Your Student ID, program, and year level will be assigned after enrollment is fully processed.",
  },
  transferee: {
    bg: "#fffbeb", border: "#fcd34d", color: "#92400e",
    text: "You're enrolling as a transferee. Fill in your personal and previous school details. Program placement and year level will be determined after credential evaluation.",
  },
  continuing: {
    bg: "#eff6ff", border: "#bfdbfe", color: "#1d4ed8",
    text: "Your basic information is pre-filled from our records. Please review carefully and correct any errors. Note: you will need your Clearance in the next step — you cannot proceed without it. Fields marked * are required.",
  },
};

function Field({ label, required, children, colSpan }) {
  return (
    <div style={{ ...s.group, ...(colSpan ? { gridColumn: "1/-1" } : {}) }}>
      <label style={s.label}>
        {label}{required && <span style={{ color: "#dc2626", marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function StudentTypeBadge({ type }) {
  const cfg = {
    new:        { label: "New Student",        bg: "#f0fdf4", color: "#16a34a", border: "#86efac" },
    transferee: { label: "Transferee",          bg: "#fffbeb", color: "#d97706", border: "#fcd34d" },
    continuing: { label: "Continuing Student", bg: "#eff6ff", color: "#2563eb", border: "#93c5fd" },
  }[type];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 20, fontSize: 12.5, fontWeight: 700, background: cfg.bg, color: cfg.color, border: `1.5px solid ${cfg.border}` }}>
      {cfg.label}
    </span>
  );
}

export default function PersonalInformation({ onNext }) {
  const [photoSrc, setPhotoSrc] = useState(null);
  const [studentType, setStudentType] = useState("continuing");

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPhotoSrc(ev.target.result);
    reader.readAsDataURL(file);
  }

  const banner = BANNERS[studentType];
  const isContinuing = studentType === "continuing";
  const isTransferee = studentType === "transferee";

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f1f5f9", minHeight: "100vh", padding: "24px 0" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 16px" }}>

        {/* Page Title */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Enrollment</h2>
          <p style={{ fontSize: 12.5, color: "#64748b", marginTop: 4 }}>BS Information Technology — 2nd Year · Continuing Student · SY 2026</p>
        </div>

        {/* Step Progress */}
        <div style={{ display: "flex", gap: 0, marginBottom: 24, background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,.06)" }}>
          {[
            { label: "Personal Info", active: true },
            { label: "Upload Requirements", active: false },
            { label: "Select Program", active: false },
            { label: "Choose Schedule", active: false },
            { label: "Submit Requirements", active: false },
            { label: "Finalize Enrollment", active: false },
          ].map((step, i) => (
            <div key={i} style={{ flex: 1, padding: "12px 10px", textAlign: "center", background: step.active ? "#2563eb" : "#fff", borderRight: i < 5 ? "1px solid #e2e8f0" : "none", position: "relative" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: step.active ? "#fff" : "#94a3b8" }}>{step.label}</div>
              <div style={{ fontSize: 10, color: step.active ? "#bfdbfe" : "#cbd5e1", marginTop: 2 }}>
                {step.active ? "In Progress" : "In Progress"}
              </div>
            </div>
          ))}
        </div>

        {/* Main Card */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,.08)", overflow: "hidden" }}>

          {/* Card Header */}
          <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", flexShrink: 0 }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 700 }}>Personal Information</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Review and confirm your personal details for enrollment</div>
            </div>
          </div>

          {/* Card Body */}
          <div style={{ padding: 24 }}>

            {/* Student Type */}
            <div style={s.sectionTitle}>Student Type</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
              {STUDENT_TYPES.map(({ key, icon, title, desc, color, bg }) => {
                const selected = studentType === key;
                return (
                  <button key={key} onClick={() => setStudentType(key)} style={{ padding: "16px 14px", borderRadius: 10, cursor: "pointer", textAlign: "left", border: selected ? `2px solid ${color}` : "1.5px solid #e2e8f0", background: selected ? bg : "#fff", transition: "all .15s", outline: "none" }}>
                    <div style={{ color: selected ? color : "#94a3b8", marginBottom: 8 }}>{icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: selected ? color : "#1e293b", marginBottom: 3 }}>{title}</div>
                    <div style={{ fontSize: 11.5, color: "#94a3b8", lineHeight: 1.4 }}>{desc}</div>
                  </button>
                );
              })}
            </div>

            {/* Banner */}
            <div style={{ background: banner.bg, border: `1px solid ${banner.border}`, borderRadius: 8, padding: "12px 16px", display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 20 }}>
              <svg style={{ flexShrink: 0, marginTop: 1, color: banner.color }} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              <p style={{ fontSize: 12.5, color: banner.color, lineHeight: 1.5, margin: 0 }}>{banner.text}</p>
            </div>

            {/* ID Photo */}
            <div style={s.sectionTitle}>ID Photo</div>
            {isContinuing ? (
              <div style={{ padding: 12, borderRadius: 8, background: "#f8fafc", border: "1px solid #e2e8f0", marginBottom: 8 }}>
                <div style={{ fontWeight: 700, color: "#2563eb", marginBottom: 6 }}>2×2 Photo Not Required</div>
                <div style={{ color: "#64748b", fontSize: 13 }}>Continuing students: we already have your photo on file. You can skip uploading a new 2×2 here. Proceed to the next step to upload your Clearance.</div>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 4 }}>
                <label htmlFor="photoInput" style={{ width: 90, height: 110, border: "2px dashed #e2e8f0", borderRadius: 8, background: "#f8fafc", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer", flexShrink: 0, overflow: "hidden" }}>
                  {photoSrc
                    ? <img src={photoSrc} alt="ID" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
                    : <><svg width="24" height="24" fill="none" stroke="#94a3b8" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span style={{ fontSize: 10, color: "#94a3b8", textAlign: "center" }}>Click to upload</span></>
                  }
                  <input type="file" id="photoInput" accept="image/*" style={{ display: "none" }} onChange={handlePhoto}/>
                </label>
                <div>
                  <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.6, margin: 0 }}>Upload a recent 2×2 ID photo (white background preferred).</p>
                  <ul style={{ fontSize: 11.5, color: "#94a3b8", paddingLeft: 16, marginTop: 6 }}>
                    <li>JPG or PNG, max 2 MB</li>
                    <li>Face must be clearly visible</li>
                    <li>No sunglasses or hats</li>
                    <li>Taken within the last 6 months</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Basic Information */}
            <div style={s.sectionTitle}>Basic Information</div>
            <div style={{ ...s.grid3, marginBottom: 16 }}>
              <Field label="Last Name" required>
                <input style={s.input} defaultValue={isContinuing ? "Regodo" : ""} placeholder={isContinuing ? "" : "Enter last name"}/>
              </Field>
              <Field label="First Name" required>
                <input style={s.input} defaultValue={isContinuing ? "Ron" : ""} placeholder={isContinuing ? "" : "Enter first name"}/>
              </Field>
              <Field label="Middle Name">
                <input style={s.input} defaultValue={isContinuing ? "Santos" : ""} placeholder={isContinuing ? "" : "Enter middle name"}/>
              </Field>
              <Field label="Suffix">
                <select style={s.select}><option>None</option><option>Jr.</option><option>Sr.</option><option>II</option><option>III</option></select>
              </Field>
              <Field label="Date of Birth" required>
                <input type="date" style={s.input} defaultValue={isContinuing ? "2004-03-15" : ""}/>
              </Field>
              <Field label="Sex" required>
                <select style={s.select}><option>Male</option><option>Female</option></select>
              </Field>
              <Field label="Civil Status">
                <select style={s.select}><option>Single</option><option>Married</option><option>Widowed</option></select>
              </Field>
              <Field label="Nationality" required>
                <input style={s.input} defaultValue={isContinuing ? "Filipino" : ""} placeholder="e.g. Filipino"/>
              </Field>
              <Field label="Religion">
                <input style={s.input} placeholder="Optional"/>
              </Field>
            </div>

            {/* Contact Details */}
            <div style={s.sectionTitle}>Contact Details</div>
            <div style={{ ...s.grid2, marginBottom: 16 }}>
              <Field label="Email Address" required>
                {isContinuing
                  ? <input style={s.inputReadonly} readOnly defaultValue="ron.regodo@student.onlium.edu.ph"/>
                  : <input style={s.input} placeholder="Enter your personal email address"/>
                }
              </Field>
              <Field label="Mobile Number" required>
                <input type="tel" style={s.input} defaultValue={isContinuing ? "+63 912 345 6789" : ""} placeholder={isContinuing ? "" : "+63 9XX XXX XXXX"}/>
              </Field>
              <Field label="Home Address" required colSpan>
                <input style={s.input} defaultValue={isContinuing ? "123 Sampaguita St., Quezon City, Metro Manila" : ""} placeholder={isContinuing ? "" : "Street, City, Province"}/>
              </Field>
              <Field label="Province">
                <input style={s.input} defaultValue={isContinuing ? "Metro Manila" : ""} placeholder={isContinuing ? "" : "Province"}/>
              </Field>
              <Field label="ZIP Code">
                <input style={s.input} defaultValue={isContinuing ? "1100" : ""} placeholder={isContinuing ? "" : "ZIP Code"}/>
              </Field>
            </div>

            {/* Parent / Guardian */}
            <div style={s.sectionTitle}>Parent / Guardian</div>
            <div style={{ ...s.grid3, marginBottom: 16 }}>
              <Field label="Guardian Name" required>
                <input style={s.input} defaultValue={isContinuing ? "Maria Regodo" : ""} placeholder={isContinuing ? "" : "Full name"}/>
              </Field>
              <Field label="Relationship" required>
                <select style={s.select}><option>Mother</option><option>Father</option><option>Guardian</option></select>
              </Field>
              <Field label="Contact Number" required>
                <input type="tel" style={s.input} defaultValue={isContinuing ? "+63 923 456 7890" : ""} placeholder={isContinuing ? "" : "+63 9XX XXX XXXX"}/>
              </Field>
              <Field label="Guardian Address" colSpan>
                <input style={s.input} defaultValue={isContinuing ? "Same as above" : ""} placeholder={isContinuing ? "" : "If different from student address"}/>
              </Field>
            </div>

            {/* Previous School — Transferee only */}
            {isTransferee && (
              <>
                <div style={{ ...s.sectionTitle, color: "#d97706", borderBottom: "1px solid #fef3c7" }}>
                  Previous School
                  <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: "#fef3c7", color: "#92400e", letterSpacing: 0.5 }}>TRANSFEREE ONLY</span>
                </div>
                <div style={{ ...s.grid2, marginBottom: 16 }}>
                  <Field label="Previous School Name" required>
                    <input style={s.input} placeholder="e.g. University of Santo Tomas"/>
                  </Field>
                  <Field label="Previous Program" required>
                    <input style={s.input} placeholder="e.g. BS Computer Science"/>
                  </Field>
                  <Field label="Last Year Level Completed" required>
                    <select style={s.select}><option value="">Select...</option><option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option></select>
                  </Field>
                  <Field label="Last School Year" required>
                    <input style={s.input} placeholder="e.g. 2024–2025"/>
                  </Field>
                  <Field label="Reason for Transfer" colSpan>
                    <input style={s.input} placeholder="Optional"/>
                  </Field>
                </div>
              </>
            )}

            {/* Academic Information */}
            <div style={s.sectionTitle}>Academic Information</div>
            {isContinuing ? (
              <div style={s.grid2}>
                <Field label="Student ID">
                  <input style={s.inputReadonly} readOnly defaultValue="ONLS-2025-00124"/>
                </Field>
                <Field label="Student Type">
                  <input style={s.inputReadonly} readOnly defaultValue="Continuing Student"/>
                </Field>
                <Field label="Program" required>
                  <input style={s.inputReadonly} readOnly defaultValue="BS Information Technology"/>
                </Field>
                <Field label="Year Level" required>
                  <input style={s.inputReadonly} readOnly defaultValue="2nd Year"/>
                </Field>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10 }}>
                <StudentTypeBadge type={studentType}/>
                <p style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.5, margin: 0 }}>
                  {studentType === "new"
                    ? "Your Student ID, program, and year level will be automatically assigned after your enrollment is processed."
                    : "Your Student ID and program placement will be determined after evaluation of your transfer credentials."}
                </p>
              </div>
            )}
          </div>

          {/* Card Footer */}
          <div style={{ padding: "16px 24px", borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f8fafc" }}>
            <span style={{ fontSize: 11.5, color: "#94a3b8" }}>Step 1 of 6 — All required fields must be filled</span>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ padding: "10px 22px", borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: "pointer", background: "#fff", border: "1.5px solid #e2e8f0", color: "#475569", fontFamily: "'DM Sans',sans-serif" }}>
                Save Draft
              </button>
              <button
                onClick={() => onNext && onNext(studentType)}
                style={{ padding: "10px 22px", borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: "pointer", background: "#2563eb", border: "none", color: "#fff", display: "flex", alignItems: "center", gap: 8, fontFamily: "'DM Sans',sans-serif" }}
              >
                Next: Upload Requirements
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}