import { useState, useEffect, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL;
// const apiKey = import.meta.env.VITE_API_KEY;

export const useWordGame = () => {
  const [word, setWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState('playing');
  const [isLoading, setIsLoading] = useState(true);
  const [hint, setHint] = useState('No hint');

  const fetchWord = async () => {
    try {
      const response = await fetch(API_URL, { method: 'GET' });
  
      const responseText = await response.text();
      console.log('Response Status:', response.status);
      console.log('Response Text:', responseText);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const words = JSON.parse(responseText);
      if (!words.length) {
        throw new Error('No words received from API');
      }
  
      let hint = null;
      let selectedWord = null;
  
      for (const word of words) {
        const hintUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const responseHint = await fetch(hintUrl, { method: 'GET' });
  
        if (responseHint.ok) {
          const hintData = await responseHint.json();
          const definition = hintData[0]?.meanings[0]?.definitions[0]?.definition;
  
          if (definition) {
            selectedWord = word;
            hint = definition;
            break; // Stop after finding the first valid word and hint
          }
        }
      }
  
      if (!selectedWord || !hint) {
        throw new Error('No valid hint found');
      }
      console.log(hint);
      setWord(selectedWord.toUpperCase());
      setHint(hint);
    } catch (error) {
      console.error('Error fetching word:', error);
      setWord('REACT');
      setHint('A JavaScript library for building user interfaces.');
    }
  };
  
  useEffect(() => {
    const fetchWordAndSetState = async () => {
      setIsLoading(true);
      await fetchWord();
      setIsLoading(false);
    };

    fetchWordAndSetState();
  }, []);

  const handleKeyPress = useCallback((key) => {
    if (gameStatus !== 'playing') return;
    if (currentGuess.length < word.length) {
      setCurrentGuess((prev) => prev + key.toUpperCase());
    }
  }, [currentGuess, word, gameStatus]);

  const handleEnter = useCallback(() => {
    if (gameStatus !== 'playing') return;
    if (currentGuess.length === word.length) {
      setGuesses((prev) => [...prev, currentGuess]);
      setCurrentGuess('');

      if (currentGuess === word) {
        setGameStatus('won');
      } else if (guesses.length === 5) {
        setGameStatus('lost');
      }
    }
  }, [currentGuess, word, guesses, gameStatus]);

  const handleDelete = useCallback(() => {
    if (gameStatus !== 'playing') return;
    setCurrentGuess((prev) => prev.slice(0, -1));
  }, [gameStatus]);

  return {
    word,
    hint,
    guesses,
    currentGuess,
    gameStatus,
    handleKeyPress,
    handleEnter,
    handleDelete,
    isLoading,
  };
};
