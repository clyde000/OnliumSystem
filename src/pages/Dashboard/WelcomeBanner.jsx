import { useAuth } from "../../hooks/useAuth";
import "./WelcomeBanner.css";

export default function WelcomeBanner() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="welcome-banner">
        <div className="wb-left">
          <h2>Welcome back</h2>
          <p>Please log in to see your details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="welcome-banner">
      <div className="wb-left">
        <h2>
          Welcome back,{" "}
          <span style={{ fontWeight: 800 }}>
            {user.firstName} {user.lastName}
          </span>
        </h2>
        <p>Student ID will be displayed after API integration</p>
      </div>
    </div>
  );
}
