import React from 'react';

const COLORS = [
  '#ff9800', '#2196f3', '#4caf50', '#e91e63', '#9c27b0', '#00bcd4', '#8bc34a', '#f44336', '#3f51b5', '#ffeb3b',
  '#795548', '#607d8b', '#ffb74d', '#ffa726', '#ffcc80', '#fff3e0', '#ff7043', '#ff5722', '#f57c00', '#fb8c00',
  '#e65100', '#fbe9e7', '#ffe0b2', '#ffd180', '#ffab91', '#ff8a65', '#ff6e40', '#ffecb3', '#ffe082', '#ffd54f',
  '#ffca28', '#ffebee', '#f8bbd0', '#e1bee7', '#d1c4e9', '#c5cae9', '#b3e5fc', '#b2dfdb', '#c8e6c9', '#dcedc8',
  '#fff9c4', '#ffe0b2'
];

export default function CrosswordGrid({ grid, selected }) {
  return (
    <div className="grid-area">
      <table className="crossword-table">
        <tbody>
          {grid.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="crossword-cell" style={{ background: cell.color || '#fff', color: cell.color ? '#fff' : '#ff9800' }}>
                  {cell.char || '·'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
