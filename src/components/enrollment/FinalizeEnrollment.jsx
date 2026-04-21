const SUBJECTS_FINAL = [
  { code:"CC 101",   title:"Introduction to Computing",   units:3, sched:"Mon / Wed", time:"7:30 – 9:00 AM",       room:"IT Lab 1",  instructor:"Prof. Santos" },
  { code:"CC 102",   title:"Programming Fundamentals",    units:3, sched:"Mon / Wed / Fri", time:"9:00 – 10:30 AM", room:"IT Lab 2",  instructor:"Prof. Villanueva" },
  { code:"MATH 201", title:"Discrete Mathematics",        units:3, sched:"Mon / Wed", time:"1:00 – 2:30 PM",       room:"Room 301",  instructor:"Prof. Cruz" },
  { code:"ENG 101",  title:"Technical Writing",           units:3, sched:"Tue / Thu", time:"7:30 – 9:00 AM",       room:"Room 105",  instructor:"Prof. Garcia" },
  { code:"PE 101",   title:"Physical Education 1",        units:2, sched:"Tue",        time:"3:00 – 5:00 PM",       room:"Gymnasium", instructor:"Coach Ramos" },
  { code:"NSTP 101", title:"National Service Training Program", units:3, sched:"Sat", time:"7:00 – 10:00 AM",      room:"AVR",       instructor:"Prof. Mendoza" },
];

// eslint-disable-next-line no-unused-vars
const NEXT_STEPS = [
  { icon:"💳", title:"Pay Tuition Fee", desc:"Visit the Cashier's Office within 3 business days. Bring your enrollment slip.", badge:"Urgent" },
  { icon:"📋", title:"Submit Physical Documents", desc:"Bring original copies of your requirements to the Registrar's Office.", badge:"Required" },
  { icon:"📱", title:"Access LMS", desc:"Log in to the Learning Management System to view your course materials.", badge:"Optional" },
  { icon:"📅", title:"Attend Orientation", desc:"BSIT 2nd Year orientation is on July 15, 2026 at 8:00 AM in AVR Hall.", badge:"Info" },
];

const BADGE_STYLES = {
  Urgent:   { bg:"#fee2e2", color:"#dc2626" },
  Required: { bg:"#fffbeb", color:"#d97706" },
  Optional: { bg:"#eff6ff", color:"#2563eb" },
  Info:     { bg:"#f0fdf4", color:"#16a34a" },
};

export default function FinalizeEnrollment({ onGoToStudyLoad }) {
  const refNum = "ENR-2026-00847";
  const today  = new Date().toLocaleDateString("en-PH", { year:"numeric", month:"long", day:"numeric" });

  function printSlip() { window.print(); }

  return (
    <div>
      {/* Success banner */}
      <div style={{ background:"linear-gradient(135deg, #1a3a6b 0%, #2563eb 100%)", borderRadius:12, padding:"32px 32px 28px", marginBottom:20, color:"#fff", position:"relative", overflow:"hidden" }}>
        {/* Background decoration */}
        <div style={{ position:"absolute", right:-30, top:-30, width:180, height:180, borderRadius:"50%", background:"rgba(255,255,255,.06)" }}/>
        <div style={{ position:"absolute", right:60, bottom:-50, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,.04)" }}/>

        <div style={{ display:"flex", alignItems:"flex-start", gap:20, position:"relative" }}>
          <div style={{ width:56, height:56, borderRadius:"50%", background:"rgba(255,255,255,.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <svg width="28" height="28" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:22, fontWeight:700, marginBottom:6 }}>Enrollment Submitted Successfully! 🎉</h2>
            <p style={{ fontSize:13.5, opacity:.85, lineHeight:1.6 }}>
              Your enrollment for SY 2026 has been received and is now pending payment confirmation. Please complete the next steps below.
            </p>
            <div style={{ marginTop:16, display:"flex", gap:16, flexWrap:"wrap" }}>
              <div style={{ background:"rgba(255,255,255,.12)", borderRadius:8, padding:"10px 18px" }}>
                <div style={{ fontSize:10, opacity:.7, letterSpacing:.8, textTransform:"uppercase" }}>Reference No.</div>
                <div style={{ fontSize:16, fontWeight:700, letterSpacing:.5 }}>{refNum}</div>
              </div>
              <div style={{ background:"rgba(255,255,255,.12)", borderRadius:8, padding:"10px 18px" }}>
                <div style={{ fontSize:10, opacity:.7, letterSpacing:.8, textTransform:"uppercase" }}>Date Submitted</div>
                <div style={{ fontSize:14, fontWeight:700 }}>{today}</div>
              </div>
              <div style={{ background:"rgba(255,255,255,.12)", borderRadius:8, padding:"10px 18px" }}>
                <div style={{ fontSize:10, opacity:.7, letterSpacing:.8, textTransform:"uppercase" }}>Status</div>
                <div style={{ fontSize:14, fontWeight:700 }}>⏳ Pending Payment</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        {/* Study Load */}
        <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:12, boxShadow:"0 1px 3px rgba(0,0,0,.08)", overflow:"hidden", gridColumn:"1/-1" }}>
          <div style={{ padding:"16px 24px", borderBottom:"1px solid #f1f5f9", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:14, fontWeight:700 }}>Enrolled Study Load</div>
              <div style={{ fontSize:11.5, color:"#94a3b8", marginTop:2 }}>17 units · 6 subjects · SY 2026</div>
            </div>
            <button onClick={printSlip} style={{ padding:"8px 16px", borderRadius:8, fontSize:12.5, fontWeight:600, cursor:"pointer", background:"#eff6ff", border:"1.5px solid #bfdbfe", color:"#2563eb", display:"flex", alignItems:"center", gap:6 }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              Print Enrollment Slip
            </button>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12.5 }}>
              <thead>
                <tr style={{ background:"#f8fafc" }}>
                  {['Subject Code','Description','Units','Schedule','Time','Room','Instructor'].map(h => (
                    <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontWeight:700, color:"#64748b", fontSize:11, letterSpacing:.5, textTransform:"uppercase", borderBottom:"1px solid #e2e8f0", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SUBJECTS_FINAL.map((s, i) => (
                  <tr key={s.code} style={{ borderBottom:"1px solid #f1f5f9", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{ padding:"11px 16px", fontWeight:700, color:"#2563eb", whiteSpace:"nowrap" }}>{s.code}</td>
                    <td style={{ padding:"11px 16px", fontWeight:500 }}>{s.title}</td>
                    <td style={{ padding:"11px 16px", textAlign:"center", fontWeight:600 }}>{s.units}</td>
                    <td style={{ padding:"11px 16px", whiteSpace:"nowrap" }}>{s.sched}</td>
                    <td style={{ padding:"11px 16px", whiteSpace:"nowrap" }}>{s.time}</td>
                    <td style={{ padding:"11px 16px", whiteSpace:"nowrap" }}>{s.room}</td>
                    <td style={{ padding:"11px 16px", color:"#64748b" }}>{s.instructor}</td>
                  </tr>
                ))}
                <tr style={{ background:"#eff6ff" }}>
                  <td colSpan={2} style={{ padding:"11px 16px", fontWeight:700, color:"#1d4ed8" }}>Total</td>
                  <td style={{ padding:"11px 16px", textAlign:"center", fontWeight:800, color:"#1d4ed8" }}>17</td>
                  <td colSpan={4}/>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Next Steps */}
        <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:12, boxShadow:"0 1px 3px rgba(0,0,0,.08)", overflow:"hidden" }}>
          <div style={{ padding:"16px 24px", borderBottom:"1px solid #f1f5f9" }}>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:14, fontWeight:700 }}>Next Steps</div>
            <div style={{ fontSize:11.5, color:"#94a3b8", marginTop:2 }}>Complete these to finalize your enrollment</div>
          </div>
          <div style={{ padding:20, display:"flex", flexDirection:"column", gap:12 }}>
            {NEXT_STEPS.map((step, i) => {
              const bs = BADGE_STYLES[step.badge];
              return (
                <div key={step.title} style={{ display:"flex", gap:14, padding:"12px 14px", border:"1px solid #e2e8f0", borderRadius:10 }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:"#f8fafc", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{step.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
                      <span style={{ fontSize:13, fontWeight:700 }}>{step.title}</span>
                      <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:20, background: bs.bg, color: bs.color }}>{step.badge}</span>
                    </div>
                    <p style={{ fontSize:11.5, color:"#64748b", lineHeight:1.5 }}>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Appointments */}
        <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:12, boxShadow:"0 1px 3px rgba(0,0,0,.08)", overflow:"hidden" }}>
          <div style={{ padding:"16px 24px", borderBottom:"1px solid #f1f5f9" }}>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:14, fontWeight:700 }}>Your Appointments</div>
            <div style={{ fontSize:11.5, color:"#94a3b8", marginTop:2 }}>Booked slots from your enrollment</div>
          </div>
          <div style={{ padding:20, display:"flex", flexDirection:"column", gap:10 }}>
            {[
              { name:"Tuition Walk-in",   date:"Apr 17, 2026", time:"10:00 AM", status:"Confirmed", color:"#16a34a", bg:"#dcfce7" },
              { name:"Registrar Pickup",  date:"Apr 18, 2026", time:"2:00 PM",  status:"Pending",   color:"#d97706", bg:"#fef3c7" },
              { name:"BSIT Orientation",  date:"Jul 15, 2026", time:"8:00 AM",  status:"Upcoming",  color:"#2563eb", bg:"#eff6ff" },
            ].map(apt => (
              <div key={apt.name} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 14px", border:"1px solid #e2e8f0", borderRadius:8 }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background: apt.color, flexShrink:0 }}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:600 }}>{apt.name}</div>
                  <div style={{ fontSize:11, color:"#94a3b8" }}>{apt.date} · {apt.time}</div>
                </div>
                <span style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, background: apt.bg, color: apt.color }}>{apt.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom action */}
      <div style={{ marginTop:20, background:"#fff", border:"1px solid #e2e8f0", borderRadius:12, padding:"20px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 1px 3px rgba(0,0,0,.08)" }}>
        <div>
          <div style={{ fontSize:13.5, fontWeight:700 }}>Enrollment submitted! What's next?</div>
          <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>View your confirmed study load or print your enrollment slip.</div>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={printSlip} style={{ padding:"10px 20px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer", background:"#fff", border:"1.5px solid #e2e8f0", color:"#475569", display:"flex", alignItems:"center", gap:6 }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Print Slip
          </button>
          <button
            onClick={onGoToStudyLoad}
            style={{ padding:"10px 20px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer", background:"#2563eb", border:"none", color:"#fff", display:"flex", alignItems:"center", gap:6 }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            View Study Load
          </button>
        </div>
      </div>
    </div>
  );
}
