  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import "./CreateAccount.css";

  export default function CreateAccount({ onSwitchToLogin }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      if (e && e.preventDefault) e.preventDefault();

      if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
        alert("Please fill in all required fields.");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
      }

      const usersJson = localStorage.getItem('onlium_users');
      const users = usersJson ? JSON.parse(usersJson) : [];

      const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        alert('An account with this email already exists. Please log in.');
        if (onSwitchToLogin) return onSwitchToLogin();
        return navigate('/');
      }

      const newUser = { firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim(), password };
      users.push(newUser);
      localStorage.setItem('onlium_users', JSON.stringify(users));

      alert('Account created successfully. You can now log in.');
      if (onSwitchToLogin) return onSwitchToLogin();
      return navigate('/');
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
              onClick={() => navigate('/register/login')}
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

          <button className="create-btn" onClick={handleSubmit}>
            Create Account
          </button>

          <p className="create-bottom-text">
            Already have an account?{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/register/login'); }}>Log In</a>
          </p>
        </div>
      </div>
    );
  }