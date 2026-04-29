import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Login.css";

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!email.trim() || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);
    setError("");

    const result = await login(email, password);

    if (result.success) {
      setError("");
      navigate("/dashboard");
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h1>Onlium offers Interactive learning experience</h1>
        <div className="login-logo-bars">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="login-card">
        <h2>Welcome Back</h2>

        <div className="login-tabs">
          <button
            className={activeTab === "signup" ? "active" : ""}
            onClick={() => navigate("/register/create")}
          >
            Sign Up
          </button>
          <button
            className={activeTab === "login" ? "active" : ""}
            onClick={() => setActiveTab("login")}
          >
            Log In
          </button>
        </div>

        <label>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label>Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <button
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="forgot-link">
          <a href="#">Forgot password?</a>
        </div>

        <button className="login-btn" onClick={handleSubmit} disabled={loading}>
          {loading
            ? "Logging in..."
            : activeTab === "login"
              ? "Log In"
              : "Sign Up"}
        </button>

        <p className="login-bottom-text">
          {activeTab === "login" ? (
            <>
              Don't have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/register/create");
                }}
              >
                Sign Up
              </a>
            </>
          ) : (
            <>
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
            </>
          )}
        </p>
      </div>
    </div>
  );
}
