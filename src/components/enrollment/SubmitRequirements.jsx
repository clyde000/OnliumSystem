import { useState } from "react";

const CHECKLIST = [
  { id:"c1", label:"All personal information is accurate and complete",        note:"Review Step 1 if you need to make changes." },
  { id:"c2", label:"All required documents are uploaded and legible",           note:"Blurry or incomplete documents may cause delays." },
  { id:"c3", label:"Selected program matches my intended degree",               note:"Program change after submission requires Registrar approval." },
  { id:"c4", label:"Selected schedule has no time conflicts",                   note:"Double-check overlapping classes before submitting." },
  { id:"c5", label:"My 2×2 photo has a white background and is clearly visible", note:"Photos not meeting requirements will be rejected." },
  { id:"c6", label:"I understand enrollment is not final until payment is made", note:"Proceed to the cashier within 3 days of submission." },
  { id:"c7", label:"I have read and agree to the ONLIUM Enrollment Terms",      note:"Available at the Registrar's office or on the portal." },
];

const SUMMARY_ROWS = [
  { label:"Student Name",  value:"Ron Regodo" },
  { label:"Student ID",    value:"ONLS-2025-00124" },
  { label:"Program",       value:"BS Information Technology" },
  { label:"Year Level",    value:"2nd Year — Continuing" },
  { label:"School Year",   value:"2026" },
  { label:"Total Units",   value:"17 units" },
  { label:"Subjects",      value:"6 subjects" },
  { label:"Uploaded Docs", value:"Requirements uploaded" },
  { label:"Photo",         value:"2×2 ID photo uploaded" },
];

export default function SubmitRequirements({ onBack, onNext }) {
  const [submitting,  setSubmitting]  = useState(false);
  const [confirmAll, setConfirmAll] = useState(false);
  const [confirmPending, setConfirmPending] = useState(false);

  function handleSubmit() {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); if (onNext) onNext(); }, 1800);
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
        {/* Warning */}
        <div style={{ background:"#fff7ed", border:"1px solid #fed7aa", borderRadius:8, padding:"12px 16px", display:"flex", gap:10, alignItems:"flex-start", marginBottom:24 }}>
          <svg style={{ flexShrink:0, marginTop:1, color:"#ea580c" }} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <p style={{ fontSize:12.5, color:"#9a3412", lineHeight:1.5 }}>
            <strong>Please review everything carefully.</strong> Once submitted, your requirements will be reviewed by the admin. Changes to your program or schedule require a formal request at the Registrar's Office.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
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

          <aside>
            <div style={{ padding:18, borderRadius:10, background:"#f1f8ff", border:"1px solid #dbeafe" }}>
              <div style={{ fontSize:15, fontWeight:700, marginBottom:8 }}>After You Submit</div>
              <ol style={{ paddingLeft:18, margin:0 }}>
                <li style={{ marginBottom:8 }}><strong>Admin reviews your documents</strong><div style={{ fontSize:12, color:"#64748b" }}>Verification in progress</div></li>
                <li style={{ marginBottom:8 }}><strong>Receive notification</strong><div style={{ fontSize:12, color:"#64748b" }}>We will inform you of approval</div></li>
                <li><strong>Schedule payment</strong><div style={{ fontSize:12, color:"#64748b" }}>Proceed to appoint payment to complete enrollment</div></li>
              </ol>
            </div>
          </aside>
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
              <>Next: Finalize Enrollment<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg></>
            )}
          </button>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );
}