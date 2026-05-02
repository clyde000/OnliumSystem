import { useState, useEffect } from "react";
import "./styles/WelcomeBanner.css";

export default function WelcomeBanner() {
  const [currentUser, setCurrentUser] = useState({ firstName: "", lastName: "" });
  const [enrollmentInfo, setEnrollmentInfo] = useState(null);

  useEffect(() => {
    const load = () => {
      const userJson = localStorage.getItem('onlium_current_user');
      if (userJson) {
        const user = JSON.parse(userJson);
        setCurrentUser({ firstName: user.firstName || "", lastName: user.lastName || "" });
      }
      const raw = localStorage.getItem("onlium_enrollment");
      if (raw) {
        const data = JSON.parse(raw);
        if (data.approved) {
          const get = (label) => data.summary?.find(r => r.label === label)?.value || null;
          setEnrollmentInfo({
            program: get("Program"),
            yearLevel: get("Year Level"),
            studentId: get("Student ID"),
          });
        } else {
          setEnrollmentInfo(null);
        }
      }
    };
    load();
    window.addEventListener("onlium_profile_updated", load);
    const interval = setInterval(load, 300);
    return () => { window.removeEventListener("onlium_profile_updated", load); clearInterval(interval); };
  }, []);

  const getFullName = () => {
    if (currentUser.firstName && currentUser.lastName) {
      return `${currentUser.firstName} ${currentUser.lastName}`;
    }
    return currentUser.firstName || currentUser.lastName || "Guest";
  };

  const subtitle = enrollmentInfo
    ? [enrollmentInfo.program, enrollmentInfo.yearLevel, enrollmentInfo.studentId].filter(Boolean).join(" · ")
    : null;

  return (
    <div className="welcome-banner">
      <div className="wb-left">
        <h2>
          Welcome back, <span style={{ fontWeight: 800, fontFamily: "inherit" }}>{getFullName()}</span>
        </h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
}