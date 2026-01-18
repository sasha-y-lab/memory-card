import { useState } from "react";

import Instructions from './instructions.jsx';

import PlayScreen from "./playscreen.jsx"


function Display() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameKey, setGameKey] = useState(0); // force PlayScreen remount

  const handleStartGame = () => setGameStarted(true);

  const handleRestartGame = () => {
    setGameKey(prev => prev + 1); // remount PlayScreen & Cards
  };

  return (
    <>
      {!gameStarted && <Instructions onSubmit={handleStartGame} />}
      {gameStarted && (
        <PlayScreen key={gameKey} onSubmit={handleRestartGame} />
      )}
    </>
  );
}

export default Display;