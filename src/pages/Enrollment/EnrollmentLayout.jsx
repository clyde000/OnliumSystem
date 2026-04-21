import React, { useState } from "react";
import "../Dashboard/OnliumDashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import EnrollmentPage from "../../components/enrollment/EnrollmentPage";

export default function EnrollmentLayout() {
  const [activeNav, setActiveNav] = useState("Enrollment");

  return (
    <div className="portal">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
      <div className="main">
        <Topbar />
        <div className="content">
          <EnrollmentPage />
        </div>
      </div>
    </div>
  );
}
