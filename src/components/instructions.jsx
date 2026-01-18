// instructions section

// need title: Memory Game
// directions: Welcome to Memory Game. Click on one card. A gif should appear.
// After you click one card, find it's identical counterpart by clicking on the cards. 
// If you match 1 set, you get a point. If you click on a card that is not identical,
// you lose your point. The key is to get two identical gifs with the least amount
// of clicking.




import { useState } from "react";

import PlayScreen from "./playscreen"

console.log("INSTRUCTIONS FILE LOADED");


function Button(props) {
  const buttonStyle = {
    color: props.color,
    fontSize: props.fontSize + 'px',
    width: props.width,
  };

  return (
    <button
      type={props.type || "button"}
      style={buttonStyle}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}



function Instructions({onSubmit}) {


    const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit();

}

return (
    <>
    
<header className="titleSection">
        <h1 className="game-title">Memory Game</h1>
      </header>

      <div id="instructions">
    <p><strong>Instructions:</strong></p>
        <p>
            Welcome to Memory Game. Click on one card. A gif should appear.
            </p> 
            <p>
            After you click one card, find it's identical counterpart by clicking around on each card. 
            </p>
<p>
If you match 1 set, you get a point. If you click on a card that is not identical,
</p>

<p>
you lose your point. The key is to get two identical gifs with the least amount
</p>

<p>
of clicking.
        </p>
      </div>

<div id="playSection">

<Button 

type="button"
            text="Play"
            color="#ffffff"
            fontSize={20}
        // width="70px" 

           onClick={handleSubmit}
/>
</div>




    
    </>

);

}



export default Instructions;