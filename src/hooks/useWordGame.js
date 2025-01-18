import { useState, useEffect, useCallback } from 'react';

const API_URL = import.meta.env.API_URL;
const apiKey = import.meta.env.API_KEY;

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
  
      // Log response status and text to see if it’s returning HTML
      const responseText = await response.text();
    //   console.log('Response Status:', response.status);
    //   console.log('Response Text:', responseText);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Try to parse as JSON if the response is not HTML
      const data = JSON.parse(responseText);
      if (!data.word) {
        throw new Error('No word received from API');
      }
      setWord(data.word[0].toUpperCase());
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
