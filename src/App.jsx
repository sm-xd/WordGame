import React, { useState, useEffect } from 'react';
import Grid from './components/grid';
import Keyboard from './components/keyboard';
import Message from './components/message';
import { useWordGame } from './hooks/useWordGame';
import './App.css';
import Hint from './components/hint';

const App = () => {
  const {
    word,
    hint,
    guesses,
    currentGuess,
    gameStatus,
    handleKeyPress,
    handleEnter,
    handleDelete,
    isLoading,
  } = useWordGame();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleEnter();
      } else if (event.key === 'Backspace') {
        handleDelete();
      } else if (/^[A-Za-z]$/.test(event.key)) {
        handleKeyPress(event.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyPress, handleEnter, handleDelete]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <h1>Word Guessing Game</h1>
      <Grid word={word} guesses={guesses} currentGuess={currentGuess} />

      <Keyboard
        onKeyPress={handleKeyPress}
        onEnter={handleEnter}
        onDelete={handleDelete}
        guesses={guesses}
        word={word}
      />
      <Hint hint={hint}/>
      <Message gameStatus={gameStatus} word={word} />
    </div>
  );
};

export default App;
