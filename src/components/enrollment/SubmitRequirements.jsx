import { useState } from "react";

export default function SubmitRequirements({ onBack, onNext, onSubmitted, studentType = "continuing", irregular = null }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmAll, setConfirmAll] = useState(false);
  const [confirmPending, setConfirmPending] = useState(false);

  const TYPE_LABEL = {
    new: "New Student",
    transferee: "Transferee",
    continuing: "Continuing Student",
  };

  const yearLevelLabel = studentType === "continuing"
    ? `2nd Year — Continuing${irregular === "yes" ? " (Irregular)" : irregular === "no" ? " (Regular)" : ""}`
    : studentType === "new" ? "1st Year — New Student"
    : "Year Level TBD — Transferee";

  const SUMMARY_ROWS = [
    { label: "Student Name",  value: "Ron Regodo" },
    { label: "Student ID",    value: "ONLS-2025-00124" },
    { label: "Student Type",  value: TYPE_LABEL[studentType] },
    ...(studentType === "continuing" && irregular ? [{ label: "Student Status", value: irregular === "yes" ? "Irregular Student" : "Regular Student" }] : []),
    { label: "Program",       value: "BS Information Technology" },
    { label: "Year Level",    value: yearLevelLabel },
    { label: "School Year",   value: "2026" },
    ...(irregular !== "yes" ? [
      { label: "Total Units", value: "17 units" },
      { label: "Subjects",    value: "6 subjects" },
    ] : []),
    { label: "Uploaded Docs", value: "Requirements uploaded" },
    ...(studentType === "continuing" ? [{ label: "Clearance", value: "Uploaded ✓" }] : []),
  ];

  function handleSubmit() {
    setSubmitting(true);
    const user = JSON.parse(localStorage.getItem("onlium_current_user") || "{}");
    const enrollmentData = {
      studentType,
      irregular,
      approved: false,
      submittedAt: new Date().toISOString(),
      studentName: user.firstName && user.lastName ? `${user.lastName}, ${user.firstName}` : "Student",
      email: user.email || "",
      summary: SUMMARY_ROWS,
    };
    localStorage.setItem("onlium_enrollment", JSON.stringify(enrollmentData));

    // Save to admin submissions list
    const existing = JSON.parse(localStorage.getItem("onlium_submissions") || "[]");
    const idx = existing.findIndex(s => s.email === user.email);
    if (idx >= 0) existing[idx] = enrollmentData;
    else existing.push(enrollmentData);
    localStorage.setItem("onlium_submissions", JSON.stringify(existing));

    // Mark progress
    if (user.email) {
      const key = `onlium_progress_${user.email}`;
      const progress = {
        personal: true, upload: true,
        program: studentType !== "continuing",
        schedule: !(studentType === "continuing" && irregular === "yes"),
        submit: true,
      };
      localStorage.setItem(key, JSON.stringify(progress));
    }
    setTimeout(() => { setSubmitting(false); setSubmitted(true); if (onSubmitted) onSubmitted(); }, 1800);
  }

  // Success screen
  if (submitted) {
    return (
      <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:12, padding:48, textAlign:"center" }}>
        <div style={{ width:64, height:64, borderRadius:"50%", background:"#f0fdf4", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
          <svg width="28" height="28" fill="none" stroke="#16a34a" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <span style={{ display:"inline-block", padding:"4px 14px", borderRadius:20, background:"#f0fdf4", color:"#16a34a", fontSize:12, fontWeight:700, border:"1px solid #86efac", marginBottom:16 }}>
          Successfully Submitted
        </span>
        <h2 style={{ fontSize:20, fontWeight:700, color:"#1e293b", margin:"0 0 10px" }}>Requirements Submitted!</h2>
        <p style={{ fontSize:14, color:"#64748b", lineHeight:1.7, maxWidth:440, margin:"0 auto 28px" }}>
          Your enrollment requirements have been submitted successfully. Please wait for the admin to review and approve your application. You will be notified once it's processed.
        </p>
        <div style={{ background:"#fffbeb", border:"1px solid #fcd34d", borderRadius:10, padding:"14px 20px", display:"inline-flex", alignItems:"center", gap:10, marginBottom:28 }}>
          <svg width="16" height="16" fill="none" stroke="#d97706" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          <span style={{ fontSize:13, color:"#92400e", fontWeight:500 }}>Status: Waiting for admin approval</span>
        </div>
        <br/>
        <button onClick={() => onNext && onNext()} style={{ padding:"10px 28px", borderRadius:8, background:"#2563eb", color:"#fff", border:"none", fontWeight:600, fontSize:14, cursor:"pointer" }}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:12, boxShadow:"0 1px 3px rgba(0,0,0,.08)", overflow:"hidden" }}>
      {/* Header */}
      <div style={{ padding:"20px 24px 16px", borderBottom:"1px solid #f1f5f9", display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:40, height:40, borderRadius:10, background:"#eff6ff", display:"flex", alignItems:"center", justifyContent:"center", color:"#2563eb", flexShrink:0 }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        </div>
        <div>
          <div style={{ fontFamily:"'Sora',sans-serif", fontSize:15, fontWeight:700 }}>Submit Requirements</div>
          <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>Review your enrollment summary, confirm all items, then submit for admin review</div>
        </div>
      </div>

      <div style={{ padding:24 }}>
<div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"#2563eb", marginBottom:14, paddingBottom:6, borderBottom:"1px solid #eff6ff" }}>
              Enrollment Summary
            </div>
            <div style={{ border:"1px solid #e2e8f0", borderRadius:10, overflow:"hidden" }}>
              {SUMMARY_ROWS.map((row, i) => (
                <div key={row.label} style={{ display:"flex", justifyContent:"space-between", padding:"12px 16px", background: i % 2 === 0 ? "#f8fafc" : "#fff", borderBottom: i < SUMMARY_ROWS.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                  <span style={{ fontSize:12, color:"#64748b" }}>{row.label}</span>
                  <span style={{ fontSize:12, fontWeight:600 }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Confirmation Checklist */}
            <div style={{ marginTop:18 }}>
              <div style={{ fontSize:13, fontWeight:700, marginBottom:8 }}>Confirmation Checklist</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                <label style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", borderRadius:8, background:"#fff", border:"1px solid #eef2f6" }}>
                  <input type="checkbox" checked={confirmAll} onChange={e => setConfirmAll(e.target.checked)} />
                  <div style={{ fontSize:13, color:"#0f172a" }}>I confirm that all my information and uploaded documents are accurate</div>
                </label>

                <label style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", borderRadius:8, background:"#fff", border:"1px solid #eef2f6" }}>
                  <input type="checkbox" checked={confirmPending} onChange={e => setConfirmPending(e.target.checked)} />
                  <div style={{ fontSize:13, color:"#0f172a" }}>I understand that my enrollment is pending admin approval</div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding:"16px 24px", borderTop:"1px solid #f1f5f9", display:"flex", alignItems:"center", justifyContent:"space-between", background:"#f8fafc" }}>
        <div>
          <button onClick={onBack} style={{ padding:"10px 18px", borderRadius:8, background:"#fff", border:"1.5px solid #e2e8f0", color:"#475569", fontWeight:600, cursor:"pointer" }}>
            ← Back
          </button>
        </div>

        <div>
          <button
            onClick={handleSubmit}
            disabled={submitting || !(confirmAll && confirmPending)}
            style={{ padding:"10px 22px", borderRadius:8, fontSize:13.5, fontWeight:600, cursor: submitting || !(confirmAll && confirmPending) ? "not-allowed" : "pointer", background: (confirmAll && confirmPending) ? "#2563eb" : "#cbd5e1", border:"none", color:(confirmAll && confirmPending) ? "#fff" : "#9aa5b2", display:"flex", alignItems:"center", gap:8, opacity: submitting ? .7 : 1 }}
          >
            {submitting ? (
              <><svg style={{ animation:"spin 1s linear infinite" }} width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Submitting…</>
            ) : (
              <>Complete Enrollment<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg></>
            )}
          </button>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );
}