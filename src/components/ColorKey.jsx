import React from 'react';

const COLORS = [
  '#ff9800', '#ffb74d', '#ffa726', '#ffcc80', '#fff3e0', '#ff7043', '#ff5722', '#f57c00', '#fb8c00', '#e65100',
  '#fbe9e7', '#ffe0b2', '#ffd180', '#ffab91', '#ff8a65', '#ff6e40', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28',
  '#ffebee', '#f8bbd0', '#e1bee7', '#d1c4e9', '#c5cae9', '#b3e5fc', '#b2dfdb', '#c8e6c9', '#dcedc8', '#fff9c4', '#ffe0b2'
];

export default function ColorKey({ selected }) {
  return (
    <div className="color-key">
      {/* <h3>Color Key</h3> */}
      {selected && selected.map((ans, idx) => (
        <div key={ans.word} className="key-item">
          <div className="key-color" style={{ background: COLORS[idx % COLORS.length] }}></div>
          <span className="key-word">{ans.word}</span>
          <span className="key-loc">({ans.direction} {JSON.stringify(ans.start)} to {JSON.stringify(ans.end)})</span>
        </div>
      ))}
    </div>
  );
}
