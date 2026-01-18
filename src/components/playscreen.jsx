import Cards from './cards.jsx';
import { useState } from "react";
{/* 
import Scores from "./scores.jsx"; */}

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

function PlayScreen({ onSubmit }) {
  const [gameOver, setGameOver] = useState(false);

  const handleGameOver = () => {
    setGameOver(true);
  };

  return (
    <div id="screenSection">
      <div id="scoreSection">
        {/* You can add Scores component here */}
      </div>

       {/* Play Again button only appears when game is over */}
      {gameOver && (
        <div
          id="playAgain"
          style={{ margin: "20px", textAlign: "center" }}
        >
          <Button
            text="Play Again"
            color="#ffffff"
            fontSize={20}
            onClick={onSubmit} // calls Display.jsx to remount
          />
        </div>
      )}

      <div id="allCards">
        <Cards onGameOver={handleGameOver} />
      </div>

     
    </div>
  );
}

export default PlayScreen;
