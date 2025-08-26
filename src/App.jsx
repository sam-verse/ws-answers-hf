

import { useState } from 'react';
import answers from './answers.json';
// ...existing code...
import CrosswordGrid from './components/CrosswordGrid.jsx';
import ColorKey from './components/ColorKey.jsx';
import SplashScreen from './components/SplashScreen.jsx';
import PasswordScreen from './components/PasswordScreen.jsx';
import './App.css';

const GRID_SIZE = 35;
const COLORS = [
  '#ff9800', '#f57c00', '#e65100', '#ffa000', '#fbc02d', '#c62828', '#ad1457', '#6a1b9a', '#1976d2', '#1565c0',
  '#0277bd', '#00838f', '#388e3c', '#689f38', '#2e7d32', '#8bc34a', '#00bcd4', '#0097a7', '#7b1fa2', '#512da8',
  '#303f9f', '#3f51b5', '#5e35b1', '#3949ab', '#039be5', '#43a047', '#d32f2f', '#f44336', '#ff7043', '#ff5722',
  '#795548', '#6d4c41', '#8d6e63', '#ffb300', '#ffca28', '#ffd600', '#ffeb3b', '#cddc39', '#afb42b', '#827717',
  '#00acc1', '#009688'
];

function getCellsForWord(word, direction, start, end) {
  const cells = [];
  let r = start.row, c = start.col;
  const dr = end.row > start.row ? 1 : end.row < start.row ? -1 : 0;
  const dc = end.col > start.col ? 1 : end.col < start.col ? -1 : 0;
  for (let i = 0; i < word.length; i++) {
    cells.push([r - 1, c - 1]);
    r += dr;
    c += dc;
  }
  return cells;
}

function getAnswerKey(code) {
  // Accepts hash01, hash02, ... hash75
  if (!code.toLowerCase().startsWith('code')) return null;
  const num = code.replace(/[^0-9]/g, '');
  if (!num) return null;
  const key = `HFWS${num.padStart(2, '0')}`;
  return answers[key] || null;
}

function App() {
  const [code, setCode] = useState('');
  const [selected, setSelected] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [showPassword, setShowPassword] = useState(true);

// ...existing code...

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with local answer lookup or other logic
    setSelected(getAnswerKey(code));
  };

  // Build grid
  let grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill({ char: '', color: null }));
  if (selected) {
    selected.forEach((ans, idx) => {
      const color = COLORS[idx % COLORS.length];
      const cells = getCellsForWord(ans.word, ans.direction, ans.start, ans.end);
      for (let i = 0; i < cells.length; i++) {
        const [r, c] = cells[i];
        if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
          grid[r][c] = { char: ans.word[i], color };
        }
      }
    });
  }


  if (showSplash) {
    return <SplashScreen onContinue={() => setShowSplash(false)} />;
  }
  if (showPassword) {
    return <PasswordScreen onUnlock={() => setShowPassword(false)} />;
  }

  return (
    <div className="main-bg" style={{  minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2vw' }}>
      <div className="container" style={{ background: '#fff', border: 'none', borderRadius: '18px', padding: '2rem 1.2rem', width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'stretch', boxShadow: '0 6px 32px #ff980022', boxSizing: 'border-box' }}>
             <div style={{ width: 48, height: 48, borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/hf-mini.png" alt="Unlock" style={{ width: '80%', height: '80%' }} />
          </div>
        <h1 className="title" style={{ fontFamily: 'Montserrat, Arial, sans-serif', letterSpacing: '1.5px', color: '#ff5a00', fontWeight: 700, fontSize: '1.5rem', textAlign: 'center', marginBottom: '1.5rem', textShadow: '0 2px 12px #ff980033' }}>Questionz</h1>
  {/* ...existing code... */}
        <div className="entry-area" style={{ width: '100%', maxWidth: '700px', margin: '0 auto', alignSelf: 'center' }}>
          <form onSubmit={handleSubmit} className="form-area" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem', width: '100%' }}>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Enter the Question Code"
              className="input-code"
              autoFocus
              style={{ fontFamily: 'Montserrat, Arial, sans-serif', fontSize: '1.1rem', borderRadius: '12px', border: '2px solid #ff5a00', padding: '0.9em 1.2em', background: '#fff', outline: 'none', width: '100%', boxSizing: 'border-box', boxShadow: '0 2px 8px #ff980022', transition: 'border 0.2s, box-shadow 0.2s' }}
            />
            <button type="submit" className="btn-show" style={{ fontFamily: 'Montserrat, Arial, sans-serif', background: 'linear-gradient(90deg, #ff5a00 70%,  #ff5a00 70%)', color: '#fff', borderRadius: '12px', border: 'none', fontWeight: 600, fontSize: '1.1rem', padding: '0.9em 1.2em', cursor: 'pointer', transition: 'background 0.2s, box-shadow 0.2s', width: '100%', boxSizing: 'border-box', boxShadow: '0 2px 8px #ff980022' }}>Show Answers</button>
          </form>
        </div>
        {selected ? (
          <>
            <CrosswordGrid grid={grid} selected={selected} />
            <div className="answers-list" style={{ marginTop: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px #ff980022', padding: '1rem', fontFamily: 'Montserrat, Arial, sans-serif', fontSize: '1rem', color: '#ff9800' }}>
              <div className="answers-title">Answers & Locations:</div>
              <ul>
                {selected.map((ans, idx) => (
                  <li key={idx}>
                    <span className="word" style={{ color: '#ff9800' }}>{ans.word}</span>
                    <span className="direction" style={{ color: '#888' }}>({ans.direction})</span>
                    <span className="coords">from <b>({ans.start.row},{ans.start.col})</b> to <b>({ans.end.row},{ans.end.col})</b></span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : code ? (
          getAnswerKey(code) === null ? (
            <div className="not-found" style={{ fontFamily: 'Montserrat, Arial, sans-serif', color: '#ff9800', textAlign: 'center', fontWeight: 500, fontSize: '1rem', marginBottom: '1rem' }}>Code not found</div>
          ) : (
            <div className="not-found" style={{ fontFamily: 'Montserrat, Arial, sans-serif', color: '#ff9800', textAlign: 'center', fontWeight: 500, fontSize: '1rem', marginBottom: '1rem' }}>Wanna see the answer?</div>
          )
        ) : null}
      </div>
    </div>
  );
}
export default App;
