import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ModeratorLogin.css';

const ModeratorLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('moderator', { username, password });
    navigate('/admin');
  };

  return (
    <div className="mod-page">
      <div className="mod-branding">
        <h1 className="mod-tagline">
          Onlium <br />
          offers <br />
          Interactive <br />
          learning <br />
          experience
        </h1>
      </div>

      <div className="mod-card-wrapper">
        <div className="mod-card-body">
          <h2 className="mod-card-title">ADMIN</h2>
          <p className="mod-card-subtitle">Log in to manage your platform</p>

          <form className="mod-form" onSubmit={handleSubmit}>
            <div className="mod-form-group">
              <label className="mod-form-label" htmlFor="mod-username">
                Email address
              </label>
              <input
                id="mod-username"
                type="email"
                className="mod-form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                placeholder="name@onlium.com"
                required
              />
            </div>

            <div className="mod-form-group">
              <label className="mod-form-label" htmlFor="mod-password">
                Password
              </label>
              <input
                id="mod-password"
                type="password"
                className="mod-form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
              />
            </div>

            <button className="mod-btn-login" type="submit">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModeratorLogin;