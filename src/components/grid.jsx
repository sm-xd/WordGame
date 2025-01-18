import React from 'react';

const Grid = ({ word, guesses, currentGuess }) => {
    const emptyRows = Array(Math.max(0, 6 - guesses.length - 1)).fill('');

  const getCellClass = (letter, index, isSubmittedGuess) => {
    if (!isSubmittedGuess) return '';
    if (letter === word[index]) return 'correct';
    if (word.includes(letter)) return 'present';
    return 'absent';
  };

  return (
    <div className="grid">
      {guesses.map((guess, i) => (
        <div key={i} className="row">
          {guess.split('').map((letter, j) => (
            <div key={j} className={`cell ${getCellClass(letter, j, true)}`}>
              {letter}
            </div>
          ))}
        </div>
      ))}
      {guesses.length < 6 && (
        <div className="row">
          {currentGuess.split('').map((letter, i) => (
            <div key={i} className="cell">
              {letter}
            </div>
          ))}
          {Array(word.length - currentGuess.length)
            .fill('')
            .map((_, i) => (
              <div key={i + currentGuess.length} className="cell"></div>
            ))}
        </div>
      )}
      {emptyRows.map((_, i) => (
        <div key={i + guesses.length} className="row">
          {Array(word.length)
            .fill('')
            .map((_, j) => (
              <div key={j} className="cell"></div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
