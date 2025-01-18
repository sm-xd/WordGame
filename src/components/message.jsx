import React from 'react';

const Message = ({ gameStatus, word }) => {
  if (gameStatus === 'playing') return null;

  return (
    <div className={`message ${gameStatus}`}>
      {gameStatus === 'won' ? (
        <p>Congratulations! You guessed the word!</p>
      ) : (
        <p>
          Sorry, you've run out of guesses. The word was: <strong>{word}</strong>
        </p>
      )}
    </div>
  );
};

export default Message;
