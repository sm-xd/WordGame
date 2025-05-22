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
      <button 
        onClick={() => window.location.reload()} 
        className="start-again-btn"
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          marginTop: '15px',
          transition: 'background-color 0.3s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
      >
        Start Again
      </button>
    </div>
  );
};

export default Message;
