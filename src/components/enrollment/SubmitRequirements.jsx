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
  const [checked,     setChecked]     = useState({});
  const [submitting,  setSubmitting]  = useState(false);
  const [submitted,   setSubmitted]   = useState(false);

  const allChecked = CHECKLIST.every(c => checked[c.id]);

  function toggle(id) {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function handleSubmit() {
    if (!allChecked) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1800);
  }

  // ── Submitted / pending admin review state ──
  if (submitted) {
    return (
      <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:12, boxShadow:"0 1px 3px rgba(0,0,0,.08)", overflow:"hidden" }}>
        <div style={{ padding:48, textAlign:"center" }}>
          {/* Animated pending icon */}
          <div style={{ width:80, height:80, borderRadius:"50%", background:"#fffbeb", border:"3px solid #fcd34d", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", fontSize:36 }}>
            ⏳
          </div>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:20, fontWeight:700, marginBottom:8 }}>Requirements Submitted!</h2>
          <p style={{ fontSize:13.5, color:"#64748b", maxWidth:440, margin:"0 auto 24px", lineHeight:1.6 }}>
            Your enrollment requirements have been sent for <strong>Admin Review</strong>. Please wait while your documents are being verified. You will be notified once approved.
          </p>

          {/* Status timeline */}
          <div style={{ maxWidth:400, margin:"0 auto 28px", textAlign:"left" }}>
            {[
              { label:"Requirements Submitted",    note:"Your documents have been sent",        done:true,    icon:"✅" },
              { label:"Under Admin Review",         note:"Documents are being verified",          active:true,  icon:"🔍" },
              { label:"Approval / Feedback",        note:"You will receive a notification",       done:false,   icon:"📩" },
              { label:"Proceed to Payment",         note:"Appoint payment at the Cashier",        done:false,   icon:"💳" },
            ].map((s, i) => (
              <div key={i} style={{ display:"flex", gap:14, marginBottom: i < 3 ? 0 : 0, position:"relative" }}>
                {/* line */}
                {i < 3 && <div style={{ position:"absolute", left:19, top:36, width:2, height:32, background: s.done ? "#16a34a" : "#e2e8f0" }}/>}
                <div style={{ width:40, height:40, borderRadius:"50%", background: s.done ? "#f0fdf4" : s.active ? "#fffbeb" : "#f8fafc", border:`2px solid ${s.done ? "#16a34a" : s.active ? "#f59e0b" : "#e2e8f0"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:16 }}>
                  {s.icon}
                </div>
                <div style={{ paddingBottom:24 }}>
                  <div style={{ fontSize:13, fontWeight:700, color: s.done ? "#16a34a" : s.active ? "#d97706" : "#94a3b8" }}>{s.label}</div>
                  <div style={{ fontSize:11.5, color:"#94a3b8", marginTop:2 }}>{s.note}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display:"inline-flex", padding:"10px 20px", background:"#fffbeb", border:"1.5px solid #fcd34d", borderRadius:8, fontSize:12.5, color:"#92400e", gap:8, alignItems:"center", marginBottom:24 }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
            Pending requirements will be followed up by the admin.
          </div>

          <div>
            <button onClick={onNext} style={{ padding:"12px 28px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer", background:"#2563eb", border:"none", color:"#fff", display:"inline-flex", alignItems:"center", gap:8 }}>
              Continue to Appoint Payment
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
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
        {/* Warning */}
        <div style={{ background:"#fff7ed", border:"1px solid #fed7aa", borderRadius:8, padding:"12px 16px", display:"flex", gap:10, alignItems:"flex-start", marginBottom:24 }}>
          <svg style={{ flexShrink:0, marginTop:1, color:"#ea580c" }} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <p style={{ fontSize:12.5, color:"#9a3412", lineHeight:1.5 }}>
            <strong>Please review everything carefully.</strong> Once submitted, your requirements will be reviewed by the admin. Changes to your program or schedule require a formal request at the Registrar's Office.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
          {/* Summary */}
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"#2563eb", marginBottom:14, paddingBottom:6, borderBottom:"1px solid #eff6ff" }}>
              Enrollment Summary
            </div>
            <div style={{ border:"1px solid #e2e8f0", borderRadius:10, overflow:"hidden" }}>
              {SUMMARY_ROWS.map((row, i) => (
                <div key={row.label} style={{ display:"flex", justifyContent:"space-between", padding:"10px 16px", background: i % 2 === 0 ? "#f8fafc" : "#fff", borderBottom: i < SUMMARY_ROWS.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                  <span style={{ fontSize:12, color:"#64748b" }}>{row.label}</span>
                  <span style={{ fontSize:12, fontWeight:600 }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* What happens next */}
            <div style={{ marginTop:16, padding:"14px 16px", background:"#f0fdf4", border:"1px solid #86efac", borderRadius:10 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:.8, textTransform:"uppercase", color:"#16a34a", marginBottom:10 }}>After You Submit</div>
              {[
                { icon:"🔍", text:"Admin reviews your documents and photo" },
                { icon:"📩", text:"You'll receive a notification once approved" },
                { icon:"💳", text:"Proceed to appoint an initial payment slot" },
              ].map((s, i) => (
                <div key={i} style={{ display:"flex", gap:8, marginBottom:i < 2 ? 8 : 0, alignItems:"center" }}>
                  <span style={{ fontSize:16 }}>{s.icon}</span>
                  <span style={{ fontSize:12, color:"#166534" }}>{s.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"#2563eb", marginBottom:14, paddingBottom:6, borderBottom:"1px solid #eff6ff" }}>
              Confirmation Checklist
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {CHECKLIST.map(item => (
                <div
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  style={{ display:"flex", gap:12, padding:"11px 14px", border:`1.5px solid ${checked[item.id] ? "#86efac" : "#e2e8f0"}`, borderRadius:8, cursor:"pointer", background: checked[item.id] ? "#f0fdf4" : "#fff", transition:"all .2s" }}
                >
                  <div style={{ width:20, height:20, borderRadius:5, border:`2px solid ${checked[item.id] ? "#16a34a" : "#e2e8f0"}`, background: checked[item.id] ? "#16a34a" : "#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1, transition:"all .2s" }}>
                    {checked[item.id] && <svg width="10" height="10" fill="none" stroke="#fff" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <div>
                    <div style={{ fontSize:12.5, fontWeight:600, lineHeight:1.4, color: checked[item.id] ? "#166534" : "#1e293b" }}>{item.label}</div>
                    <div style={{ fontSize:11, color:"#94a3b8", marginTop:3 }}>{item.note}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop:14, padding:"12px 14px", background: allChecked ? "#f0fdf4" : "#f8fafc", border:`1px solid ${allChecked ? "#86efac" : "#e2e8f0"}`, borderRadius:8, fontSize:12, color: allChecked ? "#166534" : "#64748b", textAlign:"center", fontWeight:600, transition:"all .2s" }}>
              {allChecked ? "✓ All items confirmed — ready to submit!" : `${CHECKLIST.filter(c => !checked[c.id]).length} item(s) left to confirm`}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding:"16px 24px", borderTop:"1px solid #f1f5f9", display:"flex", alignItems:"center", justifyContent:"space-between", background:"#f8fafc" }}>
        <button onClick={onBack} style={{ padding:"10px 22px", borderRadius:8, fontSize:13.5, fontWeight:600, cursor:"pointer", background:"#fff", border:"1.5px solid #e2e8f0", color:"#475569", display:"flex", alignItems:"center", gap:8 }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!allChecked || submitting}
          style={{ padding:"10px 22px", borderRadius:8, fontSize:13.5, fontWeight:600, cursor: allChecked && !submitting ? "pointer" : "not-allowed", background: allChecked ? "#2563eb" : "#93c5fd", border:"none", color:"#fff", display:"flex", alignItems:"center", gap:8, opacity: allChecked ? 1 : .7 }}
        >
          {submitting ? (
            <><svg style={{ animation:"spin 1s linear infinite" }} width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Submitting…</>
          ) : (
            <>Submit for Admin Review<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg></>
          )}
        </button>
      </div>
      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );
}