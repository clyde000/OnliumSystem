import { useState } from "react";

const SUBJECTS = [];

const TYPE_COLOR = { Lecture:"#2563eb", "Lecture / Lab":"#7c3aed", Activity:"#16a34a", Service:"#d97706" };

const SHIFTS = [
  { key:"morning",   label:"Morning",     icon:"🌅", desc:"Sections starting before 12:00 PM" },
  { key:"afternoon", label:"Afternoon",   icon:"☀️",  desc:"Sections starting 12:00 PM – 5:00 PM" },
  { key:"evening",   label:"Evening",     icon:"🌙", desc:"Sections starting after 5:00 PM" },
];

export default function ChooseSchedule({ onBack, onNext }) {
  const [picks,    setPicks]    = useState({});
  const [expanded, setExpanded] = useState("cc101");
  const [shift,    setShift]    = useState("morning");

  const allPicked  = SUBJECTS.every(s => picks[s.id]);
  const totalUnits = SUBJECTS.reduce((sum, s) => picks[s.id] ? sum + s.units : sum, 0);

  function pick(subjectId, sectionId) {
    setPicks(prev => ({ ...prev, [subjectId]: sectionId }));
  }

  // Filter sections by chosen shift (always show picked section even if filtered out)
  function visibleSections(subj) {
    return subj.sections.filter(sec => sec.shift === shift || picks[subj.id] === sec.id);
  }

  return (
    <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:12, boxShadow:"0 1px 3px rgba(0,0,0,.08)", overflow:"hidden" }}>
      {/* Header */}
      <div style={{ padding:"20px 24px 16px", borderBottom:"1px solid #f1f5f9", display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:40, height:40, borderRadius:10, background:"#eff6ff", display:"flex", alignItems:"center", justifyContent:"center", color:"#2563eb", flexShrink:0 }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        </div>
        <div>
          <div style={{ fontFamily:"'Sora',sans-serif", fontSize:15, fontWeight:700 }}>Choose Schedule</div>
          <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>Select your preferred shift, then pick a section for each subject</div>
        </div>
        {/* Units pill */}
        <div style={{ marginLeft:"auto", background: allPicked ? "#dcfce7" : "#eff6ff", border:`1px solid ${allPicked ? "#86efac" : "#bfdbfe"}`, borderRadius:20, padding:"6px 14px", textAlign:"center" }}>
          <div style={{ fontSize:18, fontWeight:700, color: allPicked ? "#16a34a" : "#2563eb", lineHeight:1 }}>{totalUnits}</div>
          <div style={{ fontSize:10, color:"#64748b" }}>Total Units</div>
        </div>
      </div>

      <div style={{ padding:24 }}>

        {/* ── Shift Preference Selector ── */}
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"#2563eb", marginBottom:12, paddingBottom:6, borderBottom:"1px solid #eff6ff" }}>
          Preferred Schedule Shift
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:10, marginBottom:20 }}>
          {SHIFTS.map(({ key, label, icon, desc }) => {
            const active = shift === key;
            return (
              <button
                key={key}
                onClick={() => setShift(key)}
                style={{
                  padding:"12px 14px", borderRadius:10, cursor:"pointer", textAlign:"left",
                  border: active ? "2px solid #2563eb" : "1.5px solid #e2e8f0",
                  background: active ? "#eff6ff" : "#fff",
                  outline:"none", transition:"all .15s",
                }}
              >
                <div style={{ fontSize:20, marginBottom:6 }}>{icon}</div>
                <div style={{ fontSize:13, fontWeight:700, color: active ? "#2563eb" : "#1e293b", marginBottom:2 }}>{label}</div>
                <div style={{ fontSize:11, color:"#94a3b8", lineHeight:1.4 }}>{desc}</div>
              </button>
            );
          })}
        </div>

        {/* Progress */}
        <div style={{ background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:8, padding:"12px 18px", display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
          <div style={{ fontSize:13 }}>
            <span style={{ fontWeight:700, fontSize:20, color:"#2563eb", marginRight:6 }}>{Object.keys(picks).length}</span>
            of <strong>{SUBJECTS.length}</strong> subjects with a selected section
          </div>
          <div style={{ display:"flex", gap:6 }}>
            {SUBJECTS.map(s => (
              <div key={s.id} style={{ width:10, height:10, borderRadius:"50%", background: picks[s.id] ? "#16a34a" : "#e2e8f0", transition:"background .2s" }}/>
            ))}
          </div>
        </div>

        {/* Accordion */}
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {SUBJECTS.map(subj => {
            const isOpen    = expanded === subj.id;
            const pickedSec = subj.sections.find(s => s.id === picks[subj.id]);
            const tc        = TYPE_COLOR[subj.type] || "#64748b";
            const secs      = visibleSections(subj);
            return (
              <div key={subj.id} style={{ border: pickedSec ? "1.5px solid #86efac" : "1.5px solid #e2e8f0", borderRadius:10, overflow:"hidden", transition:"border-color .2s" }}>
                {/* Accordion header */}
                <div
                  onClick={() => setExpanded(isOpen ? null : subj.id)}
                  style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 18px", cursor:"pointer", background: isOpen ? "#f8fafc" : "#fff" }}
                >
                  <div style={{ width:36, height:36, borderRadius:8, background:`${tc}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <svg width="16" height="16" fill="none" stroke={tc} strokeWidth="2" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontWeight:700, fontSize:13, color:tc }}>{subj.code}</span>
                      <span style={{ fontSize:12.5, fontWeight:600 }}>{subj.title}</span>
                    </div>
                    <div style={{ fontSize:11, color:"#94a3b8", marginTop:2 }}>{subj.units} units · {subj.type}</div>
                  </div>
                  {pickedSec
                    ? <span style={{ fontSize:11.5, color:"#16a34a", fontWeight:600, background:"#dcfce7", padding:"3px 10px", borderRadius:20 }}>✓ {pickedSec.label} — {pickedSec.time}</span>
                    : <span style={{ fontSize:11, color:"#dc2626", background:"#fee2e2", padding:"3px 10px", borderRadius:20, fontWeight:600 }}>Not selected</span>
                  }
                  <svg style={{ transform: isOpen ? "rotate(180deg)" : "none", transition:"transform .2s", flexShrink:0, color:"#94a3b8" }} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
                </div>

                {/* Sections */}
                {isOpen && (
                  <div style={{ borderTop:"1px solid #f1f5f9", padding:"14px 18px", display:"flex", flexDirection:"column", gap:10 }}>
                    {secs.length === 0 && (
                      <div style={{ fontSize:12, color:"#94a3b8", textAlign:"center", padding:"16px 0" }}>
                        No {shift} sections available for this subject.
                      </div>
                    )}
                    {secs.map(sec => {
                      const isSel  = picks[subj.id] === sec.id;
                      const isFull = sec.slots === 0;
                      const shiftIcon = { morning:"🌅", afternoon:"☀️", evening:"🌙" }[sec.shift] || "";
                      return (
                        <div
                          key={sec.id}
                          onClick={() => !isFull && pick(subj.id, sec.id)}
                          style={{
                            border: isSel ? "2px solid #2563eb" : "1.5px solid #e2e8f0",
                            borderRadius:8, padding:"12px 14px", cursor: isFull ? "not-allowed" : "pointer",
                            background: isSel ? "#eff6ff" : "#fff", opacity: isFull ? .5 : 1,
                            display:"flex", alignItems:"center", gap:14, transition:"all .2s",
                          }}
                        >
                          {/* Radio dot */}
                          <div style={{ width:18, height:18, borderRadius:"50%", border:`2px solid ${isSel ? "#2563eb" : "#e2e8f0"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, background: isSel ? "#2563eb" : "#fff" }}>
                            {isSel && <div style={{ width:8, height:8, borderRadius:"50%", background:"#fff" }}/>}
                          </div>
                          <div style={{ flex:1 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
                              <span style={{ fontSize:13, fontWeight:600 }}>{sec.label}</span>
                              <span style={{ fontSize:10, padding:"1px 6px", borderRadius:20, background:"#f1f5f9", color:"#64748b" }}>{shiftIcon} {sec.shift}</span>
                            </div>
                            <div style={{ fontSize:11.5, color:"#64748b", marginTop:2 }}>
                              <span style={{ fontWeight:600 }}>{sec.sched}</span> · {sec.time} · {sec.room}
                            </div>
                            <div style={{ fontSize:11, color:"#94a3b8", marginTop:1 }}>{sec.instructor}</div>
                          </div>
                          <div style={{ textAlign:"right", flexShrink:0 }}>
                            <div style={{ fontSize:11, fontWeight:700, color: isFull ? "#dc2626" : sec.slots <= 5 ? "#d97706" : "#16a34a" }}>
                              {isFull ? "FULL" : `${sec.slots} slots`}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding:"16px 24px", borderTop:"1px solid #f1f5f9", display:"flex", alignItems:"center", justifyContent:"space-between", background:"#f8fafc" }}>
        <button onClick={onBack} style={{ padding:"10px 22px", borderRadius:8, fontSize:13.5, fontWeight:600, cursor:"pointer", background:"#fff", border:"1.5px solid #e2e8f0", color:"#475569", display:"flex", alignItems:"center", gap:8 }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
          Back
        </button>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <span style={{ fontSize:11.5, color: allPicked ? "#16a34a" : "#dc2626" }}>
            {allPicked ? "All subjects scheduled ✓" : `${SUBJECTS.length - Object.keys(picks).length} subject(s) without a section`}
          </span>
          <button onClick={() => allPicked && onNext(picks)} disabled={!allPicked} style={{ padding:"10px 22px", borderRadius:8, fontSize:13.5, fontWeight:600, cursor: allPicked ? "pointer" : "not-allowed", background: allPicked ? "#2563eb" : "#93c5fd", border:"none", color:"#fff", display:"flex", alignItems:"center", gap:8, opacity: allPicked ? 1 : .7 }}>
            Next: Upload Picture
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}