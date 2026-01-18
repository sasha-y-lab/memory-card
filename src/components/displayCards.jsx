import { useState } from "react";

import Instructions from './instructions.jsx';

import PlayScreen from "./playscreen.jsx"


function Display() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameKey, setGameKey] = useState(0);
  const [totalScore, setTotalScore] = useState(0); // keeps running total

  const handleStartGame = () => setGameStarted(true);
  const handleRestartGame = () => setGameKey(prev => prev + 1);

  return (
    <>
      {!gameStarted && <Instructions onSubmit={handleStartGame} />}
      {gameStarted && (
        <PlayScreen
  key={gameKey}
  onSubmit={handleRestartGame}
  totalScore={totalScore}
  setTotalScore={setTotalScore}
/>
      )}
    </>
  );
}

export default Display;