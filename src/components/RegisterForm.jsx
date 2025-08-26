import { useState } from 'react';

export default function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegisterClick = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      let data = {};
      try {
        data = await res.json();
      } catch {
        setError('Invalid response from server');
        return;
      }
      if (res.ok) {
        onRegister(true);
      } else {
        setError(data.error || data.detail || 'Registration failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required style={{ marginRight: '1em' }} />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required style={{ marginRight: '1em' }} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required style={{ marginRight: '1em' }} />
      <button onClick={handleRegisterClick}>Register</button>
      {error && <div style={{ color: 'red', marginTop: '1em' }}>{error}</div>}
    </div>
  );
}
