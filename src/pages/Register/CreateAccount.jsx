import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/CreateAccount.css";

export default function CreateAccount({ onSwitchToLogin }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setError("");

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const usersJson = localStorage.getItem("onlium_users");
    const users = usersJson ? JSON.parse(usersJson) : [];

    const exists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) {
      setError("An account with this email already exists.");
      return;
    }

    const newUser = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password,
    };
    users.push(newUser);
    localStorage.setItem("onlium_users", JSON.stringify(users));

    const safeUser = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    };
    localStorage.setItem("onlium_current_user", JSON.stringify(safeUser));
    navigate("/dashboard");
  };

  return (
    <div className="create-page">
      <div className="create-left">
        <h1>Onlium offers Interactive learning experience</h1>
        <div className="create-logo-bars">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="create-card">
        <button className="back-arrow" onClick={() => navigate("/")}>
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#1e293b" strokeWidth="1.8">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h2>Create Account</h2>
        <p className="subtitle">Join Onlium and start learning today</p>

        <div className="auth-tabs">
          <button className="tab-btn tab-active">Sign Up</button>
          <button
            className="tab-btn tab-inactive"
            onClick={() => navigate("/register/login")}
          >
            Log In
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="name-row">
          <div>
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
            />
          </div>
        </div>

        <label>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label>Password</label>
        <div className="create-password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
          />
          <button
            className="create-toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <label>Confirm Password</label>
        <div className="create-password-wrapper">
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />
          <button
            className="create-toggle-password"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? "Hide" : "Show"}
          </button>
        </div>

        <button className="create-btn" onClick={handleSubmit}>
          Create Account
        </button>

        <p className="create-bottom-text">
          Already have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/register/login");
            }}
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}