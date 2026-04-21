import { useState } from "react";

const PROGRAMS = [
  {
    id: "bsa",
    code: "BSA",
    label: "BS Accounting",
    dept: "College of Business",
    slots: 12,
    total: 30,
    desc: "Program focused on accounting principles, auditing, and taxation.",
    tags: ["Accounting", "Audit", "Tax"],
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    id: "bsba",
    code: "BSBA",
    label: "BS Business Administration",
    dept: "College of Business",
    slots: 20,
    total: 40,
    desc: "Core business skills in management, marketing, and finance.",
    tags: ["Management", "Marketing", "Finance"],
    color: "#16a34a",
    bg: "#f0fdf4",
  },
  {
    id: "bshm",
    code: "BSHM",
    label: "BS Hospitality Management",
    dept: "College of Hospitality",
    slots: 8,
    total: 30,
    desc: "Hospitality, tourism, and service management with practical training.",
    tags: ["Hospitality", "Tourism", "Service"],
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    id: "bscs",
    code: "BSCS",
    label: "BS Computer Science",
    dept: "College of Computing",
    slots: 16,
    total: 40,
    desc: "Algorithms, software engineering, and systems design.",
    tags: ["Algorithms", "AI", "Systems"],
    color: "#0891b2",
    bg: "#ecfeff",
  },
  {
    id: "bsit",
    code: "BSIT",
    label: "BS Information Technology",
    dept: "College of Computing",
    slots: 22,
    total: 40,
    desc: "Networking, web development, database management, and IT infrastructure.",
    tags: ["Networks", "Web", "Databases"],
    color: "#d97706",
    bg: "#fffbeb",
  },
];

export default function SelectProgram({ onBack, onNext }) {
  const [selected, setSelected] = useState("bsit");

  const prog = PROGRAMS.find(p => p.id === selected);

  return (
    <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:12, boxShadow:"0 1px 3px rgba(0,0,0,.08)", overflow:"hidden" }}>
      {/* Header */}
      <div style={{ padding:"20px 24px 16px", borderBottom:"1px solid #f1f5f9", display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:40, height:40, borderRadius:10, background:"#eff6ff", display:"flex", alignItems:"center", justifyContent:"center", color:"#2563eb", flexShrink:0 }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        </div>
        <div>
          <div style={{ fontFamily:"'Sora',sans-serif", fontSize:15, fontWeight:700 }}>Select Program</div>
          <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>Choose your degree program for SY 2026</div>
        </div>
      </div>

      <div style={{ padding:24 }}>
        {/* Info banner */}
        <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:8, padding:"12px 16px", display:"flex", gap:10, alignItems:"flex-start", marginBottom:20 }}>
          <svg style={{ flexShrink:0, marginTop:1, color:"#d97706" }} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          <p style={{ fontSize:12.5, color:"#92400e", lineHeight:1.5 }}>
            Your current program is pre-selected. You may switch programs subject to department approval and available slots. <strong>Full slots</strong> cannot be selected.
          </p>
        </div>

        {/* Program grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:24 }}>
          {PROGRAMS.map(p => {
            const isSel  = selected === p.id;
            const isFull = p.slots === 0;
            return (
              <div
                key={p.id}
                onClick={() => !isFull && setSelected(p.id)}
                style={{
                  border: isSel ? `2px solid ${p.color}` : "1.5px solid #e2e8f0",
                  borderRadius:10, padding:16, cursor: isFull ? "not-allowed" : "pointer",
                  background: isSel ? p.bg : "#fff", opacity: isFull ? .55 : 1,
                  transition:"all .2s", position:"relative",
                }}
              >
                {isSel && (
                  <div style={{ position:"absolute", top:10, right:10, width:20, height:20, borderRadius:"50%", background:p.color, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <svg width="10" height="10" fill="none" stroke="#fff" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                )}
                <div style={{ display:"inline-flex", padding:"3px 10px", borderRadius:20, background: isSel ? p.color : "#f1f5f9", color: isSel ? "#fff" : "#475569", fontSize:11, fontWeight:700, marginBottom:8, letterSpacing:.5 }}>
                  {p.code}
                </div>
                <div style={{ fontSize:13, fontWeight:600, marginBottom:4, lineHeight:1.4 }}>{p.label}</div>
                <div style={{ fontSize:11, color:"#94a3b8", marginBottom:8 }}>{p.dept}</div>
                <div style={{ fontSize:11.5, color:"#64748b", lineHeight:1.5, marginBottom:10 }}>{p.desc}</div>
                <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginBottom:10 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontSize:10, padding:"2px 7px", borderRadius:20, background:"#f1f5f9", color:"#475569" }}>{t}</span>
                  ))}
                </div>
                {/* Slot bar */}
                <div style={{ fontSize:10.5, color: isFull ? "#dc2626" : "#64748b", fontWeight:600, marginBottom:4 }}>
                  {isFull ? "FULL — No slots available" : `${p.slots} of ${p.total} slots available`}
                </div>
                <div style={{ height:4, borderRadius:99, background:"#e2e8f0", overflow:"hidden" }}>
                  <div style={{ height:"100%", borderRadius:99, width:`${((p.total - p.slots) / p.total) * 100}%`, background: isFull ? "#dc2626" : p.color, transition:"width .3s" }}/>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected summary */}
        {prog && (
          <div style={{ background: prog.bg, border:`1px solid ${prog.color}33`, borderRadius:10, padding:"14px 18px", display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:42, height:42, borderRadius:10, background: prog.color, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:12, flexShrink:0 }}>
              {prog.code.substring(0,2)}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, fontSize:13.5 }}>{prog.label}</div>
              <div style={{ fontSize:11.5, color:"#64748b" }}>{prog.dept} · {prog.slots} slots remaining</div>
            </div>
            <svg width="18" height="18" fill="none" stroke={prog.color} strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding:"16px 24px", borderTop:"1px solid #f1f5f9", display:"flex", alignItems:"center", justifyContent:"space-between", background:"#f8fafc" }}>
        <button onClick={onBack} style={{ padding:"10px 22px", borderRadius:8, fontSize:13.5, fontWeight:600, cursor:"pointer", background:"#fff", border:"1.5px solid #e2e8f0", color:"#475569", display:"flex", alignItems:"center", gap:8 }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
          Back
        </button>
        <button onClick={() => onNext(selected)} style={{ padding:"10px 22px", borderRadius:8, fontSize:13.5, fontWeight:600, cursor:"pointer", background:"#2563eb", border:"none", color:"#fff", display:"flex", alignItems:"center", gap:8 }}>
          Next: Choose Schedule
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
}