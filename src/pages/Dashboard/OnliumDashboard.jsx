import { useState, useEffect } from "react";
import "./styles/OnliumDashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import WelcomeBanner from "./WelcomeBanner";
import QuickCards from "./QuickCards";
import EnrollmentChecklist from "./EnrollmentChecklist";
import Bulletin from "./Bulletin";
import Appointments from "./Appointments";

export default function OnliumDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [enrollment, setEnrollment] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("onlium_enrollment");
    if (raw) setEnrollment(JSON.parse(raw));
  }, []);

  const isPending = enrollment && !enrollment.approved && enrollment.status !== "Rejected";
  const isApproved = enrollment?.approved === true;
  const isRejected = enrollment?.status === "Rejected";

  return (
    <div className="portal">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} hideLogout />
      <div className="main">
        <Topbar onMenuToggle={() => setMobileOpen(!mobileOpen)} />
        <div className="content">
          <WelcomeBanner />

          {/* Enrollment Status Banner */}
          {isPending && (
            <div style={{ background:"#fffbeb", border:"1px solid #fcd34d", borderRadius:12, padding:"14px 20px", marginBottom:20, display:"flex", alignItems:"center", gap:12 }}>
              <svg width="20" height="20" fill="none" stroke="#d97706" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink:0 }}>
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
              </svg>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:"#92400e" }}>Enrollment Submitted — Waiting for Admin Approval</div>
                <div style={{ fontSize:12, color:"#b45309", marginTop:2 }}>Your requirements have been submitted. Please wait while the admin reviews your application.</div>
              </div>
            </div>
          )}

          {isApproved && (
            <div style={{ background:"#f0fdf4", border:"1px solid #86efac", borderRadius:12, padding:"14px 20px", marginBottom:20, display:"flex", alignItems:"center", gap:12 }}>
              <svg width="20" height="20" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink:0 }}>
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:"#15803d" }}>Enrollment Approved!</div>
                <div style={{ fontSize:12, color:"#16a34a", marginTop:2 }}>Your enrollment has been approved by the admin. You are now officially enrolled.</div>
              </div>
            </div>
          )}

          {isRejected && (
            <div style={{ background:"#fef2f2", border:"1px solid #fca5a5", borderRadius:12, padding:"14px 20px", marginBottom:20, display:"flex", alignItems:"center", gap:12 }}>
              <svg width="20" height="20" fill="none" stroke="#dc2626" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink:0 }}>
                <circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/>
              </svg>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:"#991b1b" }}>Enrollment Rejected</div>
                <div style={{ fontSize:12, color:"#dc2626", marginTop:2 }}>Your enrollment was rejected by the admin. Please visit the Registrar's Office for assistance.</div>
              </div>
            </div>
          )}

          <QuickCards />
          <div className="bottom-grid">
            <EnrollmentChecklist />
            <div className="right-col">
              <Bulletin />
              <Appointments />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}