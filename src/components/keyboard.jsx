import React from 'react';

const Keyboard = ({ onKeyPress, onEnter, onDelete, guesses, word }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  const getKeyStatus = (key) => {
    let status = '';
    for (let guess of guesses) {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === key) {
          if (word[i] === key) return 'correct';
          if (word.includes(key)) status = 'present';
          else status = 'absent';
        }
      }
    }
    return status;
  };

  return (
    <div className="keyboard">
      {rows.map((row, i) => (
        <div key={i} className="row">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`key ${getKeyStatus(key)}`}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
      <div className="row">
        <button onClick={onEnter} className="key large">
          Enter
        </button>
        <button onClick={onDelete} className="key large">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
