import { useState } from 'react';

export default function AuthForm({ onAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Use a button click handler instead of form submit to guarantee POST
  const handleLoginClick = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });
      let data = {};
      try {
        data = await res.json();
      } catch {
        setError('Invalid response from server');
        return;
      }
      if (res.ok) {
        onAuth(true);
      } else {
        setError(data.error || data.detail || 'Login failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required style={{ marginRight: '1em' }} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required style={{ marginRight: '1em' }} />
      <button onClick={handleLoginClick}>Login</button>
      {error && <div style={{ color: 'red', marginTop: '1em' }}>{error}</div>}
    </div>
  );
}
