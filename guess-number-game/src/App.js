import React, { useState } from "react";

export default function App() {
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [lives, setLives] = useState(7);
  const [guesses, setGuesses] = useState([]);
  const [message, setMessage] = useState("Try to guess the number between 1 and 100!");
  const [gameOver, setGameOver] = useState(false);

  const handleGuess = (e) => {
    e.preventDefault();
    const numGuess = Number(guess);

    if (!numGuess || numGuess < 1 || numGuess > 100) {
      setMessage("Please enter a valid number between 1 and 100.");
      setGuess("");
      return;
    }

    if (gameOver) return;

    setGuesses([...guesses, numGuess]);

    if (numGuess === target) {
      setMessage(`🎉 You got it! The number was ${target}.`);
      setGameOver(true);
    } else {
      let hint = numGuess < target ? "Try higher!" : "Try lower!";
      setMessage(hint);

      if (lives - 1 === 0) {
        setMessage(`Game over! The number was ${target}.`);
        setGameOver(true);
      }
      setLives((lives) => lives - 1);
    }

    setGuess("");
  };

  const restartGame = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setLives(7);
    setGuesses([]);
    setMessage("Try to guess the number between 1 and 100!");
    setGameOver(false);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-gray-100 rounded shadow-lg text-center font-sans">
      <h1 className="text-2xl font-bold mb-4">Guess A Number</h1>

      <p className="mb-4">{message}</p>

      <form onSubmit={handleGuess} className="mb-4">
        <input
          type="number"
          min="1"
          max="100"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={gameOver}
          className="border rounded p-2 w-24 text-center"
          placeholder="1-100"
        />
        <button
          type="submit"
          disabled={gameOver}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          Guess
        </button>
      </form>

      <p className="mb-2">Lives left: {lives}</p>

      <div className="mb-4">
        <h3 className="font-semibold">Previous guesses:</h3>
        {guesses.length === 0 ? (
          <p>No guesses yet</p>
        ) : (
          <ul className="flex flex-wrap justify-center gap-2 mt-2">
            {guesses.map((g, idx) => (
              <li
                key={idx}
                className="bg-blue-200 text-blue-800 px-3 py-1 rounded"
              >
                {g}
              </li>
            ))}
          </ul>
        )}
      </div>

      {gameOver && (
        <button
          onClick={restartGame}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Play Again
        </button>
      )}
    </div>
  );
}


