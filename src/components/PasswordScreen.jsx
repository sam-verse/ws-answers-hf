import React, { useState } from 'react';
// import img from 'public/hf-mini.png';

export default function PasswordScreen({ onUnlock }) {
  const [digits, setDigits] = useState(['', '', '', '']);
  const [error, setError] = useState('');

  const handleChange = (idx, val) => {
    if (!/^[0-9]?$/.test(val)) return;
    const newDigits = [...digits];
    newDigits[idx] = val;
    setDigits(newDigits);
    // Auto-focus next input
    if (val && idx < 3) {
      document.getElementById(`pswd-input-${idx + 1}`).focus();
    }
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    if (digits.join('') === '9999') {
      setError('');
      onUnlock();
    } else {
      setError('Incorrect code');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
  <div style={{ background: '#fff', borderRadius: '18px', boxShadow: '0 6px 10px #ff980022', padding: '1.5rem 1.2rem', maxWidth: 400, width: '100%', textAlign: 'center', margin: '0 auto' }}>
        <div style={{ marginBottom: '1.2rem' }}>
          <div style={{ width: 45, height: 45, borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="public/hf-mini.png" alt="Unlock" style={{ width: '80%', height: '80%' }} />
          </div>
        </div>
        <h2 style={{ color: '#fff5200', fontWeight: 700, fontSize: '1.3rem', marginBottom: '0.7rem', fontFamily: 'Montserrat, Arial, sans-serif' }}>Enter Access Code</h2>
        <div style={{ color: '#888', fontSize: '1rem', marginBottom: '1.5rem' }}>This site is protected.</div>
        <form onSubmit={handleUnlock} style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', marginBottom: '1.2rem' }}>
            {digits.map((d, idx) => (
              <input
                key={idx}
                id={`pswd-input-${idx}`}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => handleChange(idx, e.target.value)}
                style={{
                  width: 48,
                  height: 56,
                  fontSize: 32,
                  textAlign: 'center',
                  borderRadius: 12,
                  border: d ? '1px solid #ff5a00' : '1px solid #eee',
                  outline: d ? '1px solid #ff5a00' : 'none',
                  background: '#fafafa',
                  boxShadow: d ? '0 2px 8px #ff980022' : 'none',
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  transition: 'border 0.2s, box-shadow 0.2s',
                }}
                autoFocus={idx === 0}
              />
            ))}
          </div>
          <button type="submit" style={{ width: '100%', background: '#ff5a00', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '1.1rem', padding: '0.9em 1.2em', cursor: 'pointer', boxShadow: '0 2px 8px #ff980022', fontFamily: 'Montserrat, Arial, sans-serif', marginBottom: error ? '0.5rem' : '1.5rem', backgroundImage: 'none' }}>Unlock</button>
          {error && <div style={{ color: '#d32f2f', fontSize: '1rem', marginTop: '0.5rem' }}>{error}</div>}
        </form>
        {/* <div style={{ color: '#bbb', fontSize: '0.95rem', marginTop: '2rem' }}>&copy; 2025 Strategic Analytics Portal</div> */}
      </div>
    </div>
  );
}
