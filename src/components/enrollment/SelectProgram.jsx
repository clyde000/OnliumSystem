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
        {/* Program grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginBottom:24 }}>
          {PROGRAMS.map(p => {
            const isSel  = selected === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelected(p.id)}
                style={{
                  border: isSel ? `2px solid #2563eb` : "1.5px solid #e2e8f0",
                  borderRadius:12, padding:20, cursor: "pointer",
                  background: "#fff", 
                  transition:"all .2s",
                }}
              >
                <div style={{ display:"inline-flex", padding:"4px 12px", borderRadius:20, background: "#2563eb", color: "#fff", fontSize:11, fontWeight:700, marginBottom:12, letterSpacing:.5 }}>
                  {p.code}
                </div>
                <div style={{ fontSize:13, fontWeight:600, marginBottom:2, color:"#1e293b" }}>{p.label}</div>
                <div style={{ fontSize:11, color:"#94a3b8", marginBottom:6 }}>{p.dept}</div>
                <div style={{ fontSize:11.5, color:"#64748b", lineHeight:1.5 }}>{p.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding:"16px 24px", borderTop:"1px solid #f1f5f9", display:"flex", alignItems:"center", justifyContent:"flex-end", background:"#f8fafc" }}>
        <button onClick={() => onNext(selected)} style={{ padding:"10px 22px", borderRadius:8, fontSize:13.5, fontWeight:600, cursor:"pointer", background:"#2563eb", border:"none", color:"#fff", display:"flex", alignItems:"center", gap:8 }}>
          Next: Choose Schedule
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
}