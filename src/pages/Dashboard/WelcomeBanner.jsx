import { useState, useEffect } from "react";
import "./styles/WelcomeBanner.css";

export default function WelcomeBanner() {
  const [currentUser, setCurrentUser] = useState({ firstName: "", lastName: "" });

  useEffect(() => {
    const load = () => {
      const userJson = localStorage.getItem('onlium_current_user');
      if (userJson) {
        const user = JSON.parse(userJson);
        setCurrentUser({ firstName: user.firstName || "", lastName: user.lastName || "" });
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

  return (
    <div className="welcome-banner">
      <div className="wb-left">
        <h2>
          Welcome back, <span style={{ fontWeight: 800, fontFamily: "inherit" }}>{getFullName()}</span>
        </h2>
        <p>BSIT · 2nd Year · ONLS-2025-00124</p>
      </div>
    </div>
  );
}