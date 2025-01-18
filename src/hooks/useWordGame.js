import { useState, useEffect, useCallback } from 'react';

const API_URL = 'https://api.api-ninjas.com/v1/randomword'; // Replace with actual API URL
const apiKey = 'w7I+1R1jUrw/J1he9NF+JQ==osNbkLQFv8oO4jQ0';

export const useWordGame = () => {
  const [word, setWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState('playing');
  const [isLoading, setIsLoading] = useState(true);

  const fetchWord = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.word) {
        throw new Error('No word received from API');
      }
      setWord(data.word.toUpperCase());
    } catch (error) {
      console.error('Error fetching word:', error);
      setWord('REACT');
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
    guesses,
    currentGuess,
    gameStatus,
    handleKeyPress,
    handleEnter,
    handleDelete,
    isLoading,
  };
};
