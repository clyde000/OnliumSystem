import { useState } from "react";
import "./OnliumDashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import WelcomeBanner from "./WelcomeBanner";
import QuickCards from "./QuickCards";
import EnrollmentChecklist from "./EnrollmentChecklist";
import Bulletin from "./Bulletin";
import Appointments from "./Appointments";

export default function OnliumDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div className="portal">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
      <div className="main">
        <Topbar />
        <div className="content">
          <WelcomeBanner />
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