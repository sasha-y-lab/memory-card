import { useState } from "react";



function Scores({ roundScore, totalScore }) {
  return (
    <div
      //id="scoreSection"
      style={{
        width: "100%",
        textAlign: "center",
        marginBottom: "20px",
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "#2E4057",
      }}
    >
      <p>Round Score: {roundScore}</p>
      <p>Total Score: {totalScore}</p>
    </div>
  );
}

export default Scores;
