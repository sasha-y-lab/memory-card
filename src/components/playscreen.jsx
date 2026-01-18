import Cards from './cards.jsx';
import { useState } from "react";
 
import Scores from "./scores.jsx";

function Button({ color, fontSize, text, onClick, width }) {
  return (
    <button
      style={{ color, fontSize: fontSize + "px", width }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

function PlayScreen({ onSubmit, totalScore, setTotalScore }) {
  const [gameOver, setGameOver] = useState(false);
  const [roundScore, setRoundScore] = useState(0);

  const handleGameOver = () => setGameOver(true);

  const handleScoreUpdate = (delta) => {
    setRoundScore(prev => prev + delta);
  };

  const handlePlayAgain = () => {
    // ✅ Add current round score to total score first
    setTotalScore(prev => prev + roundScore);

    // ✅ Reset round score for next game
    setRoundScore(0);

    // Reset game
    setGameOver(false);
    onSubmit(); // trigger remount
  };

  return (
    <div id="screenSection">

        <div id="scoreSection">
      <Scores roundScore={roundScore} totalScore={totalScore} />
</div>

{gameOver && (
        <div id="playAgain" style={{ margin: "20px", textAlign: "center" }}>
          <Button
            text="Play Again"
            color="#ffffff"
            fontSize={20}
            onClick={handlePlayAgain} // reset round, add to total
          />
        </div>
      )}

      <div id="allCards">
        <Cards onGameOver={handleGameOver} onScoreUpdate={handleScoreUpdate} />
      </div>

      
    </div>
  );
}

export default PlayScreen;