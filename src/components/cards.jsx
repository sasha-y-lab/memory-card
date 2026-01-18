import { useState, useEffect } from "react";

function Cards({ onGameOver }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disableAll, setDisableAll] = useState(false);

  // Fetch GIFs and setup cards
  const fetchAndSetupCards = async () => {
    try {
      const apiKey = "w5a0SN5eUh2H28yaWpI2bONsMT6XFk02";
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=happy&limit=20`
      );
      const data = await response.json();

      const first6 = data.data.slice(0, 6);
      const duplicated = [...first6, ...first6];

      const newCards = duplicated.map((gif, index) => ({
        id: index.toString(),
        gifUrl: gif.images.fixed_width_small.url,
      }));

      // shuffle cards
      const shuffled = newCards.sort(() => Math.random() - 0.5);

      setCards(shuffled);
      setFlipped([]);
      setMatched([]);
      setDisableAll(false);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }
  };

  useEffect(() => {
    fetchAndSetupCards();
  }, []);

  const handleCardClick = (index) => {
    if (disableAll || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;

      if (cards[firstIndex].gifUrl === cards[secondIndex].gifUrl) {
        const newMatched = [...matched, firstIndex, secondIndex];
        setMatched(newMatched);
        setFlipped([]);

        // Call game over if all matched
        if (newMatched.length === cards.length) {
          onGameOver();
        }
      } else {
        setDisableAll(true);
        setTimeout(() => {
          setFlipped([]);
          setDisableAll(false);
        }, 1000);
      }
    }
  };

  return (
    <div id="cardSection">
      {cards.length === 0 ? (
        <p>Loading GIFs...</p>
      ) : (
        cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <div
              key={card.id}
              className={`card ${isFlipped ? "flipped" : ""}`}
              onClick={() => handleCardClick(index)}
            >
              {isFlipped ? (
                <img src={card.gifUrl} alt={`card ${index + 1}`} />
              ) : (
                <div className="card-back"></div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default Cards;
