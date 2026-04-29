import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./CreateAccount.css";

export default function CreateAccount({ onSwitchToLogin }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

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

    setLoading(true);
    setError("");

    const result = await register({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password,
    });

    if (result.success) {
      setError("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/dashboard");
    } else {
      setError(result.error);
    }

    setLoading(false);
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
        <h2>Create Account</h2>
        <p className="subtitle">Join Onlium and start learning today</p>

        {/* Toggle Tabs */}
        <div className="auth-tabs">
          <button className="tab-btn tab-active">Sign Up</button>
          <button
            className="tab-btn tab-inactive"
            onClick={() => navigate("/register/login")}
            disabled={loading}
          >
            Log In
          </button>
        </div>

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

        <button
          className="create-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        {error && (
          <div style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
            {error}
          </div>
        )}

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
