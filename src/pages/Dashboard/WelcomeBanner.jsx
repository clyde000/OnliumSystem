import "./WelcomeBanner.css";

export default function WelcomeBanner() {
  return (
    <div className="welcome-banner">
      <div className="wb-left">
        <h2>
          Welcome back, <span style={{ fontWeight: 800 }}>Clyde Casipong</span>
        </h2>
        <p>BSIT · 2nd Year · ONLS-2025-00124</p>
      </div>
    </div>
  );
}