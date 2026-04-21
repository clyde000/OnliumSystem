import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterUniversity.css';

const ModeratorLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: moderator auth
    console.log('moderator', { username, password });
    navigate('/');
  };

  return (
    <div className="register-root">
      <form className="register-form" onSubmit={handleSubmit}>
        <h3>Moderator Login</h3>
        <label>Username</label>
        <input value={username} onChange={(e)=>setUsername(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <button className="btn primary" type="submit">Enter</button>
      </form>
    </div>
  );
};

export default ModeratorLogin;